"use client";

import { create } from "zustand";
import {
  ANYMAIL_ROWS,
  APPROVAL_ITEMS,
  COST_ROWS,
  CRM_SYNC_ROWS,
  INITIAL_JOBS,
  INITIAL_LOGS,
  INSTANTLY_QUEUE,
  NEVERBOUNCE_ROWS,
  PIPELINE_STAGES,
  REPLY_MONITOR,
  SERVICE_CARDS,
  TRACEABLE_LEADS,
  URL_EMPRESA_ROWS,
} from "@/lib/ops-data";
import type {
  ApprovalItem,
  OpsJob,
  PipelineStage,
  ProviderId,
  StageStatus,
  SystemLog,
  TraceableLead,
} from "@/lib/ops-types";

const SIM_SEQUENCE: { id: ProviderId; label: string; provider: string; records: number; durationMs: number }[] = [
  { id: "apify", label: "Apify", provider: "Apify", records: 120, durationMs: 2200 },
  { id: "perplexity_url", label: "URL Empresa", provider: "Perplexity", records: 112, durationMs: 1800 },
  { id: "anymailfinder", label: "AnymailFinder", provider: "AnymailFinder", records: 84, durationMs: 2000 },
  { id: "validation", label: "Validación Email", provider: "Motor interno", records: 84, durationMs: 1400 },
  { id: "neverbounce", label: "NeverBounce", provider: "NeverBounce", records: 18, durationMs: 1600 },
  { id: "perplexity", label: "Enriquecimiento", provider: "Perplexity", records: 55, durationMs: 2000 },
  { id: "openai", label: "Generación Campaña", provider: "OpenAI", records: 25, durationMs: 2200 },
  { id: "approval", label: "Aprobación Usuario", provider: "Humano", records: 25, durationMs: 1200 },
];

let simTimer: ReturnType<typeof setTimeout> | null = null;
let simRunning = false;

interface OpsState {
  stages: PipelineStage[];
  jobs: OpsJob[];
  logs: SystemLog[];
  services: typeof SERVICE_CARDS;
  leads: TraceableLead[];
  approvals: ApprovalItem[];
  urlRows: typeof URL_EMPRESA_ROWS;
  anymailRows: typeof ANYMAIL_ROWS;
  neverbounceRows: typeof NEVERBOUNCE_ROWS;
  instantlyQueue: typeof INSTANTLY_QUEUE;
  replies: typeof REPLY_MONITOR;
  crmRows: typeof CRM_SYNC_ROWS;
  costs: typeof COST_ROWS;
  simulating: boolean;
  currentSimStep: number;
  selectedTraceLeadId: string | null;
  selectedApprovalId: string | null;

  setSelectedTraceLeadId: (id: string | null) => void;
  setSelectedApprovalId: (id: string | null) => void;
  addLog: (severity: SystemLog["severity"], provider: string, message: string) => void;
  updateStage: (id: ProviderId, patch: Partial<PipelineStage>) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  approveCampaign: (id: string) => void;
  updateApprovalEmail: (id: string, order: number, patch: { subject?: string; body?: string }) => void;
}

function jobId() {
  return `JOB-${1000 + Math.floor(Math.random() * 9000)}`;
}

export const useOpsStore = create<OpsState>((set, get) => ({
  stages: PIPELINE_STAGES.map((s) => ({ ...s })),
  jobs: INITIAL_JOBS.map((j) => ({ ...j })),
  logs: INITIAL_LOGS.map((l) => ({ ...l })),
  services: SERVICE_CARDS.map((s) => ({ ...s })),
  leads: TRACEABLE_LEADS.map((l) => ({ ...l })),
  approvals: APPROVAL_ITEMS.map((a) => ({ ...a })),
  urlRows: URL_EMPRESA_ROWS,
  anymailRows: ANYMAIL_ROWS,
  neverbounceRows: NEVERBOUNCE_ROWS,
  instantlyQueue: INSTANTLY_QUEUE,
  replies: REPLY_MONITOR,
  crmRows: CRM_SYNC_ROWS,
  costs: COST_ROWS,
  simulating: false,
  currentSimStep: -1,
  selectedTraceLeadId: null,
  selectedApprovalId: null,

  setSelectedTraceLeadId: (id) => set({ selectedTraceLeadId: id }),
  setSelectedApprovalId: (id) => set({ selectedApprovalId: id }),

  addLog: (severity, provider, message) =>
    set((s) => ({
      logs: [
        {
          id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          timestamp: new Date().toISOString(),
          severity,
          provider,
          message,
        },
        ...s.logs,
      ].slice(0, 200),
    })),

  updateStage: (id, patch) =>
    set((s) => ({
      stages: s.stages.map((st) => (st.id === id ? { ...st, ...patch } : st)),
    })),

  stopSimulation: () => {
    simRunning = false;
    if (simTimer) clearTimeout(simTimer);
    simTimer = null;
    set({ simulating: false });
  },

  startSimulation: () => {
    if (simRunning) return;
    simRunning = true;

    // Reset pipeline simulation stages
    set((s) => ({
      simulating: true,
      currentSimStep: 0,
      stages: s.stages.map((st) => {
        const inSim = SIM_SEQUENCE.some((x) => x.id === st.id);
        if (!inSim) return st;
        return { ...st, status: "pendiente" as StageStatus, records: 0, durationSec: 0, lastRun: undefined };
      }),
    }));

    get().addLog("INFO", "Orquestador", "Iniciando prospección — pipeline completo en simulación");

    const runStep = (index: number) => {
      if (!simRunning) return;
      if (index >= SIM_SEQUENCE.length) {
        simRunning = false;
        set({ simulating: false, currentSimStep: -1 });
        get().addLog("SUCCESS", "Orquestador", "Pipeline de prospección completado — campañas listas para aprobación humana");
        return;
      }

      const step = SIM_SEQUENCE[index];
      const jid = jobId();
      const startedAt = new Date().toISOString();

      set((s) => ({
        currentSimStep: index,
        stages: s.stages.map((st) =>
          st.id === step.id
            ? { ...st, status: "ejecutando", lastRun: startedAt, records: Math.floor(step.records * 0.35) }
            : st
        ),
        jobs: [
          {
            id: jid,
            type: "busqueda_leads",
            typeLabel: step.label,
            status: "ejecutando",
            startedAt,
            durationSec: 0,
            recordsProcessed: Math.floor(step.records * 0.35),
            provider: step.provider,
          },
          ...s.jobs,
        ],
        services: s.services.map((svc) =>
          svc.name === step.provider || (step.id === "perplexity_url" && svc.name === "Perplexity") || (step.id === "perplexity" && svc.name === "Perplexity") || (step.id === "openai" && svc.name === "OpenAI") || (step.id === "validation" && svc.id === "neverbounce")
            ? { ...svc, status: "ejecutando", lastRun: startedAt }
            : svc
        ),
      }));

      get().addLog("INFO", step.provider, `Ejecutando etapa: ${step.label}`);

      // Mid progress
      simTimer = setTimeout(() => {
        if (!simRunning) return;
        set((s) => ({
          stages: s.stages.map((st) =>
            st.id === step.id ? { ...st, records: Math.floor(step.records * 0.7) } : st
          ),
          jobs: s.jobs.map((j) =>
            j.id === jid ? { ...j, recordsProcessed: Math.floor(step.records * 0.7), durationSec: Math.round(step.durationMs / 2000) } : j
          ),
        }));
      }, step.durationMs / 2);

      simTimer = setTimeout(() => {
        if (!simRunning) return;
        const isErrorStep = false;
        const finalStatus: StageStatus = isErrorStep ? "error" : "completada";
        const durationSec = Math.round(step.durationMs / 1000);

        set((s) => ({
          stages: s.stages.map((st) =>
            st.id === step.id
              ? { ...st, status: finalStatus, records: step.records, durationSec, lastRun: new Date().toISOString() }
              : st
          ),
          jobs: s.jobs.map((j) =>
            j.id === jid
              ? { ...j, status: "completado", recordsProcessed: step.records, durationSec }
              : j
          ),
          services: s.services.map((svc) =>
            svc.name === step.provider ||
            (step.id === "perplexity_url" && svc.name === "Perplexity") ||
            (step.id === "perplexity" && svc.name === "Perplexity") ||
            (step.id === "openai" && svc.name === "OpenAI")
              ? { ...svc, status: "completada", lastRun: new Date().toISOString(), recordsProcessed: svc.recordsProcessed + step.records }
              : svc
          ),
          approvals:
            step.id === "openai"
              ? [
                  {
                    id: `APR-${Date.now().toString().slice(-4)}`,
                    lead: "Prospecto Simulado",
                    empresa: "Empresa Objetivo",
                    estado: "pendiente" as const,
                    fecha: new Date().toISOString(),
                    usuario: "Sistema · GPT-5",
                    emails: s.approvals[0]?.emails ?? [],
                  },
                  ...s.approvals,
                ]
              : s.approvals,
        }));

        get().addLog(
          finalStatus === "error" ? "ERROR" : "SUCCESS",
          step.provider,
          finalStatus === "error"
            ? `Error en etapa ${step.label}`
            : `${step.label} completada — ${step.records} registros`
        );

        if (step.id === "validation") {
          get().addLog("WARNING", "Validación", "18 emails marcados como riesgosos — derivando a NeverBounce");
        }

        runStep(index + 1);
      }, step.durationMs);
    };

    runStep(0);
  },

  approveCampaign: (id) => {
    set((s) => ({
      approvals: s.approvals.map((a) =>
        a.id === id ? { ...a, estado: "aprobada", usuario: "GC Demo" } : a
      ),
      stages: s.stages.map((st) =>
        st.id === "approval"
          ? { ...st, status: "completada", lastRun: new Date().toISOString() }
          : st.id === "instantly"
            ? { ...st, status: "ejecutando", records: st.records + 1, lastRun: new Date().toISOString() }
            : st
      ),
    }));
    get().addLog("SUCCESS", "Aprobación", `Campaña aprobada — ${id}. Encolada en Instantly.`);
  },

  updateApprovalEmail: (id, order, patch) =>
    set((s) => ({
      approvals: s.approvals.map((a) =>
        a.id === id
          ? {
              ...a,
              emails: a.emails.map((e) => (e.order === order ? { ...e, ...patch } : e)),
            }
          : a
      ),
    })),
}));

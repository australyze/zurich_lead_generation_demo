"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AI_PROVIDERS,
  CRM_INTEGRATIONS,
  FUNNEL_DATA,
  MARKETPLACE_ITEMS,
  WEEKLY_TREND,
  computeKpis,
  generateActivity,
  generateCampaigns,
  generateInstantlyCampaigns,
  generateLeads,
} from "@/lib/mock-data";
import type {
  Campaign,
  CampaignEmailStatus,
  CrmIntegration,
  InstantlyCampaign,
  Lead,
  ProspectingConfig,
  ProspectingJob,
} from "@/lib/types";

const initialLeads = generateLeads();
const initialCampaigns = generateCampaigns(initialLeads);
const initialInstantly = generateInstantlyCampaigns();

interface AppState {
  leads: Lead[];
  campaigns: Campaign[];
  instantlyCampaigns: InstantlyCampaign[];
  crmIntegrations: CrmIntegration[];
  marketplaceItems: typeof MARKETPLACE_ITEMS;
  aiProviders: typeof AI_PROVIDERS;
  selectedAiProvider: string;
  prospectingJob: ProspectingJob | null;
  sidebarCollapsed: boolean;
  selectedLeadId: string | null;
  selectedCampaignId: string | null;
  funnelData: typeof FUNNEL_DATA;
  weeklyTrend: typeof WEEKLY_TREND;
  requestedIntegrations: string[];

  setSidebarCollapsed: (v: boolean) => void;
  setSelectedLeadId: (id: string | null) => void;
  setSelectedCampaignId: (id: string | null) => void;
  setSelectedAiProvider: (id: string) => void;
  startProspecting: (config: ProspectingConfig) => void;
  updateProspectingProgress: (progress: number, status?: ProspectingJob["status"]) => void;
  completeProspecting: () => void;
  failProspecting: () => void;
  updateLeadEmailStatus: (leadId: string, status: Lead["emailStatus"]) => void;
  updateCampaignEmail: (
    campaignId: string,
    emailId: string,
    data: Partial<{ subject: string; body: string; status: CampaignEmailStatus }>
  ) => void;
  approveCampaign: (campaignId: string) => void;
  updateInstantlyStatus: (id: string, status: InstantlyCampaign["status"]) => void;
  requestCrmIntegration: (id: string) => void;
  requestMarketplaceItem: (id: string) => void;
  getKpis: () => ReturnType<typeof computeKpis>;
  getActivity: () => ReturnType<typeof generateActivity>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      leads: initialLeads,
      campaigns: initialCampaigns,
      instantlyCampaigns: initialInstantly,
      crmIntegrations: CRM_INTEGRATIONS,
      marketplaceItems: MARKETPLACE_ITEMS,
      aiProviders: AI_PROVIDERS,
      selectedAiProvider: "gpt-5",
      prospectingJob: null,
      sidebarCollapsed: false,
      selectedLeadId: null,
      selectedCampaignId: null,
      funnelData: FUNNEL_DATA,
      weeklyTrend: WEEKLY_TREND,
      requestedIntegrations: [],

      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      setSelectedLeadId: (id) => set({ selectedLeadId: id }),
      setSelectedCampaignId: (id) => set({ selectedCampaignId: id }),
      setSelectedAiProvider: (id) => set({ selectedAiProvider: id }),

      startProspecting: (config) =>
        set({
          prospectingJob: {
            id: `job-${Date.now()}`,
            status: "ejecutando",
            progress: 0,
            config,
            startedAt: new Date().toISOString(),
            leadsGenerated: 0,
          },
        }),

      updateProspectingProgress: (progress, status) =>
        set((state) =>
          state.prospectingJob
            ? {
                prospectingJob: {
                  ...state.prospectingJob,
                  progress,
                  status: status ?? state.prospectingJob.status,
                },
              }
            : state
        ),

      completeProspecting: () => {
        const job = get().prospectingJob;
        if (!job) return;
        const count = Math.min(job.config.cantidadMaxima, 12);
        const base = get().leads.length;
        const newLeads: Lead[] = Array.from({ length: count }).map((_, i) => {
          const idx = base + i + 1;
          return {
            id: `lead-${String(idx).padStart(3, "0")}`,
            nombre: `Prospecto ${idx}`,
            cargo: job.config.cargo || "Gerente Comercial",
            empresa: job.config.empresaObjetivo || `Empresa ${idx}`,
            industria: job.config.industria || "Tecnología",
            pais: job.config.pais || "Chile",
            nivelJerarquico: job.config.nivelJerarquico || "Gerencia",
            linkedinPersonal: `https://linkedin.com/in/prospecto-${idx}`,
            linkedinEmpresa: `https://linkedin.com/company/empresa-${idx}`,
            estado: "completado",
            fecha: new Date().toISOString(),
            emailStatus: "no_procesado",
            enriquecido: false,
            prioridad: "media",
            campaignReady: false,
          };
        });
        set({
          leads: [...newLeads, ...get().leads],
          prospectingJob: {
            ...job,
            status: "completado",
            progress: 100,
            completedAt: new Date().toISOString(),
            leadsGenerated: count,
          },
        });
      },

      failProspecting: () =>
        set((state) =>
          state.prospectingJob
            ? {
                prospectingJob: {
                  ...state.prospectingJob,
                  status: "error",
                  progress: state.prospectingJob.progress,
                },
              }
            : state
        ),

      updateLeadEmailStatus: (leadId, status) =>
        set((state) => ({
          leads: state.leads.map((l) =>
            l.id === leadId ? { ...l, emailStatus: status } : l
          ),
        })),

      updateCampaignEmail: (campaignId, emailId, data) =>
        set((state) => ({
          campaigns: state.campaigns.map((c) =>
            c.id === campaignId
              ? {
                  ...c,
                  emails: c.emails.map((e) =>
                    e.id === emailId ? { ...e, ...data } : e
                  ),
                }
              : c
          ),
        })),

      approveCampaign: (campaignId) =>
        set((state) => ({
          campaigns: state.campaigns.map((c) =>
            c.id === campaignId
              ? {
                  ...c,
                  approved: true,
                  emails: c.emails.map((e) => ({ ...e, status: "aprobado" as const })),
                }
              : c
          ),
        })),

      updateInstantlyStatus: (id, status) =>
        set((state) => ({
          instantlyCampaigns: state.instantlyCampaigns.map((c) =>
            c.id === id ? { ...c, status } : c
          ),
        })),

      requestCrmIntegration: (id) =>
        set((state) => ({
          requestedIntegrations: state.requestedIntegrations.includes(id)
            ? state.requestedIntegrations
            : [...state.requestedIntegrations, id],
          crmIntegrations: state.crmIntegrations.map((c) =>
            c.id === id && c.status === "desconectado"
              ? { ...c, status: "proximamente" as const }
              : c
          ),
        })),

      requestMarketplaceItem: (id) =>
        set((state) => ({
          requestedIntegrations: state.requestedIntegrations.includes(id)
            ? state.requestedIntegrations
            : [...state.requestedIntegrations, id],
        })),

      getKpis: () => computeKpis(get().leads, get().campaigns, get().instantlyCampaigns),
      getActivity: () => generateActivity(get().leads),
    }),
    {
      name: "zurich-lip-storage",
      partialize: (state) => ({
        leads: state.leads,
        campaigns: state.campaigns,
        instantlyCampaigns: state.instantlyCampaigns,
        selectedAiProvider: state.selectedAiProvider,
        requestedIntegrations: state.requestedIntegrations,
        crmIntegrations: state.crmIntegrations,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);

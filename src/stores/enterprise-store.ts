"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AI_MODELS, NOTIFICATIONS } from "@/lib/enterprise-data";
import type { NotificationItem } from "@/lib/enterprise-types";

interface EnterpriseState {
  enrichmentModelId: string;
  campaignModelId: string;
  presentationMode: boolean;
  tourActive: boolean;
  tourStepIndex: number;
  notifications: NotificationItem[];
  searchOpen: boolean;
  notificationsOpen: boolean;

  setEnrichmentModel: (id: string) => void;
  setCampaignModel: (id: string) => void;
  setPresentationMode: (v: boolean) => void;
  startTour: () => void;
  nextTourStep: () => void;
  stopTour: () => void;
  setSearchOpen: (v: boolean) => void;
  setNotificationsOpen: (v: boolean) => void;
  markNotificationsRead: () => void;
}

export const useEnterpriseStore = create<EnterpriseState>()(
  persist(
    (set, get) => ({
      enrichmentModelId: "perplexity-sonar",
      campaignModelId: "gpt-5",
      presentationMode: false,
      tourActive: false,
      tourStepIndex: 0,
      notifications: NOTIFICATIONS,
      searchOpen: false,
      notificationsOpen: false,

      setEnrichmentModel: (id) => set({ enrichmentModelId: id }),
      setCampaignModel: (id) => set({ campaignModelId: id }),
      setPresentationMode: (v) => set({ presentationMode: v }),

      startTour: () => set({ tourActive: true, tourStepIndex: 0, presentationMode: true }),
      nextTourStep: () => {
        const next = get().tourStepIndex + 1;
        if (next >= 7) {
          set({ tourActive: false, tourStepIndex: 0, presentationMode: false });
          return;
        }
        set({ tourStepIndex: next });
      },
      stopTour: () => set({ tourActive: false, tourStepIndex: 0, presentationMode: false }),

      setSearchOpen: (v) => set({ searchOpen: v }),
      setNotificationsOpen: (v) => set({ notificationsOpen: v }),
      markNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),
    }),
    {
      name: "zurich-enterprise-storage",
      partialize: (s) => ({
        enrichmentModelId: s.enrichmentModelId,
        campaignModelId: s.campaignModelId,
        presentationMode: s.presentationMode,
      }),
    }
  )
);

export function getModelLabel(id: string) {
  return AI_MODELS.find((m) => m.id === id)?.modelo ?? id;
}

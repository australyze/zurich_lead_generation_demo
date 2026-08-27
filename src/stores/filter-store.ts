"use client";

import { create } from "zustand";
import { DEFAULT_FILTERS } from "@/lib/analytics-data";
import type { GlobalFilters } from "@/lib/analytics-types";

interface FilterState {
  filters: GlobalFilters;
  setFilter: <K extends keyof GlobalFilters>(key: K, value: GlobalFilters[K]) => void;
  setFilters: (partial: Partial<GlobalFilters>) => void;
  resetFilters: () => void;
  drilldownId: string | null;
  setDrilldownId: (id: string | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: DEFAULT_FILTERS,
  setFilter: (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value } })),
  setFilters: (partial) => set((s) => ({ filters: { ...s.filters, ...partial } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  drilldownId: null,
  setDrilldownId: (id) => set({ drilldownId: id }),
}));

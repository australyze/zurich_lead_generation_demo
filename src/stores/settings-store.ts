"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_NOTIFICATION_PREFS,
  DEFAULT_PREFERENCES,
  DEFAULT_PROFILE,
} from "@/lib/settings-data";
import type { NotificationPrefs, UserPreferences, UserProfile } from "@/lib/settings-types";

function deriveInitials(nombre: string): string {
  const parts = nombre.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface SettingsState {
  profile: UserProfile;
  notificationPrefs: NotificationPrefs;
  preferences: UserPreferences;

  updateProfile: (data: Partial<UserProfile>) => void;
  updateNotificationPrefs: (data: Partial<NotificationPrefs>) => void;
  updatePreferences: (data: Partial<UserPreferences>) => void;
  changePassword: (current: string, newPassword: string) => { ok: boolean; error?: string };
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      notificationPrefs: DEFAULT_NOTIFICATION_PREFS,
      preferences: DEFAULT_PREFERENCES,

      updateProfile: (data) =>
        set((state) => {
          const merged = { ...state.profile, ...data };
          const avatarInitials =
            data.nombre !== undefined ? deriveInitials(data.nombre) : merged.avatarInitials;
          return { profile: { ...merged, avatarInitials } };
        }),

      updateNotificationPrefs: (data) =>
        set((state) => ({
          notificationPrefs: { ...state.notificationPrefs, ...data },
        })),

      updatePreferences: (data) =>
        set((state) => ({
          preferences: { ...state.preferences, ...data },
        })),

      changePassword: (current, newPassword) => {
        if (!current.trim() || !newPassword.trim()) {
          return { ok: false, error: "Todos los campos son obligatorios." };
        }
        if (newPassword.length < 8) {
          return { ok: false, error: "La nueva contraseña debe tener al menos 8 caracteres." };
        }
        if (current === newPassword) {
          return { ok: false, error: "La nueva contraseña debe ser distinta a la actual." };
        }
        return { ok: true };
      },
    }),
    {
      name: "zurich-settings-storage",
      partialize: (state) => ({
        profile: state.profile,
        notificationPrefs: state.notificationPrefs,
        preferences: state.preferences,
      }),
    }
  )
);

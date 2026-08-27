import type { NotificationPrefs, UserPreferences, UserProfile } from "./settings-types";

export const DEFAULT_PROFILE: UserProfile = {
  nombre: "Gerente Comercial",
  email: "gerente.comercial@zurich.cl",
  telefono: "+56 9 1234 5678",
  cargo: "Gerente Comercial",
  empresa: "Zurich",
  avatarInitials: "GC",
};

export const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  campanas: true,
  leads: true,
  crm: true,
  reportes: false,
  digestSemanal: true,
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  idioma: "es",
  zonaHoraria: "America/Santiago",
  formatoFecha: "dd/MM/yyyy",
};

export const ACTIVE_SESSIONS = [
  { id: "s1", dispositivo: "Chrome en Windows", ubicacion: "Santiago, Chile", activa: true, ultimoAcceso: "Ahora" },
  { id: "s2", dispositivo: "Safari en iPhone", ubicacion: "Santiago, Chile", activa: false, ultimoAcceso: "Hace 2 días" },
];

export interface UserProfile {
  nombre: string;
  email: string;
  telefono: string;
  cargo: string;
  empresa: string;
  avatarInitials: string;
}

export interface NotificationPrefs {
  campanas: boolean;
  leads: boolean;
  crm: boolean;
  reportes: boolean;
  digestSemanal: boolean;
}

export interface UserPreferences {
  idioma: string;
  zonaHoraria: string;
  formatoFecha: string;
}

export type SettingsSection = "perfil" | "seguridad" | "notificaciones" | "preferencias";

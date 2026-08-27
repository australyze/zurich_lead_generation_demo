"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Bell,
  Globe,
  Lock,
  User,
  ExternalLink,
  Camera,
} from "lucide-react";
import { ACTIVE_SESSIONS } from "@/lib/settings-data";
import type { NotificationPrefs, SettingsSection } from "@/lib/settings-types";
import { useSettingsStore } from "@/stores/settings-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const NAV: { id: SettingsSection; label: string; icon: typeof User }[] = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "seguridad", label: "Seguridad", icon: Lock },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "preferencias", label: "Preferencias", icon: Globe },
];

const NOTIFICATION_ITEMS: {
  key: keyof NotificationPrefs;
  title: string;
  description: string;
}[] = [
  { key: "campanas", title: "Campañas", description: "Aprobaciones, envíos y respuestas de secuencias." },
  { key: "leads", title: "Leads", description: "Nuevos contactos, enriquecimiento y cambios de estado." },
  { key: "crm", title: "CRM", description: "Sincronizaciones y solicitudes de conectores." },
  { key: "reportes", title: "Reportes", description: "Alertas de KPIs y umbrales de performance." },
  { key: "digestSemanal", title: "Resumen semanal", description: "Digest ejecutivo por correo cada lunes." },
];

export default function ConfiguracionPage() {
  const profile = useSettingsStore((s) => s.profile);
  const notificationPrefs = useSettingsStore((s) => s.notificationPrefs);
  const preferences = useSettingsStore((s) => s.preferences);
  const updateProfile = useSettingsStore((s) => s.updateProfile);
  const updateNotificationPrefs = useSettingsStore((s) => s.updateNotificationPrefs);
  const updatePreferences = useSettingsStore((s) => s.updatePreferences);
  const changePassword = useSettingsStore((s) => s.changePassword);

  const [activeSection, setActiveSection] = useState<SettingsSection>("perfil");
  const [profileForm, setProfileForm] = useState({
    nombre: profile.nombre,
    email: profile.email,
    telefono: profile.telefono,
    cargo: profile.cargo,
  });
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function scrollToSection(id: SettingsSection) {
    setActiveSection(id);
    document.getElementById(`settings-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSaveProfile() {
    updateProfile(profileForm);
    toast.success("Perfil actualizado", {
      description: "Los cambios se reflejan en el header y la sesión demo.",
    });
  }

  function handleChangePassword() {
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    const result = changePassword(passwordForm.current, passwordForm.new);
    if (!result.ok) {
      setPasswordError(result.error ?? "Error al actualizar la contraseña.");
      return;
    }
    setPasswordError(null);
    setPasswordForm({ current: "", new: "", confirm: "" });
    toast.success("Contraseña actualizada", {
      description: "Cambio simulado — sin backend real.",
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Configuración</h1>
        <p className="mt-1 text-sm text-[#64748b]">Gestione su cuenta y preferencias</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                  active
                    ? "bg-[#EAF4FF] text-[#003366]"
                    : "text-[#64748b] hover:bg-[#F5F7FA] hover:text-[#003366]"
                )}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-6">
          <section id="settings-perfil">
            <Card>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Información personal y de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">{profile.avatarInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toast.message("Cambio de foto simulado", {
                          description: "En producción se abriría un selector de imagen.",
                        })
                      }
                    >
                      <Camera size={14} />
                      Cambiar foto
                    </Button>
                    <p className="mt-2 text-xs text-[#64748b]">JPG o PNG. Máximo 2 MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input
                      id="nombre"
                      value={profileForm.nombre}
                      onChange={(e) => setProfileForm((f) => ({ ...f, nombre: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={profileForm.telefono}
                      onChange={(e) => setProfileForm((f) => ({ ...f, telefono: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input
                      id="cargo"
                      value={profileForm.cargo}
                      onChange={(e) => setProfileForm((f) => ({ ...f, cargo: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input id="empresa" value={profile.empresa} disabled className="bg-[#F5F7FA]" />
                    <p className="text-xs text-[#94a3b8]">Gestionada por administración de organización.</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>Guardar cambios</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="settings-seguridad">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>Contraseña y sesiones activas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm((f) => ({ ...f, current: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordForm.new}
                      onChange={(e) => setPasswordForm((f) => ({ ...f, new: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm((f) => ({ ...f, confirm: e.target.value }))}
                    />
                  </div>
                </div>

                {passwordError && (
                  <p className="text-sm text-red-600">{passwordError}</p>
                )}

                <div className="flex justify-end">
                  <Button onClick={handleChangePassword}>Actualizar contraseña</Button>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold text-[#003366]">Sesiones activas</h3>
                  <p className="mt-1 text-sm text-[#64748b]">
                    Dispositivos con acceso a su cuenta en esta demo.
                  </p>
                  <ul className="mt-4 space-y-3">
                    {ACTIVE_SESSIONS.map((session) => (
                      <li
                        key={session.id}
                        className="flex items-center justify-between rounded-lg border border-[#e2e8f0] px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#003366]">{session.dispositivo}</p>
                          <p className="text-xs text-[#64748b]">
                            {session.ubicacion} · {session.ultimoAcceso}
                          </p>
                        </div>
                        {session.activa ? (
                          <Badge variant="success">Activa</Badge>
                        ) : (
                          <Badge variant="outline">Reciente</Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="settings-notificaciones">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Configure alertas por correo y en la plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {NOTIFICATION_ITEMS.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4 rounded-lg border border-[#e2e8f0] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#003366]">{item.title}</p>
                      <p className="text-xs text-[#64748b]">{item.description}</p>
                    </div>
                    <Switch
                      checked={notificationPrefs[item.key]}
                      onCheckedChange={(checked) => {
                        updateNotificationPrefs({ [item.key]: checked });
                        toast.message(`${item.title}: ${checked ? "activado" : "desactivado"}`);
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section id="settings-preferencias">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias</CardTitle>
                <CardDescription>Idioma, zona horaria y formato regional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Idioma</Label>
                    <Select
                      value={preferences.idioma}
                      onValueChange={(v) => {
                        updatePreferences({ idioma: v });
                        toast.success("Idioma actualizado");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Zona horaria</Label>
                    <Select
                      value={preferences.zonaHoraria}
                      onValueChange={(v) => {
                        updatePreferences({ zonaHoraria: v });
                        toast.success("Zona horaria actualizada");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Santiago">Santiago (GMT-4)</SelectItem>
                        <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                        <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Formato de fecha</Label>
                    <Select
                      value={preferences.formatoFecha}
                      onValueChange={(v) => {
                        updatePreferences({ formatoFecha: v });
                        toast.success("Formato de fecha actualizado");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                        <SelectItem value="yyyy-MM-dd">yyyy-MM-dd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#F5F7FA] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-[#003366]">Configuración de organización</p>
                    <p className="text-xs text-[#64748b]">
                      Equipos, roles y datos del workspace Zurich.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/administracion">
                      Administración
                      <ExternalLink size={14} />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

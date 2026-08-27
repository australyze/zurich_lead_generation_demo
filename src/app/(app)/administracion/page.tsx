"use client";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { ROLES, TEAMS } from "@/lib/enterprise-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdministracionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Administración</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Centro de configuración empresarial — organización, equipos y roles
        </p>
      </div>

      <Card className="overflow-hidden border-[#003366]/15">
        <CardHeader className="bg-gradient-to-r from-[#003366] to-[#0066CC] text-white">
          <CardTitle className="text-white">Organización</CardTitle>
          <CardDescription className="text-white/70">Identidad del workspace Zurich</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <OrgField label="Nombre Cliente" value="Zurich" />
          <OrgField label="Ambiente" value="Demo" />
          <OrgField label="Región" value="Latam" />
          <OrgField label="Usuario Responsable" value="Gerente Comercial" />
        </CardContent>
        <div className="border-t border-[#e2e8f0] px-5 py-3 flex flex-wrap gap-2">
          {["Demo", "Producción", "Sandbox"].map((env) => (
            <Badge key={env} variant={env === "Demo" ? "default" : "outline"}>
              {env}
            </Badge>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Equipos</CardTitle>
          <CardDescription>Gestión visual de unidades comerciales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Equipo</th>
                  <th className="px-4 py-3 font-medium">Usuarios</th>
                  <th className="px-4 py-3 font-medium">Último acceso</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {TEAMS.map((t) => (
                  <tr key={t.id} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3 font-medium text-[#003366]">{t.nombre}</td>
                    <td className="px-4 py-3 tabular-nums">{t.usuarios}</td>
                    <td className="px-4 py-3 text-[#64748b]">
                      {formatDistanceToNow(new Date(t.ultimoAcceso), { addSuffix: true, locale: es })}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="success">{t.estado}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#64748b]">Roles RBAC</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {ROLES.map((role) => (
            <Card key={role.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{role.rol}</CardTitle>
                  <Badge variant="secondary">Solo visual</Badge>
                </div>
                <CardDescription>{role.descripcion}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                {role.permisos.map((p) => (
                  <Badge key={p} variant="outline">{p}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function OrgField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-[#94a3b8]">{label}</p>
      <p className="mt-1 text-base font-semibold text-[#003366]">{value}</p>
    </div>
  );
}

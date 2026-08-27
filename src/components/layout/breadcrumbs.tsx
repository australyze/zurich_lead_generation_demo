"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  analitica: "Analítica",
  operaciones: "Centro de Operaciones",
  apify: "Apify",
  "url-empresa": "URL Empresa",
  anymailfinder: "AnymailFinder",
  validacion: "Validación",
  neverbounce: "NeverBounce",
  enriquecimiento: "Enriquecimiento",
  campanas: "Campañas",
  aprobacion: "Aprobación",
  instantly: "Instantly",
  respuestas: "Respuestas",
  crm: "CRM",
  consumo: "Consumo",
  logs: "Logs",
  prospection: "Prospección",
  correos: "Correos",
  marketplace: "Marketplace",
  configuracion: "Configuración",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-sm text-[#64748b]">
      <Link href="/dashboard" className="hover:text-[#0066CC] transition-colors">
        <Home size={14} />
      </Link>
      {parts.map((part, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/");
        const isLast = i === parts.length - 1;
        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-[#cbd5e1]" />
            {isLast ? (
              <span className="font-medium text-[#003366]">{LABELS[part] ?? part}</span>
            ) : (
              <Link href={href} className="hover:text-[#0066CC] transition-colors">
                {LABELS[part] ?? part}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

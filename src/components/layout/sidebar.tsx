"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  Mail,
  Sparkles,
  Megaphone,
  Zap,
  Network,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Radar,
  Brain,
  Building2,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { useEnterpriseStore } from "@/stores/enterprise-store";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analitica", label: "Analítica", icon: BarChart3 },
  { href: "/impacto", label: "Impacto Comercial", icon: TrendingUp },
  { href: "/operaciones", label: "Centro de Operaciones", icon: Radar },
  { href: "/prospection", label: "Prospección", icon: Search },
  { href: "/correos", label: "Correos", icon: Mail },
  { href: "/enriquecimiento", label: "Enriquecimiento", icon: Sparkles },
  { href: "/campanas", label: "Campañas", icon: Megaphone },
  { href: "/instantly", label: "Instantly", icon: Zap },
  { href: "/crm", label: "CRM", icon: Network },
  { href: "/modelos-ia", label: "Modelos IA", icon: Brain },
  { href: "/casos-uso", label: "Casos de Uso", icon: BookOpen },
  { href: "/administracion", label: "Administración", icon: Building2 },
  { href: "/configuracion", label: "Configuración", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const collapsedStore = useAppStore((s) => s.sidebarCollapsed);
  const setCollapsed = useAppStore((s) => s.setSidebarCollapsed);
  const presentationMode = useEnterpriseStore((s) => s.presentationMode);
  const collapsed = collapsedStore || presentationMode;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[#1a4a7a] bg-[#003366] text-white transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className={cn("flex h-16 items-center border-b border-white/10 px-4", collapsed ? "justify-center" : "gap-3")}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0066CC] text-sm font-bold tracking-tight">
          ZL
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">Zurich Lead</p>
            <p className="truncate text-[11px] text-white/60">Intelligence Platform</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          const link = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-0"
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-[#4da3ff]"
                />
              )}
              <Icon className="shrink-0" size={18} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }
          return link;
        })}
      </nav>

      {!presentationMode && (
        <div className="border-t border-white/10 p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsedStore)}
            className="w-full justify-center text-white/70 hover:bg-white/10 hover:text-white"
          >
            {collapsedStore ? <ChevronRight size={16} /> : (
              <>
                <ChevronLeft size={16} />
                <span>Colapsar</span>
              </>
            )}
          </Button>
        </div>
      )}
    </aside>
  );
}

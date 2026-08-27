"use client";

import { Search, Play, Presentation } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { useEnterpriseStore } from "@/stores/enterprise-store";
import { useSettingsStore } from "@/stores/settings-store";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "@/components/enterprise/global-search";
import { NotificationsCenter } from "@/components/enterprise/notifications-center";
import { AiModelSelectors } from "@/components/enterprise/ai-model-selectors";
import { GuidedTour } from "@/components/enterprise/guided-tour";

export function Topbar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const presentationMode = useEnterpriseStore((s) => s.presentationMode);
  const setPresentation = useEnterpriseStore((s) => s.setPresentationMode);
  const setSearchOpen = useEnterpriseStore((s) => s.setSearchOpen);
  const startTour = useEnterpriseStore((s) => s.startTour);
  const profile = useSettingsStore((s) => s.profile);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#e2e8f0] bg-white/90 px-6 backdrop-blur-md transition-all",
          collapsed || presentationMode ? "ml-[72px]" : "ml-[260px]",
          presentationMode && "h-14"
        )}
      >
        <div className="min-w-0 flex-1">
          {!presentationMode && <Breadcrumbs />}
          {presentationMode && (
            <p className="text-sm font-semibold text-[#003366]">Modo Presentación · Zurich Lead Intelligence</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <AiModelSelectors />

          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => {
              startTour();
              toast.message("Tour iniciado", { description: "Recorrido ejecutivo ~2 minutos." });
            }}
          >
            <Play size={14} />
            Iniciar Tour
          </Button>

          <Button
            variant={presentationMode ? "default" : "ghost"}
            size="icon"
            className={presentationMode ? "" : "text-[#64748b]"}
            title="Modo Presentación"
            onClick={() => {
              setPresentation(!presentationMode);
              toast.message(presentationMode ? "Modo presentación desactivado" : "Modo presentación activado");
            }}
          >
            <Presentation size={18} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-[#64748b]"
            onClick={() => setSearchOpen(true)}
            title="Buscar"
          >
            <Search size={18} />
          </Button>

          <NotificationsCenter />

          {!presentationMode && (
            <div className="flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-[#F5F7FA] px-2.5 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0066CC] text-xs font-semibold text-white">
                {profile.avatarInitials}
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold text-[#003366] leading-tight">{profile.cargo}</p>
                <p className="text-[10px] text-[#64748b]">{profile.empresa}</p>
              </div>
            </div>
          )}
        </div>
      </header>
      <GlobalSearch />
      <GuidedTour />
    </>
  );
}

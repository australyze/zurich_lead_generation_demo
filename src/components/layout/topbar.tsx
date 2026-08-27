"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useAppStore } from "@/stores/app-store";
import { cn } from "@/lib/utils";

export function Topbar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#e2e8f0] bg-white/90 px-6 backdrop-blur-md",
        collapsed ? "ml-[72px]" : "ml-[260px]"
      )}
    >
      <div className="min-w-0 flex-1">
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <Input
            placeholder="Buscar leads, campañas..."
            className="w-64 pl-9 bg-[#F5F7FA] border-transparent focus-visible:bg-white"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative text-[#64748b]">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#0066CC]" />
        </Button>
        <div className="flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-[#F5F7FA] px-2.5 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0066CC] text-xs font-semibold text-white">
            GC
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-[#003366] leading-tight">Gerente Comercial</p>
            <p className="text-[10px] text-[#64748b]">Zurich Demo</p>
          </div>
        </div>
      </div>
    </header>
  );
}

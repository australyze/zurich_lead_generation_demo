"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/stores/app-store";
import { useEnterpriseStore } from "@/stores/enterprise-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function AppShell({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const presentationMode = useEnterpriseStore((s) => s.presentationMode);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen bg-[#F5F7FA]">
        <div className="w-[260px] bg-[#003366]" />
        <div className="flex-1 p-6 space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sideCollapsed = collapsed || presentationMode;

  return (
    <div
      className={cn(
        "min-h-screen bg-[#F5F7FA] transition-all",
        presentationMode && "presentation-mode text-[15px]"
      )}
    >
      <Sidebar />
      <Topbar />
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] p-6 transition-all duration-300",
          sideCollapsed ? "ml-[72px]" : "ml-[260px]",
          presentationMode && "p-8 md:p-10"
        )}
      >
        {children}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/stores/app-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function AppShell({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
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

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Sidebar />
      <Topbar />
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] p-6 transition-all duration-300",
          collapsed ? "ml-[72px]" : "ml-[260px]"
        )}
      >
        {children}
      </main>
    </div>
  );
}

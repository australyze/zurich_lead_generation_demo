"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <TooltipProvider delayDuration={200}>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            className: "font-sans text-sm",
          }}
        />
      </TooltipProvider>
    </QueryProvider>
  );
}

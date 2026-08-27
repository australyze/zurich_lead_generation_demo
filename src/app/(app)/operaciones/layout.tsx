"use client";

import { OpsSubnav } from "@/components/ops/ops-subnav";
import { TraceabilityDrawer } from "@/components/ops/traceability-drawer";

export default function OperacionesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <OpsSubnav />
      {children}
      <TraceabilityDrawer />
    </div>
  );
}

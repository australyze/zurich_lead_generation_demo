"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OPS_NAV } from "@/lib/ops-data";
import { cn } from "@/lib/utils";

export function OpsSubnav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white p-2 shadow-sm">
      <div className="flex min-w-max gap-1">
        {OPS_NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                active
                  ? "bg-[#003366] text-white"
                  : "text-[#64748b] hover:bg-[#EAF4FF] hover:text-[#003366]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

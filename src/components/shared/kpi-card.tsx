"use client";

import { motion } from "framer-motion";
import { cn, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  hint?: string;
  index?: number;
  accent?: string;
}

export function KpiCard({ title, value, icon: Icon, hint, index = 0, accent = "bg-[#EAF4FF] text-[#0066CC]" }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="flex items-start justify-between p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#64748b]">{title}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-[#003366]">{formatNumber(value)}</p>
            {hint && <p className="mt-1 text-xs text-[#94a3b8]">{hint}</p>}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", accent)}>
            <Icon size={18} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

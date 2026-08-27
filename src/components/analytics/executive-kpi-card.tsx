"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import type { SparkKpi } from "@/lib/analytics-types";

interface ExecutiveKpiCardProps {
  kpi: SparkKpi;
  index?: number;
  onClick?: () => void;
}

export function ExecutiveKpiCard({ kpi, index = 0, onClick }: ExecutiveKpiCardProps) {
  const positive = kpi.delta >= 0;
  const chartData = kpi.sparkline.map((v, i) => ({ i, v }));

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      onClick={onClick}
      className="group w-full rounded-xl border border-[#e2e8f0] bg-white p-4 text-left shadow-sm transition-all hover:border-[#0066CC]/40 hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[#64748b] leading-tight">
          {kpi.label}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
            positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          )}
        >
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {positive ? "+" : ""}
          {kpi.delta.toFixed(1)}%
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-[#003366] group-hover:text-[#0066CC] transition-colors">
        {formatNumber(kpi.value)}
      </p>
      <div className="mt-3 h-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={positive ? "#0066CC" : "#dc2626"} stopOpacity={0.35} />
                <stop offset="100%" stopColor={positive ? "#0066CC" : "#dc2626"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={positive ? "#0066CC" : "#dc2626"}
              fill={`url(#spark-${kpi.id})`}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.button>
  );
}

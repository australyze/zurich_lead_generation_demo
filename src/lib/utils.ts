import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("es-CL").format(n);
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

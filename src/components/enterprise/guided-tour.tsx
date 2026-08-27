"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TOUR_STEPS } from "@/lib/enterprise-data";
import { useEnterpriseStore } from "@/stores/enterprise-store";
import { Button } from "@/components/ui/button";

export function GuidedTour() {
  const active = useEnterpriseStore((s) => s.tourActive);
  const stepIndex = useEnterpriseStore((s) => s.tourStepIndex);
  const next = useEnterpriseStore((s) => s.nextTourStep);
  const stop = useEnterpriseStore((s) => s.stopTour);
  const router = useRouter();

  const step = TOUR_STEPS[stepIndex];

  useEffect(() => {
    if (!active || !step) return;
    router.push(step.route);
  }, [active, step, router]);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => next(), 17000); // ~2 min / 7 steps
    return () => clearTimeout(t);
  }, [active, stepIndex, next]);

  return (
    <AnimatePresence>
      {active && step && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 z-50 w-[min(440px,calc(100%-2rem))] -translate-x-1/2 rounded-xl border border-[#003366]/20 bg-[#003366] p-4 text-white shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-white/60">
                Tour guiado · {stepIndex + 1}/{TOUR_STEPS.length}
              </p>
              <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-white/80">{step.description}</p>
            </div>
            <button type="button" onClick={stop} className="text-white/60 hover:text-white cursor-pointer">
              <X size={16} />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-1">
              {TOUR_STEPS.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1.5 w-6 rounded-full ${i <= stepIndex ? "bg-[#4da3ff]" : "bg-white/20"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" onClick={stop}>
                Salir
              </Button>
              <Button size="sm" className="bg-white text-[#003366] hover:bg-[#EAF4FF]" onClick={next}>
                {stepIndex === TOUR_STEPS.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

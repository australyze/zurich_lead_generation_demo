"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { SEARCH_INDEX } from "@/lib/enterprise-data";
import { useEnterpriseStore } from "@/stores/enterprise-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function GlobalSearch() {
  const open = useEnterpriseStore((s) => s.searchOpen);
  const setOpen = useEnterpriseStore((s) => s.setSearchOpen);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return SEARCH_INDEX.slice(0, 6);
    return SEARCH_INDEX.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Búsqueda global</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 border-b border-[#e2e8f0] px-4">
          <Search size={16} className="text-[#94a3b8]" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar leads, campañas, empresas, integraciones..."
            className="border-0 shadow-none focus-visible:ring-0 h-12"
          />
        </div>
        <div className="max-h-80 overflow-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-[#64748b]">Sin resultados</p>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left hover:bg-[#EAF4FF] cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  router.push(r.href);
                }}
              >
                <div>
                  <p className="text-sm font-medium text-[#003366]">{r.title}</p>
                  <p className="text-xs text-[#64748b]">{r.subtitle}</p>
                </div>
                <Badge variant="secondary">{r.type}</Badge>
              </button>
            ))
          )}
        </div>
        <div className="border-t border-[#e2e8f0] px-4 py-2 text-[11px] text-[#94a3b8]">
          ⌘K / Ctrl+K para abrir · Enter para navegar
        </div>
      </DialogContent>
    </Dialog>
  );
}

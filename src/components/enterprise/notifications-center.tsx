"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useEnterpriseStore } from "@/stores/enterprise-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function NotificationsCenter() {
  const notifications = useEnterpriseStore((s) => s.notifications);
  const open = useEnterpriseStore((s) => s.notificationsOpen);
  const setOpen = useEnterpriseStore((s) => s.setNotificationsOpen);
  const markRead = useEnterpriseStore((s) => s.markNotificationsRead);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) markRead();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-[#64748b]">
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0066CC] px-1 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Notificaciones</DialogTitle>
          <DialogDescription>Actividad reciente de la plataforma</DialogDescription>
        </DialogHeader>
        <div className="max-h-96 space-y-2 overflow-auto">
          {notifications.map((n) => (
            <Link
              key={n.id}
              href={n.href ?? "/dashboard"}
              onClick={() => setOpen(false)}
              className={`block rounded-lg border p-3 transition-colors hover:bg-[#F5F7FA] ${
                n.read ? "border-[#e2e8f0]" : "border-[#0066CC]/30 bg-[#EAF4FF]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-[#003366]">{n.title}</p>
                <span className="shrink-0 text-[10px] text-[#94a3b8]">{n.time}</span>
              </div>
              <p className="mt-1 text-xs text-[#64748b]">{n.description}</p>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

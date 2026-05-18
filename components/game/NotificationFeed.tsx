"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Card } from "@/components/common/Card";
import { useGameStore } from "@/features/game/store/useGameStore";

export function NotificationFeed() {
  const notifications = useGameStore((state) => state.notifications);

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <Bell size={18} className="text-yellow-200" />
        <h2 className="text-xl font-bold">알림</h2>
      </div>
      <div className="grid min-h-40 gap-2">
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="rounded-lg border border-white/10 bg-black/15 p-3 text-sm text-white/80"
            >
              {notification.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}

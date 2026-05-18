"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGameStore } from "@/features/game/store/useGameStore";

export function GameCloudSync() {
  const { data: session } = useSession();
  const mergeCloudState = useGameStore((state) => state.mergeCloudState);
  const syncCloudState = useGameStore((state) => state.syncCloudState);
  const hydrated = useGameStore((state) => state.hydrated);

  useEffect(() => {
    if (!session?.user || !hydrated) {
      return;
    }

    void mergeCloudState();
  }, [hydrated, mergeCloudState, session?.user]);

  useEffect(() => {
    if (!session?.user || !hydrated) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void syncCloudState();
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [hydrated, session?.user, syncCloudState]);

  return null;
}

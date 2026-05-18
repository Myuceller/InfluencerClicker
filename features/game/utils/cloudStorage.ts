import type { PersistedGameState } from "../types/game";

export async function loadCloudGameState() {
  const response = await fetch("/api/game/save", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const body = (await response.json()) as {
    save: PersistedGameState | null;
  };

  return body.save;
}

export async function saveCloudGameState(state: PersistedGameState) {
  const response = await fetch("/api/game/save", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  });

  return response.ok;
}

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { PersistedGameState } from "@/features/game/types/game";

function toPersistedState(save: {
  thumbnails: number;
  likes: number;
  totalLikes: number;
  followers: number;
  money: number;
  totalClicks: number;
  upgradeLevels: unknown;
  achievements: unknown;
  playTimeSeconds: number;
}): PersistedGameState {
  return {
    thumbnails: save.thumbnails,
    likes: save.likes,
    totalLikes: save.totalLikes,
    followers: save.followers,
    money: save.money,
    totalClicks: save.totalClicks,
    upgradeLevels: (save.upgradeLevels as Record<string, number>) ?? {},
    achievements: (save.achievements as string[]) ?? [],
    playTimeSeconds: save.playTimeSeconds,
  };
}

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const save = await prisma.gameSave.findUnique({
    where: { userId },
  });

  return Response.json({
    save: save ? toPersistedState(save) : null,
  });
}

export async function PUT(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = (await request.json()) as PersistedGameState;

  const save = await prisma.gameSave.upsert({
    where: { userId },
    update: {
      thumbnails: body.thumbnails,
      likes: body.likes,
      totalLikes: body.totalLikes,
      followers: body.followers,
      money: body.money,
      totalClicks: body.totalClicks,
      upgradeLevels: body.upgradeLevels,
      achievements: body.achievements,
      playTimeSeconds: body.playTimeSeconds,
    },
    create: {
      userId,
      thumbnails: body.thumbnails,
      likes: body.likes,
      totalLikes: body.totalLikes,
      followers: body.followers,
      money: body.money,
      totalClicks: body.totalClicks,
      upgradeLevels: body.upgradeLevels,
      achievements: body.achievements,
      playTimeSeconds: body.playTimeSeconds,
    },
  });

  return Response.json({
    save: toPersistedState(save),
  });
}

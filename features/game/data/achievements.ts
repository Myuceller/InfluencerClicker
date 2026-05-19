import type { Achievement } from "../types/game";

export const achievements: Achievement[] = [
  {
    id: "first-like",
    name: "첫 좋아요",
    description: "처음으로 좋아요를 받고 쇼를 시작하세요.",
    condition: { metric: "totalClicks", threshold: 1 },
  },
  {
    id: "like-machine",
    name: "좋아요 기계",
    description: "좋아요 100개를 모으세요.",
    condition: { metric: "totalLikes", threshold: 100 },
  },
  {
    id: "micro-famous",
    name: "마이크로 셀럽",
    description: "팔로워 100명을 달성하세요. 이모가 감탄합니다.",
    condition: { metric: "followers", threshold: 100 },
  },
  {
    id: "engagement-farmer",
    name: "반응 농부",
    description: "좋아요 500개를 모으세요.",
    condition: { metric: "totalLikes", threshold: 500 },
  },
  {
    id: "ad-money",
    name: "첫 수익화",
    description: "수익 100원을 모으세요.",
    condition: { metric: "money", threshold: 100 },
  },
  {
    id: "always-clickable",
    name: "누르면 터짐",
    description: "초당 좋아요 10개를 달성하세요.",
    condition: { metric: "likesPerSecond", threshold: 10 },
  },
];

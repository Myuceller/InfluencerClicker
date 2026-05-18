import type { Achievement } from "../types/game";

export const achievements: Achievement[] = [
  {
    id: "first-post",
    name: "첫 게시물",
    description: "릴 하나를 올리고 쇼를 시작하세요.",
    condition: { metric: "totalClicks", threshold: 1 },
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
    condition: { metric: "likes", threshold: 500 },
  },
  {
    id: "always-online",
    name: "항상 접속 중",
    description: "초당 좋아요 10개를 달성하세요.",
    condition: { metric: "likesPerSecond", threshold: 10 },
  },
];

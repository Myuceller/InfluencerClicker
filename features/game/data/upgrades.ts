import type { Upgrade } from "../types/game";

export const upgrades: Upgrade[] = [
  {
    id: "ring-light",
    name: "링 라이트",
    description: "플라스틱 조명이 줄 수 있는 최대치의 신뢰감을 더합니다.",
    baseCost: 15,
    costMultiplier: 1.45,
    effectType: "click",
    effectValue: 1,
  },
  {
    id: "caption-ai",
    name: "캡션 AI",
    description: "'이건 꼭 들어야 해요' 같은 문구를 공장처럼 찍어냅니다.",
    baseCost: 60,
    costMultiplier: 1.55,
    effectType: "click",
    effectValue: 3,
  },
  {
    id: "intern-army",
    name: "인턴 부대",
    description: "게시물을 예약하고 '헐'을 답글로 달며 제국을 유지합니다.",
    baseCost: 40,
    costMultiplier: 1.5,
    effectType: "passive",
    effectValue: 1,
  },
  {
    id: "brand-deal",
    name: "수상한 브랜드 딜",
    description: "아무도 추천해달라 하지 않은 제품에서 좋아요가 흘러나옵니다.",
    baseCost: 180,
    costMultiplier: 1.65,
    effectType: "passive",
    effectValue: 4,
  },
];

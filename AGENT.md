# Project Rules

## Project
Clout Clicker is a satirical influencer idle clicker game.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Framer Motion
- localStorage

## Architecture
Use feature-based architecture.

Main folders:
- app/
- components/common/
- components/game/
- features/game/store/
- features/game/data/
- features/game/utils/
- features/game/types/
- lib/

Do not use MVC.

## Coding Rules
- Keep page.tsx thin.
- Put game state in Zustand.
- Put game data in features/game/data.
- Put calculation logic in features/game/utils.
- Use clear TypeScript types.
- Do not hardcode upgrade logic inside UI components.
- Save progress with localStorage.

## UI Direction
Funny, polished, social-media-inspired, meme-like, but not messy.
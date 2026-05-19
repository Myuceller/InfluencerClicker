# AGENTS.md

# Clout Clicker

Clout Clicker is a satirical influencer idle clicker game inspired by TikTok, Instagram Reels, internet dopamine culture, and the attention economy.

The tone should feel:

* funny
* meme-inspired
* polished
* modern
* social-media-themed
* playful but not chaotic

Avoid generic cookie-clicker aesthetics.

---

# Tech Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* Zustand
* Framer Motion
* localStorage

Do NOT add unnecessary dependencies.

---

# Architecture

Use feature-based architecture.

Project structure:

app/
components/
features/
lib/
public/

Do NOT use MVC.

---

# Folder Responsibilities

## app/

Routing and page entry only.

Keep page.tsx minimal.

Do not place business logic here.

---

## components/game/

UI-only game components.

Examples:

* ResourcePanel
* ClickButton
* UpgradeShop
* NotificationFeed
* AnalyticsPanel
* AchievementList

Avoid heavy logic inside components.

---

## features/game/store/

Zustand game state only.

All global game state belongs here.

Examples:

* likes
* followers
* dopamine
* clout
* upgrades
* achievements
* notifications

---

## features/game/data/

Static game data.

Examples:

* upgrades
* achievements
* random events

Do not hardcode game data inside components.

---

## features/game/utils/

Pure utility functions only.

Examples:

* calculations
* number formatting
* save/load logic
* balancing formulas

---

# Game Design Rules

The game loop:

Upload Reel
→ gain Likes
→ buy upgrades
→ increase Followers
→ gain passive income
→ unlock achievements
→ trigger random influencer events

The game should satirize:

* influencer culture
* dopamine addiction
* AI-generated content
* engagement farming
* algorithm obsession

---

# UI Direction

The UI should feel:

* mobile-app inspired
* dashboard-heavy
* bright neon accents
* fake analytics aesthetic
* social media inspired

Include:

* badges
* fake notifications
* animated counters
* dopamine-style visual feedback

Avoid:

* plain default Tailwind look
* boring admin dashboard appearance
* excessive text walls

---

# Coding Rules

* Use TypeScript everywhere.
* Prefer small reusable components.
* Prefer explicit types.
* Avoid giant files.
* Avoid deeply nested logic.
* Avoid unnecessary abstraction.

---

# Performance Rules

* Keep rerenders minimal.
* Use Zustand selectors when appropriate.
* Avoid unnecessary state duplication.
* Keep animations lightweight.

---

# localStorage Rules

Game progress must persist automatically.

Save:

* resources
* upgrades
* achievements
* playtime

Do not save unnecessary UI state.

---

# Codex Rules

Before making changes:

1. Inspect current structure.
2. Explain the plan briefly.
3. Modify only necessary files.

Never rewrite the entire project unless explicitly requested.

Prefer minimal diffs over full rewrites.

When editing:

* touch as few files as possible
* preserve existing architecture
* avoid changing unrelated code

After changes:

* summarize modified files
* explain assumptions
* mention potential edge cases

---

# Scope Control

If the request is unclear:

* ask for clarification OR
* implement the smallest safe change

Do not invent backend systems unless requested.

Do not add authentication, databases, or APIs unless explicitly needed.

---

# Styling Rules

Use Tailwind utility classes.

Maintain:

* consistent spacing
* responsive layout
* readable hierarchy
* playful UI polish

Animations should feel satisfying but fast.

---

# Tone

This project is intentionally funny.

Examples of acceptable humor:

* fake viral notifications
* ragebait upgrades
* algorithm jokes
* AI influencer satire

The humor should feel internet-native, not random.

Avoid cringe boomer-style meme humor.

# randall-murphy-portfolio — Project Context

Next.js 15.5 (App Router) + TypeScript + Tailwind v4 + Framer Motion (`motion/react`) +
React Three Fiber/drei. Design language: **"Liquid Brutalism"** — dark background, heavy
brutalist typography/borders, liquid-glass blur surfaces, blue → violet → mint gradient
accents.

## Canonical color palette

Defined in `src/app/globals.css` under `@theme`. **Always use these tokens — never
hardcode a new accent hex/rgba.**

| Token (Tailwind class) | Hex | rgb | Role |
|---|---|---|---|
| `void` | `#08080F` | 8,8,15 | deepest background |
| `ink` | `#0F0E1A` | 15,14,26 | card/raised surface bg |
| `deepIndigo` | `#231E5A` | 35,30,90 | shadow tone, section transitions |
| `electric` / `neuroBlue` | `#6388FF` | 99,136,255 | primary accent (links, icons, primary CTA) |
| `violet` / `electricLavender` | `#AA8CFF` | 170,140,255 | secondary accent |
| `mint` / `sageNeon` | `#78FFC8` | 120,255,200 | tertiary accent (eyebrows, tags, success) |
| `mintBright` | `#DCFFEB` | 220,255,235 | highlight glow, sparing use |
| `warmCoral` | `#FF7E67` | 255,126,103 | **intentionally off-palette** — reserved ONLY for the "Layout" toggle in `MechanismToggles.tsx`. Do not use it anywhere else (already retired from Contact tile + About.tsx COMPASS highlight). |

`neuroBlue`/`electricLavender`/`sageNeon` are legacy classnames already retuned to the
exact hex values above — components can keep using either naming scheme, they resolve
to the same color.

**If you ever see a hardcoded `rgba(180, 144, 229, *)` or `rgba(74, 144, 226, *)` or
`#85e0a3` / `#b490e5` / `#4a90e2` anywhere in the codebase, it's leftover drift from the
pre-rebrand palette and should be updated to the values in the table above.**

## Work completed this session

1. **Hero image color-graded** to match the palette (duotone treatment, void→indigo→electric→violet→mint).
2. **`globals.css` rebuilt**: added canonical palette tokens, fixed `bg-hero`/`bg-about`/`bg-experience`/`bg-tech` (were still using leftover light-template beige gradients), added `.text-gradient`, `.blue/green/pink-text-gradient` (used by `constants.ts` project tags — these classes didn't exist before), `.eyebrow-label`. **Fixed a real bug**: shadcn `:root` tokens defaulted to a light theme; now default to the dark liquid theme via OKLCH.
3. **`tailwind.config.ts` filled in completely**, synced to `globals.css` — note this file likely does nothing unless `globals.css` has an `@config` directive pointing to it (Tailwind v4 project, CSS-first config). Verify whether it's actually wired up.
4. **WebGL context leak fixed** in `Tech.tsx`/`Ball.tsx` (canvas/Ball.tsx) — `LazyBall`'s `IntersectionObserver` only ever flipped `mounted` to `true` and never back off, so every tech ball accumulated a live WebGL context permanently after one scroll-through, blowing past the browser's context limit. Now tracks `entry.isIntersecting` directly so balls unmount (and free their context) when scrolled away. Also added explicit `WEBGL_lose_context` release on unmount in `Ball.tsx` as a second safety layer.
5. **Color-literal drift fixed** across `Tech.tsx`, `Contact.tsx`, `Experience.tsx`, `Projects.tsx`, `Hero.tsx`, `NeonPulseTracker.tsx`, `page.tsx` (Toaster styles) — all had old pre-rebrand `rgba()`/hex accent values hardcoded instead of referencing current tokens.
6. **`warmCoral` retired** from `page.tsx` (Contact tile → now `sageNeon`/mint) and `About.tsx` (COMPASS highlight → now `electricLavender`/violet). Kept intentionally in `MechanismToggles.tsx` as the Layout-toggle accent.
7. **Navbar redesigned**: removed the centered pill with desktop nav links entirely. Now: small logo pill top-left + hamburger button below it (visible on all breakpoints, not just mobile). Menu opens as a left-side sliding drawer instead of the old full-screen center-fade.
8. **Build errors fixed** (all were genuine TS errors, not just lint warnings):
   - `Experience.tsx`: `experience: any` → added local `ExperienceWithPoints` interface extending the shared `Experience` type from `constants.ts` (which doesn't declare `points`, but the data/JSX use it).
   - `liquid-glass.tsx`: hand-rolled `any`-typed click handler → `React.MouseEvent<HTMLDivElement>`. Then a `Variants` type mismatch on `containerVariants` (Framer Motion's `ease` needs a typed tuple, not `number[]`, and the ternary `{...} : {}` was inferring a bad union) → fixed by explicit tuple cast (`as [number, number, number, number]`) AND explicitly annotating `containerVariants: Variants` (imported from `motion/react`) so each ternary branch checks against the real type.
   - `theme-provider.tsx`: `any` props → proper `ThemeProviderProps` interface.

## Known open items (not yet done)

- [ ] **`next-themes` isn't actually installed** — `theme-provider.tsx` is a hardcoded stub (comment says it "couldn't install on this Windows session") that ignores all its props and just always applies a `dark` class. Not currently breaking anything visually since `globals.css` now defaults `:root` to the dark theme directly, but there's no real theme-switching capability. Either get `next-themes` installed properly or strip the now-decorative props from `layout.tsx`.
- [ ] **Duplicate lockfile warning** — Next.js found a stray `package-lock.json` at `C:\Users\ram_c\package-lock.json` (outside the repo) and is using it to infer the workspace root incorrectly. Either delete that stray lockfile or add `outputFileTracingRoot: __dirname` to `next.config.js`.
- [ ] **Unused-var ESLint warnings** (non-blocking, cosmetic) in `About.tsx` (`styles`), `Hero.tsx` (`styles`), `Footer.tsx` (`motion`), `Projects.tsx` (`useEffect`, `AnimatePresence`), `theme-provider.tsx` (the four ignored props — expected, since they're destructured only to strip them from the spread), `constants/index.ts` (several unused icon imports: `javascript`, `html`, `css`, `nyeusi`, `bootstrap`, `material`, `vite`, `perfectClean` — likely leftovers from template icons no longer used in the `technologies`/`services` arrays).
- [ ] **Verify all patched files actually landed correctly in the repo** — several were regenerated fresh in chat across multiple turns (`Tech.tsx`, `Ball.tsx`, `Contact.tsx`, `Experience.tsx`, `Projects.tsx`, `Hero.tsx`, `NeonPulseTracker.tsx`, `About.tsx`, `page.tsx`, `Navbar.tsx`, `globals.css`, `tailwind.config.ts`, `liquid-glass.tsx`, `theme-provider.tsx`). Confirm the versions in the working tree match the final state described above, not an intermediate one.
- [ ] Run `npm run build` clean once all of the above is confirmed, then do a full visual pass in the browser — especially the new left-drawer Navbar, the Tech section scroll behavior (WebGL context fix), and Contact/About color changes.
# Minimal Typographic Portfolio

An ultra-clean, space-optimized, typography-first developer portfolio. Built using pure semantic HTML, vanilla CSS, and lightweight JavaScript with a focus on functional simplicity, performance, and keypress micro-interactions.

## Features

- **Typography-First Layout**: Clean grids and minimal borders inspired by modern developer documentation sites.
- **Robust Theme Toggle**: Instant, system-preference-fallback theme engine with zero-flash rendering.
- **Micro-interactions**: Interactive hover underlines, scroll-triggered fade-ins, and animated SVGs (email flap, wiggling GitHub cat, and a spinning fake-3D globe).
- **Clipboard Helpers**: One-click clipboard actions for email and the custom CLI `npx prasanna` card.
- **Keyboard Shortcuts**: Fully responsive, keyboard-navigable page shortcuts accompanied by contrast-aware toast alerts.

## File Structure

- `index.html` — Semantic markup, inline flash-prevention theme handler, and structure.
- `styles.css` — Custom CSS variables, CSS keyframes, grid/flex layouts, and toast system styling.
- `script.js` — Intersection observers, scroll tracking, copy listeners, and the toast DOM injector.

## Keyboard Hotkeys

- <kbd>t</kbd> — Toggle theme mode (Light / Dark).
- <kbd>e</kbd> — Copy email to clipboard.
- <kbd>c</kbd> — Copy `npx` card to clipboard.
- <kbd>g</kbd> — Open GitHub page.
- <kbd>l</kbd> — Open LinkedIn profile.
- <kbd>p</kbd> — Navigate to main website (`prasanna19.xyz`).
- <kbd>k</kbd> — Expand/collapse Bug Runner (dino-style typographic game).

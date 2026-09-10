# piyushh.me

Personal site and résumé for Piyush Rathore — work, projects, open-source contributions, and writing.

**Live:** [www.piyushh.me](https://www.piyushh.me)

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS 4** with a custom token set in `app/globals.css` (Hanken Grotesk + IBM Plex Mono)
- **next-themes** for dark/light (`data-theme` attribute, dark by default)
- **MDX** posts via `next-mdx-remote` + `rehype-pretty-code` (dual-theme Shiki)
- **react-github-calendar** for the contribution graph; merged PRs come from the public GitHub search API, cached for an hour (no token)
- **Lanyard** WebSocket for the live Discord/editor status in the header
- **Nodemailer** for the contact form (`/api/contact`)
- Vercel Analytics + Speed Insights

## Content lives in `data/`

| File | What it drives |
|------|----------------|
| `data/profile.ts` | Name, role, email, résumé link, socials, Discord ID |
| `data/experience.ts` | Experience cards (company → products → bullets/tech) |
| `data/projects.ts` | Project cards, `/projects`, and `/projects/[slug]` detail pages |
| `data/skills.ts` | Grouped skill badges |
| `blogs/*.mdx` | Blog posts (frontmatter: `title`, `date`, `description`/`summary`, `tags`) |

Project images live in `public/projects/*.webp` (≤1600px wide); company logos in `public/logos/`. Tech icons resolve by name in `components/TechIcon.tsx` (own SVGs in `icons/`, then simple-icons).

## Development

```bash
bun install
bun dev
```

Environment variables (`.env.local`):

```
EMAIL_USER=you@gmail.com   # Gmail account that receives contact-form mail
EMAIL_PASS=app-password    # Gmail app password
```

## Scripts

- `bun dev` — dev server
- `bun run build` / `bun start` — production build and server
- `bun run lint` — ESLint

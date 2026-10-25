# Cosmic Frontier — Personal Portfolio Website

A stunning, space-themed personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Designed for SEO specialists, web developers, and technology enthusiasts.

> **Theme:** _Cosmic Frontier — Exploring the Digital Universe_

## ✨ Features

- **9 Sections**: Hero, About Me, Professional Journey, Featured Projects, Technical Skills, Certifications, Education & Achievements, Contact, Footer
- **Cosmic Theme**: Animated starfield background, nebula effects, orbit grids, HUD-styled panels
- **Interactive**: Client-side project filtering, active nav tracking, mobile overlay menu, scroll-to-top
- **Responsive**: Optimized for mobile (360px+), tablet, and desktop
- **Accessible**: Skip-to-content link, keyboard navigation, `prefers-reduced-motion` support, focus indicators
- **SEO Ready**: Metadata, Open Graph, semantic HTML, `robots.txt`, `sitemap.xml`, custom 404
- **Data-Driven**: All content managed via TypeScript files in `src/data/`
- **Static Export**: Deployed as pure static HTML via GitHub Pages

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
# Production build (static export)
npm run build

# Output folder: ./out
```

## 📝 Updating Content

All content is managed through TypeScript files in `src/data/`:

| File | Content |
|------|---------|
| `profile.ts` | Name, headline, subtitle, summary, CV path |
| `experience.ts` | Work experience entries |
| `projects.ts` | Featured projects with categories |
| `skills.ts` | Technical skills by category |
| `certifications.ts` | Professional certifications |
| `education.ts` | Education and achievements |
| `socials.ts` | Social media links |

### Adding a New Project

Edit `src/data/projects.ts` and add an entry:

```ts
{
  slug: "my-project",
  title: "My New Project",
  category: "web", // "seo" | "web" | "mobile" | "edtech" | "ai"
  year: 2024,
  summary: "Brief description",
  role: "Developer",
  problem: "What problem it solved",
  outcome: "What was achieved",
  tech: ["Next.js", "TypeScript"],
  thumbnail: "/images/projects/my-project.webp",
  thumbnailAlt: "Description of thumbnail",
  featured: true,
}
```

### Updating CV

Replace `public/documents/cv.pdf` with your latest CV file.

## 🎨 Design System

### Color Palette

| Role | Hex |
|------|-----|
| Background | `#050816` |
| Surface/Card | `#111A33` |
| Primary Accent | `#8B5CF6` |
| Secondary Accent | `#38BDF8` |
| Highlight | `#A3E635` |
| Primary Text | `#F8FAFC` |
| Secondary Text | `#94A3B8` |

### Typography

- **Display**: Outfit (headings)
- **Body**: Inter (paragraphs, navigation)
- **Mono**: JetBrains Mono (labels, badges)

## 🏗 Project Structure

```
├── public/
│   ├── documents/cv.pdf
│   ├── images/projects/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── globals.css        # Design system & theme
│   │   ├── layout.tsx         # Root layout with fonts & metadata
│   │   ├── page.tsx           # Main page assembling all sections
│   │   └── not-found.tsx      # Custom 404 page
│   ├── components/
│   │   ├── effects/           # Starfield canvas
│   │   ├── layout/            # Navbar, Footer
│   │   ├── sections/          # Hero, About, Experience, Projects, Skills, etc.
│   │   └── ui/                # Social icons
│   ├── data/                  # Content data files
│   ├── hooks/                 # useReveal animation hook
│   └── lib/utils.ts           # Helper functions
├── .github/workflows/deploy.yml
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

## 🚢 Deployment (GitHub Pages)

1. Push to the `main` branch
2. GitHub Actions installs deps, builds, and deploys
3. Static export (`out/`) is published to GitHub Pages

### For repository subpath

The GitHub Actions build automatically uses `/web-porto` as the Next.js
`basePath`. Local development keeps the root path, so `npm run dev` remains
available at `http://localhost:3000`.

## 📋 Tech Stack

- **Next.js 16** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **GitHub Actions** (CI/CD)
- **GitHub Pages** (hosting)

## 📄 License

This project is for personal portfolio use. All content and design are original.

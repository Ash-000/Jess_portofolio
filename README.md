# 🌿 Stewardship Journal & Portfolio

> **Botanical Modernism** — A high-performance, cinematic Next.js portfolio & academic research journal bridging sustainable agriculture, agronomy science, and precision technology.

---

## ✨ Features

- 🎨 **Botanical Modernism Design System**: Custom HSL color palettes (*Forest, Sage, Cream*), deep dark mode (`#0C110E`), and a film grain texture overlay.
- 🎬 **Cinematic GSAP Animations**:
  - **Word-by-word Text Reveal**: Hero section title reveals letter-by-letter with 3D rotation and stagger.
  - **Scroll-Triggered Storytelling**: Journey cards slide up and pop on viewport entry.
  - **Interactive 3D Tilt Cards**: Mouse-tracking 3D tilt card effect in the Research & Projects grid.
  - **Floating Particles & Orbs**: Subtle ambient particles and floating background gradient orbs.
- 🌐 **Multi-Language Support (EN / ID)**:
  - Instant toggle between **English** and **Bahasa Indonesia**.
  - LocalStorage persistence and clean React Context architecture (`useLanguage`).
- 📱 **Animated Mobile Navigation**:
  - **Morphing Hamburger Button**: Smooth line-to-cross transformation.
  - **Staggered Drawer Entrance**: Menu items enter sequentially with backdrop blur.
- 💎 **Skiper UI Integration**: Animated micro-interactions powered by `@skiper-ui/skiper40`.
- 🌓 **Smooth Theme Transition**: 500ms global crossfade between Light and Dark modes.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Library** | [React 18](https://react.dev/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) |
| **Animations** | [GSAP](https://greensock.com/gsap/) + [@gsap/react](https://gsap.com/resources/React/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Skiper UI](https://skiper-ui.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📁 Directory Structure

```text
d:\J_portofolio
├── app/
│   ├── globals.css         # Design system tokens, film grain, & transition utilities
│   ├── layout.tsx          # Root layout with Plus Jakarta Sans & Inter font setup
│   └── page.tsx            # Main page entry point wrapped with LanguageProvider
├── components/
│   ├── Navbar.tsx          # Floating navbar, active section tracker & morphing hamburger
│   ├── Hero.tsx            # Word reveal animation, clip-path badges & floating particles
│   ├── About.tsx           # ScrollTrigger journey cards & vision pillars
│   ├── Projects.tsx        # Interactive 3D tilt project cards & category filter
│   ├── Contact.tsx         # Ambient glowing orbs, contact form & Skiper40 integration
│   ├── Footer.tsx          # Animated Skiper40 links & back-to-top button
│   └── ui/
│       └── skiper-ui/
│           └── skiper40.tsx # Skiper UI animated link components
├── context/
│   └── LanguageContext.tsx # React Context for EN / ID internationalization
├── lib/
│   ├── dictionary.ts       # Complete EN/ID translations dictionary
│   └── utils.ts            # Classnames merger (clsx + tailwind-merge)
├── components.json         # shadcn UI configuration
└── tailwind.config.ts      # Extended colors, fonts, and theme tokens
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ash-000/Jess_portofolio.git
   cd Jess_portofolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

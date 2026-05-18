# Project Memory — Let's Innovate Academy

> Save this file for future reference. It contains everything about the project setup, structure, assets, links, and how to customize it.

---

## Project Info

- **Name:** Let's Innovate Academy
- **Brand:** Compilation Error by Ikram
- **Role:** Video Editor, Graphics Designer & Content Creator
- **Tech Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **Location:** `F:\New Website\ikram-portfolio`

---

## Quick Commands

```bash
cd "F:\New Website\ikram-portfolio"
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Run production build
npm run lint      # Run ESLint
```

---

## Live Links

- **YouTube:** https://youtube.com/@compilererror123?si=pS7mgoITesc3ODPW
- **LinkedIn:** https://www.linkedin.com/in/md-ikram-ab515618b/

---

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Home — Hero, showreel, services preview, YouTube highlight, problem/solution, testimonials, CTA |
| `/courses` | `src/app/courses/page.tsx` | Courses — Course listing with 3 courses (1 enroll open, 2 coming soon) |
| `/courses/[slug]` | `src/app/courses/[slug]/page.tsx` | Course Detail — Hero, learnings, features, curriculum, instructor, FAQ, enroll CTA |
| `/checkout/[slug]` | `src/app/checkout/[slug]/page.tsx` | Checkout — bKash payment form with enrollment submission |
| `/about` | `src/app/about/page.tsx` | About — Bio, skills, mission, timeline, certificates, YouTube channel |
| `/services` | `src/app/services/page.tsx` | Services — 8 service cards, workflow, tools |
| `/works` | `src/app/works/page.tsx` | Portfolio — Masonry layout, filterable (All, YouTube, Shorts/Reels, Ads, Graphics, Events, Product Demo) |
| `/solution` | `src/app/solution/page.tsx` | Solution — Problems vs solutions, who I help, repurposing, FAQ |
| `/pricing` | `src/app/pricing/page.tsx` | Pricing — 4 plans (Starter $50, Creator $150, Pro $300, Custom), add-ons, FAQ |
| `/contact` | `src/app/contact/page.tsx` | Contact — Form (name, email, project type, budget, message), social cards, project brief checklist |
| `/book-a-call` | `src/app/book-a-call/page.tsx` | Booking — 30-min call card, discussion topics, preparation checklist |

---

## Brand Colors

### Portfolio (Dark Theme)

| Token | Value |
|-------|-------|
| Background | `#050505` |
| Card BG | `#111111` / `#181818` |
| Primary Accent | `#ff2d2d` |
| Secondary Accent | `#ff4b4b` |
| Text | `#ffffff` |
| Muted Text | `#a1a1aa` |
| Border | `rgba(255,255,255,0.10)` |

### Academy/Courses (Light Theme)

| Token | Value |
|-------|-------|
| Background | `#f8fafc` (slate-50) |
| Card BG | `#ffffff` |
| Primary Accent | `#4f46e5` (indigo-600) |
| Secondary Accent | `#9333ea` (purple-600) |
| Text | `#0f172a` (slate-900) |
| Muted Text | `#64748b` (slate-500) |
| Border | `#e2e8f0` (slate-200) |

---

## Reusable Components

| Component | File | Purpose |
|-----------|------|---------|
| `Navbar` | `src/components/Navbar.tsx` | Sticky header with logo, nav links, mobile hamburger |
| `Footer` | `src/components/Footer.tsx` | Footer with links, social icons, copyright |
| `Badge` | `src/components/Badge.tsx` | Small pill badge (default or red variant) |
| `SectionHeading` | `src/components/SectionHeading.tsx` | Section title with optional badge and subtitle |
| `ServiceCard` | `src/components/ServiceCard.tsx` | Service card with icon, title, description, tags |
| `WorkCard` | `src/components/WorkCard.tsx` | Portfolio card with autoplay/loop video or image, category, description, 9:16 aspect ratio support |
| `PricingCard` | `src/components/PricingCard.tsx` | Pricing plan card with features and CTA |
| `TestimonialCard` | `src/components/TestimonialCard.tsx` | Client testimonial with stars, quote, avatar |
| `FAQAccordion` | `src/components/FAQAccordion.tsx` | Expandable FAQ questions |
| `CTASection` | `src/components/CTASection.tsx` | Call-to-action section with two buttons |
| `VideoPlayer` | `src/components/VideoPlayer.tsx` | HTML5 video player with autoplay, muted, poster and caption |
| `CourseCard` | `src/components/CourseCard.tsx` | Course listing card with image, price, status, enroll/coming soon button |
| `CurriculumAccordion` | `src/components/CurriculumAccordion.tsx` | Expandable course curriculum with lessons, resources, assignments |
| `CourseFeatureCard` | `src/components/CourseFeatureCard.tsx` | Feature card with icon, title, description |
| `CourseCTA` | `src/components/CourseCTA.tsx` | Sticky enroll CTA sidebar with price and features |

---

## Data Files (Easy to Edit)

| File | What It Controls |
|------|-----------------|
| `src/data/site.ts` | Site name, brand, email, WhatsApp, booking link, nav items, social links |
| `src/data/services.ts` | All 8 service cards (title, description, icon, deliverables, tags) |
| `src/data/pricing.ts` | Pricing plans, features, add-ons |
| `src/data/testimonials.ts` | Client testimonials (placeholders) |
| `src/data/faqs.ts` | FAQ questions and answers (general + pricing) |
| `src/data/works.ts` | Portfolio items and filter categories |
| `src/data/about.ts` | Timeline entries, skills list, and certificates |
| `src/data/courses.ts` | All courses, curriculum, features, instructor info, FAQs |

---

## Asset Replacement Guide

All assets use placeholder gradient fallbacks. Replace these files with real assets:

### Images (`public/images/`)

| Placeholder File | What to Put Here |
|------------------|-----------------|
| `profile_pic.jpg` | Profile photo for About page |
| `hero-portrait.png` | Hero section portrait |
| `video-editing-preview.jpg` | Showreel poster/thumbnail |
| `youtube-studio.jpg` | YouTube channel portfolio card image |
| `graphics-preview.jpg` | Graphics design portfolio card image |
| `event-preview.jpg` | Event video portfolio card image |
| `certificate.jpg` | Certificate image for About page |
| `courses/premiere-pro.jpg` | Premiere Pro course thumbnail |
| `courses/after-effects.jpg` | After Effects course thumbnail |
| `courses/capcut.jpg` | CapCut course thumbnail |

### Videos (`public/videos/`)

| Placeholder File | What to Put Here |
|------------------|-----------------|
| `showreel.mp4` | Main showreel/demo reel |
| `work-1.mp4` | Portfolio work sample 1 (talking head) |
| `work-2.mp4` | Portfolio work sample 2 (shorts/reels, 9:16) |
| `work-3.mp4` | Portfolio work sample 3 (product/clothing ad) |
| `work-4.mp4` | Portfolio work sample 4 (food ad) |
| `work-5.mp4` | Portfolio work sample 5 (SAS product demo) |
| `work-6.mp4` | Portfolio work sample 6 (story telling video) |
| `work-7.mp4` | Portfolio work sample 7 (educational content) |

**Note:** If a video file is missing, the component gracefully shows a gradient placeholder instead of breaking.

---

## Things to Update Before Going Live

1. **Email** — Edit `src/data/site.ts` → `email: "your-email@example.com"` → replace with real email
2. **WhatsApp** — Edit `src/data/site.ts` → `whatsapp: "+880XXXXXXXXXX"` → replace with real number
3. **Booking Link** — Edit `src/data/site.ts` → `bookingLink: "#"` → replace with Cal.com or Calendly URL
4. **Testimonials** — Edit `src/data/testimonials.ts` → replace placeholder testimonials with real client feedback
5. **Portfolio Items** — Edit `src/data/works.ts` → add real project titles, descriptions, and media
6. **Pricing** — Edit `src/data/pricing.ts` → adjust prices and features to match actual rates
7. **Contact Form** — Currently frontend-only. Connect to a backend service (Formspree, Resend, etc.) before publishing
8. **SEO Images** — Add Open Graph and Twitter card images to `public/` and update metadata in `src/app/layout.tsx`
9. **Favicon** — Replace `src/app/favicon.ico` with your own
10. **Profile Photos** — Add real images to `public/images/` and update components to use `<Image>` instead of gradient placeholders
11. **bKash Number** — Edit `src/app/checkout/[slug]/page.tsx` → replace `+8801XXXXXXXXX` with real bKash merchant number
12. **Checkout Backend** — Connect checkout form to backend API for payment verification and enrollment management
13. **Course Images** — Add real course thumbnails to `public/images/courses/`

---

## TypeScript Types

All types are defined in `src/types/index.ts`:

- `NavItem` — Navigation link
- `Service` — Service card data
- `WorkItem` — Portfolio item
- `PricingPlan` — Pricing package
- `Testimonial` — Client review
- `FAQItem` — FAQ question/answer
- `TimelineItem` — About page timeline entry
- `Certificate` — Certificate with title, issuer, date, optional image
- `SocialLink` — Social media link
- `CurriculumLesson` — Individual lesson within a curriculum day
- `CurriculumDay` — Day/section of curriculum with lessons, resources, assignments
- `CourseFeature` — Course feature with icon, title, description
- `CourseFAQ` — Course-specific FAQ
- `Course` — Full course data including slug, pricing, curriculum, instructor, etc.

---

## Design Notes

- Dark cinematic theme with red accent (`#ff2d2d`) for portfolio pages
- Light professional theme with indigo-purple accent for course/academy pages
- Glassmorphism cards with `border-white/10` on dark pages
- Clean white cards with `border-slate-200` on light pages
- Hover effects: `-translate-y-1`, border color changes
- Mobile-first responsive design
- Smooth scroll enabled in CSS
- Accessible: semantic HTML, aria labels on buttons
- No external animation libraries — pure CSS/Tailwind transitions

---

## Current Progress (as of May 14, 2026)

### Completed
- [x] Project setup: Next.js 16 + TypeScript + Tailwind CSS v4
- [x] All 10 pages built and functional: Home, Courses, Course Detail, Checkout, About, Services, Works, Solution, Pricing, Contact, Book-a-Call
- [x] 15 reusable components created
- [x] 9 data files for easy content editing
- [x] TypeScript types defined in `src/types/index.ts`
- [x] Dual theme system (dark portfolio + light academy)
- [x] Navbar with mobile hamburger menu
- [x] Footer with social links
- [x] Masonry portfolio layout with video/image support and category filters
- [x] Course system with 3 courses (Premiere Pro, After Effects, CapCut)
- [x] Checkout page with bKash payment form
- [x] Pricing page with 4 plans + add-ons
- [x] Contact form (frontend only)
- [x] Book-a-call page with discussion topics
- [x] Solution page with problem/solution comparison
- [x] About page with timeline, skills, certificates
- [x] Services page with 8 service cards
- [x] FAQ accordrons on multiple pages
- [x] Testimonial cards with star ratings
- [x] Curriculum accordion for course detail pages
- [x] Video player component with autoplay/muted/poster

### Assets Added
- [x] Profile photo (`profile_pic.jpg`)
- [x] Hero portrait (`hero_potrait.jpg`)
- [x] Showreel video (`showreel.mp4`)
- [x] 7 work sample videos (`work-1.mp4` through `work-7.mp4`)
- [x] Course thumbnails (premiere-pro.jpg, after-effects.jpg, capcut.jpg)
- [x] Academy logo (`Lets_innovate_academy_logo.png`)
- [x] Certificate image (`certificate.jpg`)
- [x] Preview images (youtube-studio, video-editing, graphics, event)

### Known Issues / Warnings
- Hydration mismatch: `data-arp=""` attribute on `<html>` tag (minor, may be from browser extension)
- Missing `video-editing-preview.jpg` was renamed from `.png` to `.jpg`

### Fixed Issues
- [x] Added `sizes` prop to all `<Image fill>` components (5 instances)
- [x] Added `priority` to LCP images (hero portrait, profile pic)
- [x] Renamed `video-editing-preview.png` to `.jpg` for consistency

### Still Needed Before Going Live
- [ ] Connect contact form to backend (Formspree, Resend, etc.)
- [ ] Configure Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
- [ ] Configure Resend environment variable (RESEND_API_KEY)
- [ ] Update bKash merchant number in checkout page
- [ ] Add Open Graph / Twitter card meta images
- [ ] Replace favicon
- [ ] Adjust pricing and features to match actual rates
- [ ] Add real portfolio project titles and descriptions
- [ ] Update placeholder testimonials with real client feedback

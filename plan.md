# plan.md — Dynamic Portfolio (Laravel + React + TypeScript + Tailwind)
Owner: Abdullah Al Shahed  
Stack: Laravel 11 API + React (Vite) + TypeScript + Tailwind CSS  
Goal: A premium, modern, fully dynamic portfolio with an Admin CMS (no code edits needed to update content).

---

## 1) Objectives
- Public portfolio website with modern UI, fast load, SEO-friendly.
- Admin panel (CMS) to manage:
  - Profile, hero content, socials, resume
  - Projects (with gallery)
  - Skills
  - Experience + Education
  - Blog (optional but recommended)
  - Testimonials
  - Contact messages inbox
  - Site settings (SEO, homepage sections)

---

## 2) Tech Stack
### Backend (Laravel)
- Laravel 11
- MySQL
- Auth: Laravel Sanctum (SPA auth)
- Roles/Permissions: spatie/laravel-permission
- Media upload: spatie/laravel-medialibrary
- Validation: Form Requests
- API Transformers: Laravel API Resources
- Optional: Queue (emails), Redis cache

### Frontend (React)
- React + TypeScript (Vite)
- Tailwind CSS
- UI library: shadcn/ui OR Headless UI (choose one)
- Routing: React Router
- Data fetching: React Query
- Forms: React Hook Form + Zod
- Animations: Framer Motion (subtle)

---

## 3) Architecture (Best Practices)
### Backend
- API versioning: `/api/v1/...`
- “Thin controllers” + Service classes for business logic
- Use FormRequest for validation
- Use Policies for authorization
- Standard API response shape:
  ```json
  { "success": true, "message": "OK", "data": {}, "meta": {} }


Pagination for lists

Centralized error handling (exceptions -> clean JSON)

Frontend

Folder structure:

src/api/ (axios client + endpoint wrappers)

src/components/ (reusable UI)

src/pages/ (Public + Admin pages)

src/layouts/ (PublicLayout/AdminLayout)

src/hooks/ (custom hooks)

src/types/ (TypeScript types)

src/utils/ (helpers)

Global auth store (lightweight) + protected admin routes

Consistent loading states (skeletons) + error states

4) Database Schema (Tables)
Auth

users

roles, permissions, model_has_roles, model_has_permissions (spatie)

Portfolio

profiles

name, title, tagline, bio, location

email, phone, resume_url

socials json (linkedin/github/portfolio/whatsapp)

hero_image (via medialibrary)

skills

name, category, icon(optional), level(optional), sort_order

experiences

company, role, start_date, end_date (nullable)

location(optional), description (rich text), sort_order

educations

school, degree, year, details, sort_order

projects

title, slug, summary, description

role, tech_stack json

live_url, github_url

is_featured boolean, sort_order

cover_image (media) + gallery images (media)

Content (Optional but recommended)

blog_posts

title, slug, excerpt

content_markdown

cover_image (media)

published_at, tags json, status (draft/published)

Social Proof

testimonials

name, company, quote, avatar (media)

rating(optional), is_featured

Contact

contact_messages

name, email, subject, message

status (new/read/archived), created_at

Site

settings

key, value (json/text)

e.g. seo_defaults, home_sections_config, theme

5) Public Pages (Routes + Sections)
Public routes

/ Home

Hero (profile + CTA)

Featured Projects

Skills Snapshot

Experience Preview

Testimonials

Final CTA (Contact)

/projects

search + filter by tech/category + pagination

/projects/:slug

project gallery + details + links + related projects

/about

bio + experience timeline + education + resume download

/blog (optional)

/blog/:slug (optional)

/contact

validated form -> store message + send email notification

UI/UX requirements

Fully responsive

Clean spacing, card-based layout

Dark mode (optional)

Skeleton loaders

Accessible components (keyboard, contrast)

6) Admin Panel (CMS)
Admin routes

/admin/login

/admin/dashboard (stats: total projects, messages, views optional)

/admin/profile (edit hero, bio, socials, resume upload)

/admin/projects (CRUD + featured + reorder + images)

/admin/skills (CRUD + reorder)

/admin/experience (CRUD + reorder)

/admin/education (CRUD + reorder)

/admin/blog (CRUD + markdown editor + publish scheduling) [optional]

/admin/testimonials (CRUD)

/admin/messages (inbox + status update)

/admin/settings (SEO defaults, homepage layout toggles)

Admin UI requirements

Sidebar navigation

Data tables: search, pagination

Confirm delete modal

Toast notifications

Empty states

7) API Endpoints (Laravel)
Auth

POST /api/v1/auth/login

POST /api/v1/auth/logout

GET /api/v1/auth/me

Public (no auth)

GET /api/v1/public/profile

GET /api/v1/public/projects

GET /api/v1/public/projects/{slug}

GET /api/v1/public/skills

GET /api/v1/public/experience

GET /api/v1/public/education

GET /api/v1/public/testimonials

GET /api/v1/public/blog (optional)

GET /api/v1/public/blog/{slug} (optional)

POST /api/v1/public/contact

Admin (auth required)

CRUD via apiResource:

/api/v1/admin/projects

/api/v1/admin/skills

/api/v1/admin/experience

/api/v1/admin/education

/api/v1/admin/testimonials

/api/v1/admin/blog (optional)

/api/v1/admin/messages

/api/v1/admin/settings

Media (projects)

POST /api/v1/admin/projects/{id}/media (upload images)

DELETE /api/v1/admin/projects/{id}/media/{mediaId}

8) Design System (Modern UI)
Style guidelines

Large hero typography + strong CTA

Lots of whitespace, grid-based layout

Rounded-xl cards, soft shadows

Subtle gradients/blur accents (not heavy)

Consistent spacing scale

Motion: minimal, smooth (Framer Motion)

Reusable components

Navbar (sticky, blur)

Hero section

Project card + tag chips

Gallery slider

Timeline component

Testimonial card

Footer

Admin sidebar + topbar

Table, Modal, Drawer, Toast, Skeleton

9) SEO + Performance

Meta tags per page (title/description)

OpenGraph tags for projects/blog

Lazy-load images, use proper sizes

Cache public endpoints (60s–5min) + cache headers/ETags

Generate sitemap (either Laravel endpoint or build-time)

10) Security

Sanctum SPA auth + CSRF protection

Rate limit:

login

contact form

Server-side validation for all inputs

Secure file uploads (MIME + size limits)

Policies for admin actions

Disable debug in production

Logging for errors

11) Deployment
Option A (Recommended)

Laravel API on VPS (Nginx + PHP-FPM)

React frontend on Vercel (fast CDN)

Env config per environment

Option B (Single VPS)

Build React and serve via Nginx

Proxy /api to Laravel

CI/CD (Optional)

GitHub Actions:

run tests

build frontend

deploy

12) Milestones (Build Order)
Milestone 1 — Foundation

Repo setup (monorepo or separate repos)

Laravel API + DB + Sanctum + base response standard

React TS + Tailwind + layouts + routing

Home page wired to API

Milestone 2 — Core Portfolio CRUD

Projects CRUD + media gallery + featured + sorting

Skills + Experience + Education CRUD + reorder

Public pages: projects list + details

Milestone 3 — Blog + SEO (Optional but valuable)

Blog CRUD + markdown editor + publish scheduling

Public blog pages + meta/OG tags + sitemap

Milestone 4 — Contact + Inbox

Contact form validation + store message

Email notifications (optional)

Admin inbox with status

Milestone 5 — Polish

UI refinements: skeletons, empty states, animations

Performance + caching + security hardening

Basic tests (API + key UI flows)

13) Acceptance Criteria (Definition of Done)

Admin can update all content without code changes

Public site looks premium and modern on mobile/desktop

Projects have gallery + clean details page

Contact form works; messages appear in admin

No console errors; clean UX

Fast load + good Lighthouse score (target: 90+ performance/SEO on main pages)

14) Notes for Builder (Codex)

Keep UI “minimal premium” (not colorful/cluttered)

Use consistent spacing + typography

Prefer reusable components over duplicate UI

Add skeleton loaders for all fetches

Ensure forms have client + server validation

Return consistent API responses everywhere



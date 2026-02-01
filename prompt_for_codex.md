# prompt_for_codex.md - Premium Portfolio + Admin CMS (Laravel + Inertia + React TS + Tailwind)

You are Codex, a senior full-stack engineer. Build a production-grade, fully dynamic portfolio + admin CMS for **Abdullah Al Shahed** using **Laravel 12 + Inertia.js + React + TypeScript + Tailwind CSS**. The UI must look **modern, minimal, premium**, and the code must follow **best practices** (clean architecture, security, scalability, maintainability, performance).

This file is the single source of truth for requirements. Make reasonable best-practice decisions without asking questions.

---

## 0) Non-Negotiables
- **No hardcoded portfolio content** in views or React components. All content must come from the database and be editable in Admin.
- Public pages are server-rendered via Laravel routes returning Inertia responses.
- Admin CMS manages all content (profile, projects, skills, experience, education, blog, testimonials, messages, settings).
- UI polish: skeletons, empty states, toasts, confirm dialogs, consistent spacing/typography.
- Mobile-first, accessible, fast.

---

## 1) Stack (Use Exactly)
### Backend
- Laravel 12
- PHP 8.2+
- PostgreSQL
- Auth: Laravel session auth (Fortify optional, not required)
- Roles/Permissions: `spatie/laravel-permission`
- Media: `spatie/laravel-medialibrary`
- Validation: FormRequest
- Data shaping: Resources or dedicated ViewModels for Inertia props
- Caching: Laravel cache (DB/Redis optional)

### Frontend (In Laravel)
- Inertia.js + React
- TypeScript
- Tailwind CSS
- UI components: **shadcn/ui** (preferred) + Radix
- Forms: React Hook Form + Zod
- Toasts: Sonner or shadcn toast
- Animations: Framer Motion (subtle only)

---

## 2) Project Structure (Single Laravel App)
- `/app` (services, policies, models, actions)
- `/routes/web.php` for Inertia pages
- `/routes/api.php` only if needed later (keep minimal)
- `/resources/js` for React TS
- `/resources/js/Pages` (Public + Admin pages)
- `/resources/js/Components` reusable UI
- `/resources/js/Layouts` PublicLayout, AdminLayout
- `/resources/js/lib` helpers (cn, constants)
- `/resources/js/types` TS types

Keep controllers thin; move query logic into dedicated query classes or services.

---

## 3) Database + Models (Must Implement)
Create migrations, models, seeders, policies.

### Tables
**Auth**
- users
- roles/permissions tables (spatie)

**Portfolio**
- profiles: name, title, tagline, bio, location, email, phone, resume_url, socials_json, meta_json
- skills: name, category, icon(optional), level(optional), sort_order
- experiences: company, role, start_date, end_date(nullable), location(optional), description, sort_order
- educations: school, degree, year, details, sort_order
- projects: title, slug, summary, description, role, tech_stack_json, live_url, github_url, is_featured, sort_order

**Content**
- blog_posts: title, slug, excerpt, content_markdown, status(draft/published), published_at, tags_json

**Social Proof**
- testimonials: name, company, quote, rating(optional), is_featured

**Contact**
- contact_messages: name, email, subject, message, status(new/read/archived)

**Site**
- settings: key, value_json (SEO defaults, homepage toggles)

### Media (Spatie Media Library)
- profile hero image
- project cover + gallery images
- testimonial avatar
- blog cover

---

## 4) Routing + Rendering (Inertia First)
### Public Inertia Routes (`routes/web.php`)
- `/` Home
- `/projects` Projects list (search/filter)
- `/projects/{slug}` Project details
- `/about` About
- `/blog` Blog list
- `/blog/{slug}` Blog detail
- `/contact` Contact page (form)
- `POST /contact` store message (redirect back + toast)

### Admin Inertia Routes (protected)
- `/admin/login` (if using custom login page; otherwise use Laravel default)
- `/admin/dashboard`
- `/admin/profile`
- `/admin/projects` CRUD
- `/admin/skills` CRUD + reorder
- `/admin/experience` CRUD + reorder
- `/admin/education` CRUD + reorder
- `/admin/blog` CRUD + markdown editor + publish schedule
- `/admin/testimonials` CRUD
- `/admin/messages` inbox + status updates
- `/admin/settings` SEO + homepage config

Middleware:
- `auth`
- role-based guard (admin/editor)
- Policies for fine-grained authorization

---

## 5) Data Delivery Pattern
- Controllers return Inertia pages with props.
- Heavy lists must be paginated server-side.
- Use dedicated query classes/services for data preparation.
- Avoid N+1 queries (eager load media and relations).

### Validation
- Use FormRequest for every write.
- Return validation errors through Inertia automatically.

### Flash + Toast
- On success, redirect with session flash (e.g., `success` message).
- React layout reads flashes and shows toasts.

---

## 6) Public UI (Premium Requirements)
### Pages & Sections
**Home**
- Hero: name/title/tagline + CTA (Projects/Contact)
- Featured projects grid
- Skills snapshot
- Experience preview
- Testimonials
- Final CTA

**Projects List**
- Search input
- Tech filter chips
- Featured toggle
- Pagination
- Premium cards with tags

**Project Detail**
- Gallery slider
- Role, problem -> solution, key features
- Tech stack badges
- Live/GitHub buttons
- Related projects

**About**
- Bio, experience timeline, education
- Resume download

**Blog**
- Markdown rendering (sanitized)
- Tags, published_at
- SEO meta

**Contact**
- Validated form
- Spam protection (rate limit + honeypot)
- Success toast

### UI Rules
- Mobile-first responsive
- Consistent spacing & typography
- Skeleton loaders where needed (pagination transitions, image loads)
- Empty states
- Accessible focus rings & labels

---

## 7) Admin CMS UI (Professional)
- Sidebar layout, active route highlight
- Tables: search + pagination
- Confirm dialogs on delete
- Image upload UI with preview + remove + reorder (optional)
- Client validation (Zod) + server errors mapping
- Reorder lists: drag & drop or "Move up/down"

---

## 8) SEO + Performance
- Meta defaults + page-specific meta via props
- OpenGraph tags per project/blog
- Clean URLs with slugs
- Image optimization (sizes or responsive rendering)
- Cache public queries (short TTL like 60-300s)

---

## 9) Security
- Auth protected admin routes
- Role checks (spatie)
- Rate limit login and contact form
- File upload restrictions (images only, size limit)
- Sanitize markdown rendering (no unsafe HTML)
- Disable debug in production
- Proper logging

---

## 10) Seed Data (Required)
- 1 admin user (email/password in README)
- profile content
- 6 skills
- 3 experiences
- 3 featured projects with gallery images (use placeholders if needed)
- 2 testimonials
- 2 published blog posts

---

## 11) Deliverables
1. Working Laravel app with Inertia React TS
2. `.env.example`
3. README with:
   - install
   - migrate + seed
   - run dev (php artisan serve + npm run dev)
   - build prod (npm run build)
4. Screenshots:
   - Home, projects list, project details, admin dashboard, admin projects CRUD

---

## 12) Build Order (Follow Exactly)
1. Setup Laravel + Inertia React TS + Tailwind + shadcn
2. DB + models + media library + roles
3. Public pages with server pagination + filters
4. Admin CMS CRUD for all modules
5. Blog markdown editor + rendering
6. Contact + inbox
7. Polish UI/UX (skeletons, empty states, toasts)
8. Performance + caching + security hardening

---

## Final Instruction
Build this like a senior engineer. The result must look premium and be easy for Abdullah to maintain and update from Admin.

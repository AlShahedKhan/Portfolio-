# Abdullah Al Shahed Portfolio

Premium portfolio + admin CMS built with Laravel 12, Inertia.js, React, TypeScript, and Tailwind CSS.

## Requirements
- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL

## Setup
```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
```

Update `.env` with your PostgreSQL credentials, then run:
```bash
php artisan migrate --seed
```

## Run (dev)
```bash
php artisan serve
npm run dev
```

## Build (production)
```bash
npm run build
```

## Admin Login
- Email: `admin@portfolio.test`
- Password: `password`

## Notes
- All portfolio content is stored in the database and managed via `/admin`.
- Seed data includes profile, projects, skills, experiences, education, testimonials, and blog posts.

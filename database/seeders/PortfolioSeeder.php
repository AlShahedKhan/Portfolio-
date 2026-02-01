<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        Profile::query()->create([
            'name' => 'Abdullah Al Shahed',
            'title' => 'Full-Stack Engineer',
            'tagline' => 'Building thoughtful digital products that scale.',
            'bio' => 'I help teams ship premium web experiences with reliable engineering and calm execution. My work spans design systems, product strategy, and modern Laravel + React stacks.',
            'location' => 'Dhaka, Bangladesh',
            'email' => 'abdullah@example.com',
            'phone' => '+880 1xx xxxx xxx',
            'resume_url' => 'https://example.com/resume.pdf',
            'socials_json' => [
                'github' => 'https://github.com/abdullah',
                'linkedin' => 'https://linkedin.com/in/abdullah',
                'x' => 'https://x.com/abdullah',
            ],
            'meta_json' => [
                'seo_title' => 'Abdullah Al Shahed - Full-Stack Engineer',
                'seo_description' => 'Portfolio and case studies from Abdullah Al Shahed.',
            ],
        ]);

        Skill::query()->insert([
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 'Expert', 'sort_order' => 1],
            ['name' => 'React', 'category' => 'Frontend', 'level' => 'Expert', 'sort_order' => 2],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'level' => 'Advanced', 'sort_order' => 3],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'level' => 'Advanced', 'sort_order' => 4],
            ['name' => 'Inertia.js', 'category' => 'Full Stack', 'level' => 'Advanced', 'sort_order' => 5],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 'Advanced', 'sort_order' => 6],
        ]);

        Experience::query()->insert([
            [
                'company' => 'Studio Orion',
                'role' => 'Lead Full-Stack Engineer',
                'start_date' => '2022-01-01',
                'end_date' => null,
                'location' => 'Remote',
                'description' => 'Led multi-tenant product builds, performance improvements, and design system rollouts.',
                'sort_order' => 1,
            ],
            [
                'company' => 'Nova Labs',
                'role' => 'Senior Laravel Engineer',
                'start_date' => '2019-06-01',
                'end_date' => '2021-12-31',
                'location' => 'Dhaka',
                'description' => 'Built analytics dashboards and internal tooling with Laravel, Vue, and PostgreSQL.',
                'sort_order' => 2,
            ],
            [
                'company' => 'Brightstack',
                'role' => 'Full-Stack Developer',
                'start_date' => '2017-03-01',
                'end_date' => '2019-05-31',
                'location' => 'Dhaka',
                'description' => 'Delivered marketing sites, CMS builds, and client portals with modern PHP stacks.',
                'sort_order' => 3,
            ],
        ]);

        Education::query()->insert([
            [
                'school' => 'Daffodil International University',
                'degree' => 'BSc in Computer Science',
                'year' => '2016',
                'details' => 'Focused on software engineering and human-computer interaction.',
                'sort_order' => 1,
            ],
            [
                'school' => 'Coursera / Independent',
                'degree' => 'Product & UX Specialization',
                'year' => '2018',
                'details' => 'Completed a focused track on product design and UX research.',
                'sort_order' => 2,
            ],
        ]);

        $projects = [
            [
                'title' => 'Atlas Analytics',
                'summary' => 'A SaaS analytics platform for growth teams with real-time dashboards.',
                'description' => 'Designed a multi-tenant platform with real-time charting, saved segments, and KPI alerts.',
                'role' => 'Product Design + Full-Stack Engineering',
                'tech_stack_json' => ['Laravel', 'React', 'PostgreSQL', 'Redis'],
                'live_url' => 'https://example.com',
                'github_url' => 'https://github.com/example',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Nimbus Commerce',
                'summary' => 'Headless commerce storefront with curated product experiences.',
                'description' => 'Built a flexible product catalog, promotions engine, and marketing CMS.',
                'role' => 'Technical Lead',
                'tech_stack_json' => ['Laravel', 'Inertia', 'TypeScript', 'Tailwind'],
                'live_url' => 'https://example.com',
                'github_url' => 'https://github.com/example',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Pulse CRM',
                'summary' => 'Sales CRM with automation workflows and custom pipelines.',
                'description' => 'Implemented pipeline analytics, automation rules, and team collaboration.',
                'role' => 'Full-Stack Engineer',
                'tech_stack_json' => ['Laravel', 'React', 'PostgreSQL'],
                'live_url' => 'https://example.com',
                'github_url' => 'https://github.com/example',
                'is_featured' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::query()->create([
                ...$project,
                'slug' => Str::slug($project['title']),
            ]);
        }

        $posts = [
            [
                'title' => 'Designing Premium Admin Experiences',
                'slug' => 'designing-premium-admin-experiences',
                'excerpt' => 'Practical notes on building admin tooling that teams love to use.',
                'content_markdown' => "## Introduction\n\nAdmin UX deserves the same care as customer-facing UX. Here are principles that help teams move faster...",
                'status' => 'published',
                'published_at' => now()->subDays(20),
                'tags_json' => ['Product', 'UX'],
            ],
            [
                'title' => 'Laravel + Inertia at Scale',
                'slug' => 'laravel-inertia-at-scale',
                'excerpt' => 'Patterns for keeping Laravel + Inertia apps healthy as teams grow.',
                'content_markdown' => "## Scaling Inertia Apps\n\nKeep your controllers thin, use query objects, and cache hotspots...",
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'tags_json' => ['Laravel', 'Engineering'],
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::query()->create($post);
        }

        Testimonial::query()->insert([
            [
                'name' => 'Maya Karim',
                'company' => 'Studio Orion',
                'quote' => 'Abdullah brings clarity, speed, and a polished product mindset to every engagement.',
                'rating' => 5,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rahim Hasan',
                'company' => 'Nimbus Commerce',
                'quote' => 'A reliable engineering partner with an eye for detail and scalable systems.',
                'rating' => 5,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        ContactMessage::query()->create([
            'name' => 'Jamie Lee',
            'email' => 'jamie@example.com',
            'subject' => 'Project inquiry',
            'message' => 'We would love to discuss a new customer portal build.',
            'status' => 'new',
        ]);

        Setting::query()->create([
            'key' => 'site',
            'value_json' => [
                'seo_title' => 'Abdullah Al Shahed | Portfolio',
                'seo_description' => 'Premium Laravel + React portfolio for Abdullah Al Shahed.',
                'home_featured_projects' => true,
            ],
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => Project::query()->count(),
                'skills' => Skill::query()->count(),
                'blog_posts' => BlogPost::query()->count(),
                'messages' => ContactMessage::query()->where('status', 'new')->count(),
            ],
        ]);
    }
}

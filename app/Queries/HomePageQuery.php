<?php

namespace App\Queries;

use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Cache;

class HomePageQuery
{
    public function handle(): array
    {
        return Cache::remember('public.home', 120, function () {
            return [
                'profile' => Profile::query()->first(),
                'featuredProjects' => Project::query()
                    ->where('is_featured', true)
                    ->with('media')
                    ->orderBy('sort_order')
                    ->latest()
                    ->take(6)
                    ->get(),
                'skills' => Skill::query()
                    ->orderBy('sort_order')
                    ->take(12)
                    ->get(),
                'experiences' => Experience::query()
                    ->orderBy('sort_order')
                    ->take(3)
                    ->get(),
                'testimonials' => Testimonial::query()
                    ->where('is_featured', true)
                    ->latest()
                    ->take(3)
                    ->get(),
            ];
        });
    }
}

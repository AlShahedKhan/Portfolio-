<?php

namespace App\Http\Controllers\Public;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use Inertia\Inertia;
use Inertia\Response;

class AboutController
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/About', [
            'profile' => Profile::query()->first(),
            'experiences' => Experience::query()->orderBy('sort_order')->get(),
            'educations' => Education::query()->orderBy('sort_order')->get(),
        ]);
    }
}

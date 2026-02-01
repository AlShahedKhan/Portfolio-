<?php

namespace App\Http\Controllers\Public;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TestimonialResource;
use App\Queries\HomePageQuery;
use Inertia\Inertia;
use Inertia\Response;

class HomeController
{
    public function __invoke(HomePageQuery $query): Response
    {
        $data = $query->handle();

        return Inertia::render('Public/Home', [
            'profile' => $data['profile'],
            'featuredProjects' => ProjectResource::collection($data['featuredProjects']),
            'skills' => $data['skills'],
            'experiences' => $data['experiences'],
            'testimonials' => TestimonialResource::collection($data['testimonials']),
        ]);
    }
}

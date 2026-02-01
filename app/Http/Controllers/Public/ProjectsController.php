<?php

namespace App\Http\Controllers\Public;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Queries\ProjectsQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController
{
    public function index(Request $request, ProjectsQuery $query): Response
    {
        $filters = $request->only('search', 'tech', 'featured');
        $projects = $query->handle($filters);

        return Inertia::render('Public/Projects/Index', [
            'filters' => $filters,
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::query()
            ->with('media')
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Project::query()
            ->with('media')
            ->where('id', '!=', $project->id)
            ->where('is_featured', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Public/Projects/Show', [
            'project' => ProjectResource::make($project)->resolve(),
            'related' => ProjectResource::collection($related),
        ]);
    }
}

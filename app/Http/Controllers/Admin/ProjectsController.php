<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Project::class, 'project');
    }

    public function index(): Response
    {
        $projects = Project::query()->with('media')->orderBy('sort_order')->latest()->paginate(10);

        return Inertia::render('Admin/Projects/Index', [
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $techStack = collect(explode(',', $data['tech_stack'] ?? ''))
            ->map(fn ($item) => trim($item))
            ->filter()
            ->values()
            ->all();

        $project = Project::create([
            'title' => $data['title'],
            'slug' => $data['slug'] ?? Str::slug($data['title']),
            'summary' => $data['summary'] ?? null,
            'description' => $data['description'] ?? null,
            'role' => $data['role'] ?? null,
            'tech_stack_json' => $techStack,
            'live_url' => $data['live_url'] ?? null,
            'github_url' => $data['github_url'] ?? null,
            'is_featured' => (bool) ($data['is_featured'] ?? false),
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.projects.edit', $project)->with('success', 'Project created.');
    }

    public function edit(Project $project): Response
    {
        $project->load('media');

        return Inertia::render('Admin/Projects/Edit', [
            'project' => ProjectResource::make($project)->resolve(),
        ]);
    }

    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();

        $techStack = collect(explode(',', $data['tech_stack'] ?? ''))
            ->map(fn ($item) => trim($item))
            ->filter()
            ->values()
            ->all();

        $project->update([
            'title' => $data['title'],
            'slug' => $data['slug'] ?? $project->slug ?? Str::slug($data['title']),
            'summary' => $data['summary'] ?? null,
            'description' => $data['description'] ?? null,
            'role' => $data['role'] ?? null,
            'tech_stack_json' => $techStack,
            'live_url' => $data['live_url'] ?? null,
            'github_url' => $data['github_url'] ?? null,
            'is_featured' => (bool) ($data['is_featured'] ?? false),
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.projects.edit', $project)->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Experience::class, 'experience');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Experience/Index', [
            'experiences' => Experience::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Experience/Create');
    }

    public function store(ExperienceRequest $request): RedirectResponse
    {
        Experience::create($request->validated());

        return redirect()->route('admin.experience.index')->with('success', 'Experience created.');
    }

    public function edit(Experience $experience): Response
    {
        return Inertia::render('Admin/Experience/Edit', [
            'experience' => $experience,
        ]);
    }

    public function update(ExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $experience->update($request->validated());

        return redirect()->route('admin.experience.edit', $experience)->with('success', 'Experience updated.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return redirect()->route('admin.experience.index')->with('success', 'Experience deleted.');
    }
}

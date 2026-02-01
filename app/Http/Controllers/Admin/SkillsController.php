<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SkillRequest;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillsController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Skill::class, 'skill');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Skills/Index', [
            'skills' => Skill::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Skills/Create');
    }

    public function store(SkillRequest $request): RedirectResponse
    {
        Skill::create($request->validated());

        return redirect()->route('admin.skills.index')->with('success', 'Skill created.');
    }

    public function edit(Skill $skill): Response
    {
        return Inertia::render('Admin/Skills/Edit', [
            'skill' => $skill,
        ]);
    }

    public function update(SkillRequest $request, Skill $skill): RedirectResponse
    {
        $skill->update($request->validated());

        return redirect()->route('admin.skills.edit', $skill)->with('success', 'Skill updated.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return redirect()->route('admin.skills.index')->with('success', 'Skill deleted.');
    }
}

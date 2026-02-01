<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EducationRequest;
use App\Models\Education;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Education::class, 'education');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Education/Index', [
            'educations' => Education::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Education/Create');
    }

    public function store(EducationRequest $request): RedirectResponse
    {
        Education::create($request->validated());

        return redirect()->route('admin.education.index')->with('success', 'Education created.');
    }

    public function edit(Education $education): Response
    {
        return Inertia::render('Admin/Education/Edit', [
            'education' => $education,
        ]);
    }

    public function update(EducationRequest $request, Education $education): RedirectResponse
    {
        $education->update($request->validated());

        return redirect()->route('admin.education.edit', $education)->with('success', 'Education updated.');
    }

    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        return redirect()->route('admin.education.index')->with('success', 'Education deleted.');
    }
}

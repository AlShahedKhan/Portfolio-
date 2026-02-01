<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialsController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Testimonial::class, 'testimonial');
    }

    public function index(): Response
    {
        $testimonials = Testimonial::query()->with('media')->latest()->paginate(10);

        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => TestimonialResource::collection($testimonials),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Testimonials/Create');
    }

    public function store(TestimonialRequest $request): RedirectResponse
    {
        $testimonial = Testimonial::create($request->validated());

        return redirect()->route('admin.testimonials.edit', $testimonial)->with('success', 'Testimonial created.');
    }

    public function edit(Testimonial $testimonial): Response
    {
        $testimonial->load('media');

        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => TestimonialResource::make($testimonial)->resolve(),
        ]);
    }

    public function update(TestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update($request->validated());

        return redirect()->route('admin.testimonials.edit', $testimonial)->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted.');
    }
}

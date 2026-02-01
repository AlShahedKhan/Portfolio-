<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        $this->authorize('viewAny', Profile::class);

        $profile = Profile::query()->firstOrCreate(['name' => 'Abdullah Al Shahed'], [
            'title' => 'Full-Stack Developer',
        ]);

        return Inertia::render('Admin/Profile/Edit', [
            'profile' => $profile,
        ]);
    }

    public function update(ProfileRequest $request): RedirectResponse
    {
        $this->authorize('update', Profile::class);

        $profile = Profile::query()->first() ?? new Profile();

        $profile->fill([
            'name' => $request->string('name')->toString(),
            'title' => $request->string('title')->toString(),
            'tagline' => $request->string('tagline')->toString(),
            'bio' => $request->string('bio')->toString(),
            'location' => $request->string('location')->toString(),
            'email' => $request->string('email')->toString(),
            'phone' => $request->string('phone')->toString(),
            'resume_url' => $request->string('resume_url')->toString(),
            'socials_json' => $request->input('socials', $profile->socials_json ?? []),
            'meta_json' => $request->input('meta', $profile->meta_json ?? []),
        ]);

        $profile->save();

        return redirect()->route('admin.profile.edit')->with('success', 'Profile updated.');
    }
}

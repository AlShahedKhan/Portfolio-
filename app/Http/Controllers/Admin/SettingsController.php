<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function edit(): Response
    {
        $this->authorize('viewAny', Setting::class);

        $setting = Setting::query()->firstOrCreate(['key' => 'site'], ['value_json' => []]);

        return Inertia::render('Admin/Settings/Edit', [
            'setting' => $setting,
        ]);
    }

    public function update(SettingRequest $request): RedirectResponse
    {
        $this->authorize('update', Setting::class);

        $setting = Setting::query()->firstOrCreate(['key' => 'site'], ['value_json' => []]);
        $setting->update([
            'key' => $request->string('key')->toString(),
            'value_json' => $request->input('value', []),
        ]);

        return redirect()->route('admin.settings.edit')->with('success', 'Settings updated.');
    }
}

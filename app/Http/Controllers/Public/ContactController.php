<?php

namespace App\Http\Controllers\Public;

use App\Http\Requests\ContactMessageRequest;
use App\Models\ContactMessage;
use Inertia\Inertia;
use Inertia\Response;

class ContactController
{
    public function show(): Response
    {
        return Inertia::render('Public/Contact');
    }

    public function store(ContactMessageRequest $request)
    {
        if ($request->filled('website')) {
            return redirect()->back();
        }

        ContactMessage::create([
            'name' => $request->string('name')->toString(),
            'email' => $request->string('email')->toString(),
            'subject' => $request->string('subject')->toString(),
            'message' => $request->string('message')->toString(),
            'status' => 'new',
        ]);

        return redirect()->back()->with('success', 'Message sent successfully.');
    }
}

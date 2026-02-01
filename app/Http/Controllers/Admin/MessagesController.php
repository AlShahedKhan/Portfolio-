<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MessagesController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', ContactMessage::class);

        $messages = ContactMessage::query()->latest()->paginate(15);

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
        ]);
    }

    public function update(ContactMessage $message): RedirectResponse
    {
        $this->authorize('update', $message);

        $status = request()->string('status')->toString();

        if (!in_array($status, ['new', 'read', 'archived'], true)) {
            return redirect()->back()->with('error', 'Invalid status.');
        }

        $message->update(['status' => $status]);

        return redirect()->back()->with('success', 'Message updated.');
    }
}

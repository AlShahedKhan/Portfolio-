<?php

namespace App\Policies;

use App\Models\User;

class ManageContentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'editor']);
    }

    public function view(User $user, $model = null): bool
    {
        return $user->hasAnyRole(['admin', 'editor']);
    }

    public function create(User $user, $model = null): bool
    {
        return $user->hasAnyRole(['admin', 'editor']);
    }

    public function update(User $user, $model = null): bool
    {
        return $user->hasAnyRole(['admin', 'editor']);
    }

    public function delete(User $user, $model = null): bool
    {
        return $user->hasRole('admin');
    }
}

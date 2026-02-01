<?php

namespace App\Queries;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class BlogQuery
{
    public function handle(array $filters): LengthAwarePaginator
    {
        return BlogPost::query()
            ->with('media')
            ->where('status', 'published')
            ->when($filters['search'] ?? null, function (Builder $query, string $search) {
                $query->where(function (Builder $query) use ($search) {
                    $query->where('title', 'ilike', "%{$search}%")
                        ->orWhere('excerpt', 'ilike', "%{$search}%");
                });
            })
            ->orderByDesc('published_at')
            ->paginate(6)
            ->withQueryString();
    }
}

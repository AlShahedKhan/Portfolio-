<?php

namespace App\Queries;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class BlogQuery
{
    public function handle(array $filters): LengthAwarePaginator
    {
        $searchOperator = DB::connection()->getDriverName() === 'pgsql' ? 'ilike' : 'like';

        return BlogPost::query()
            ->with('media')
            ->where('status', 'published')
            ->when($filters['search'] ?? null, function (Builder $query, string $search) use ($searchOperator) {
                $query->where(function (Builder $query) use ($search, $searchOperator) {
                    $query->where('title', $searchOperator, "%{$search}%")
                        ->orWhere('excerpt', $searchOperator, "%{$search}%");
                });
            })
            ->orderByDesc('published_at')
            ->paginate(6)
            ->withQueryString();
    }
}

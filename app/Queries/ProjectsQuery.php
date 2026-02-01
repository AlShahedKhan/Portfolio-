<?php

namespace App\Queries;

use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class ProjectsQuery
{
    public function handle(array $filters): LengthAwarePaginator
    {
        return Project::query()
            ->with('media')
            ->when($filters['search'] ?? null, function (Builder $query, string $search) {
                $query->where(function (Builder $query) use ($search) {
                    $query->where('title', 'ilike', "%{$search}%")
                        ->orWhere('summary', 'ilike', "%{$search}%");
                });
            })
            ->when($filters['tech'] ?? null, function (Builder $query, string $tech) {
                $query->whereJsonContains('tech_stack_json', $tech);
            })
            ->when(($filters['featured'] ?? null) === 'true', function (Builder $query) {
                $query->where('is_featured', true);
            })
            ->orderBy('sort_order')
            ->latest()
            ->paginate(9)
            ->withQueryString();
    }
}

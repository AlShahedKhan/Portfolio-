<?php

namespace App\Queries;

use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ProjectsQuery
{
    public function handle(array $filters): LengthAwarePaginator
    {
        $searchOperator = DB::connection()->getDriverName() === 'pgsql' ? 'ilike' : 'like';

        return Project::query()
            ->with('media')
            ->when($filters['search'] ?? null, function (Builder $query, string $search) use ($searchOperator) {
                $query->where(function (Builder $query) use ($search, $searchOperator) {
                    $query->where('title', $searchOperator, "%{$search}%")
                        ->orWhere('summary', $searchOperator, "%{$search}%");
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

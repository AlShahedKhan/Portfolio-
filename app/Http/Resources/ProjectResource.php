<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'description' => $this->description,
            'role' => $this->role,
            'tech_stack' => $this->tech_stack_json ?? [],
            'live_url' => $this->live_url,
            'github_url' => $this->github_url,
            'is_featured' => $this->is_featured,
            'cover_url' => $this->getFirstMediaUrl('cover') ?: null,
            'gallery' => $this->getMedia('gallery')->map(fn ($media) => $media->getUrl()),
        ];
    }
}

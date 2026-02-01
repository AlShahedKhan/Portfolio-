<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
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
            'excerpt' => $this->excerpt,
            'content_markdown' => $this->content_markdown,
            'status' => $this->status,
            'published_at' => optional($this->published_at)->toDateString(),
            'tags' => $this->tags_json ?? [],
            'cover_url' => $this->getFirstMediaUrl('cover') ?: null,
        ];
    }
}

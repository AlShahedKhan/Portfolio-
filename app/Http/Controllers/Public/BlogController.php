<?php

namespace App\Http\Controllers\Public;

use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use App\Queries\BlogQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController
{
    public function index(Request $request, BlogQuery $query): Response
    {
        $filters = $request->only('search');
        $posts = $query->handle($filters);

        return Inertia::render('Public/Blog/Index', [
            'filters' => $filters,
            'posts' => [
                'data' => BlogPostResource::collection($posts)->resolve(),
                'links' => $posts->linkCollection()->toArray(),
                'meta' => [
                    'current_page' => $posts->currentPage(),
                    'last_page' => $posts->lastPage(),
                    'per_page' => $posts->perPage(),
                    'total' => $posts->total(),
                ],
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::query()
            ->with('media')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $html = Str::markdown($post->content_markdown);
        $safeHtml = strip_tags($html, '<p><strong><em><a><ul><ol><li><h1><h2><h3><h4><blockquote><code><pre><br>');

        return Inertia::render('Public/Blog/Show', [
            'post' => BlogPostResource::make($post)->resolve(),
            'content_html' => $safeHtml,
        ]);
    }
}

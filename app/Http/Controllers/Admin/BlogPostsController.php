<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogPostRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostsController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(BlogPost::class, 'blog');
    }

    public function index(): Response
    {
        $posts = BlogPost::query()->with('media')->latest()->paginate(10);

        return Inertia::render('Admin/Blog/Index', [
            'posts' => BlogPostResource::collection($posts),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Blog/Create');
    }

    public function store(BlogPostRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $tags = collect(explode(',', $data['tags'] ?? ''))
            ->map(fn ($item) => trim($item))
            ->filter()
            ->values()
            ->all();

        $publishedAt = $data['published_at'] ?: null;
        if ($data['status'] === 'published' && $publishedAt === null) {
            $publishedAt = now();
        }

        $post = BlogPost::create([
            'title' => $data['title'],
            'slug' => $data['slug'] ?? Str::slug($data['title']),
            'excerpt' => $data['excerpt'] ?? null,
            'content_markdown' => $data['content_markdown'],
            'status' => $data['status'],
            'published_at' => $publishedAt,
            'tags_json' => $tags,
        ]);

        return redirect()->route('admin.blog.edit', $post)->with('success', 'Blog post created.');
    }

    public function edit(BlogPost $blog): Response
    {
        $blog->load('media');

        return Inertia::render('Admin/Blog/Edit', [
            'post' => BlogPostResource::make($blog)->resolve(),
        ]);
    }

    public function update(BlogPostRequest $request, BlogPost $blog): RedirectResponse
    {
        $data = $request->validated();

        $tags = collect(explode(',', $data['tags'] ?? ''))
            ->map(fn ($item) => trim($item))
            ->filter()
            ->values()
            ->all();

        $publishedAt = $data['published_at'] ?: null;
        if ($data['status'] === 'published' && $publishedAt === null) {
            $publishedAt = now();
        }

        $blog->update([
            'title' => $data['title'],
            'slug' => $data['slug'] ?? $blog->slug ?? Str::slug($data['title']),
            'excerpt' => $data['excerpt'] ?? null,
            'content_markdown' => $data['content_markdown'],
            'status' => $data['status'],
            'published_at' => $publishedAt,
            'tags_json' => $tags,
        ]);

        return redirect()->route('admin.blog.edit', $blog)->with('success', 'Blog post updated.');
    }

    public function destroy(BlogPost $blog): RedirectResponse
    {
        $blog->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted.');
    }
}

import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { BlogPost } from '@/types';
import type { FormEvent } from 'react';

export default function BlogEdit({ post }: { post: BlogPost }) {
    const { data, setData, put, processing } = useForm({
        title: post.title ?? '',
        slug: post.slug ?? '',
        excerpt: post.excerpt ?? '',
        content_markdown: post.content_markdown ?? '',
        status: post.status ?? 'draft',
        published_at: post.published_at ?? '',
        tags: post.tags?.join(', ') ?? '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/blog/${post.id}`);
    };

    return (
        <AdminLayout title="Edit blog post">
            <Head title="Edit blog post" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" />
                    <Input value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="Slug" />
                    <Textarea value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} placeholder="Excerpt" />
                    <Textarea
                        value={data.content_markdown}
                        onChange={(e) => setData('content_markdown', e.target.value)}
                        placeholder="Markdown content"
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                        <select
                            className="h-11 rounded-xl border border-slate-800 bg-slate-950/60 px-4 text-sm"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <Input
                            type="date"
                            value={data.published_at}
                            onChange={(e) => setData('published_at', e.target.value)}
                        />
                        <Input
                            value={data.tags}
                            onChange={(e) => setData('tags', e.target.value)}
                            placeholder="Tags (comma separated)"
                        />
                    </div>
                    <Button type="submit" disabled={processing}>
                        Save changes
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

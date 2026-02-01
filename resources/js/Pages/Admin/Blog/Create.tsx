import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { FormEvent } from 'react';

export default function BlogCreate() {
    const { data, setData, post, processing } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content_markdown: '',
        status: 'draft',
        published_at: '',
        tags: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/blog');
    };

    return (
        <AdminLayout title="Create blog post">
            <Head title="Create blog post" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" />
                    <Input value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="Slug (optional)" />
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
                        Create post
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

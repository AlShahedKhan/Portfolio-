import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { FormEvent } from 'react';

export default function ProjectCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        summary: '',
        description: '',
        role: '',
        tech_stack: '',
        live_url: '',
        github_url: '',
        is_featured: false,
        sort_order: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/projects');
    };

    return (
        <AdminLayout title="Create project">
            <Head title="Create project" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" />
                    <Input value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="Slug (optional)" />
                    <Textarea value={data.summary} onChange={(e) => setData('summary', e.target.value)} placeholder="Summary" />
                    <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Description" />
                    <Input value={data.role} onChange={(e) => setData('role', e.target.value)} placeholder="Role" />
                    <Input
                        value={data.tech_stack}
                        onChange={(e) => setData('tech_stack', e.target.value)}
                        placeholder="Tech stack (comma separated)"
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        <Input value={data.live_url} onChange={(e) => setData('live_url', e.target.value)} placeholder="Live URL" />
                        <Input
                            value={data.github_url}
                            onChange={(e) => setData('github_url', e.target.value)}
                            placeholder="GitHub URL"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                        />
                        <span className="text-sm text-slate-300">Featured project</span>
                    </div>
                    <Button type="submit" disabled={processing}>
                        Create project
                    </Button>
                    {Object.values(errors).length ? (
                        <p className="text-xs text-rose-400">Please fix the highlighted fields.</p>
                    ) : null}
                </form>
            </Card>
        </AdminLayout>
    );
}

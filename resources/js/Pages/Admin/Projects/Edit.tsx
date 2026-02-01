import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { Project } from '@/types';
import type { FormEvent } from 'react';

export default function ProjectEdit({ project }: { project: Project }) {
    const { data, setData, put, processing } = useForm({
        title: project.title ?? '',
        slug: project.slug ?? '',
        summary: project.summary ?? '',
        description: project.description ?? '',
        role: project.role ?? '',
        tech_stack: project.tech_stack?.join(', ') ?? '',
        live_url: project.live_url ?? '',
        github_url: project.github_url ?? '',
        is_featured: project.is_featured ?? false,
        sort_order: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/projects/${project.id}`);
    };

    return (
        <AdminLayout title="Edit project">
            <Head title="Edit project" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" />
                    <Input value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="Slug" />
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
                        Save changes
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

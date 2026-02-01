import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';

export default function Dashboard({ stats }: { stats: { projects: number; skills: number; blog_posts: number; messages: number } }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: 'Projects', value: stats.projects },
                    { label: 'Skills', value: stats.skills },
                    { label: 'Blog posts', value: stats.blog_posts },
                    { label: 'New messages', value: stats.messages },
                ].map((item) => (
                    <Card key={item.label} className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                        <p className="text-3xl font-semibold text-white">{item.value}</p>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
}

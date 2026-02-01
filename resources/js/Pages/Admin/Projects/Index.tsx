import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import type { Project } from '@/types';

export default function ProjectsIndex({ projects }: { projects: { data: Project[] } }) {
    return (
        <AdminLayout title="Projects">
            <Head title="Projects" />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">All projects</h2>
                    <p className="text-sm text-slate-400">Manage portfolio projects and case studies.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/projects/create">Add project</Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-4">
                {projects.data.map((project) => (
                    <Card key={project.id} className="flex items-center justify-between">
                        <div>
                            <p className="text-base font-semibold text-white">{project.title}</p>
                            <p className="text-sm text-slate-400">{project.summary}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/admin/projects/${project.id}/edit`} className="text-sm text-slate-200">
                                Edit
                            </Link>
                            <Link
                                href={`/admin/projects/${project.id}`}
                                method="delete"
                                as="button"
                                className="text-sm text-rose-400"
                            >
                                Delete
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
}

import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import type { Experience } from '@/types';

export default function ExperienceIndex({ experiences }: { experiences: Experience[] }) {
    return (
        <AdminLayout title="Experience">
            <Head title="Experience" />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">Experience</h2>
                    <p className="text-sm text-slate-400">Track your professional timeline.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/experience/create">Add experience</Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-4">
                {experiences.map((experience) => (
                    <Card key={experience.id} className="flex items-center justify-between">
                        <div>
                            <p className="text-base font-semibold text-white">{experience.role}</p>
                            <p className="text-sm text-slate-400">{experience.company}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/admin/experience/${experience.id}/edit`} className="text-sm text-slate-200">
                                Edit
                            </Link>
                            <Link
                                href={`/admin/experience/${experience.id}`}
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

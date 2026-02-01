import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import type { Education } from '@/types';

export default function EducationIndex({ educations }: { educations: Education[] }) {
    return (
        <AdminLayout title="Education">
            <Head title="Education" />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">Education</h2>
                    <p className="text-sm text-slate-400">Academic history and certifications.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/education/create">Add education</Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-4">
                {educations.map((education) => (
                    <Card key={education.id} className="flex items-center justify-between">
                        <div>
                            <p className="text-base font-semibold text-white">{education.degree}</p>
                            <p className="text-sm text-slate-400">{education.school}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/admin/education/${education.id}/edit`} className="text-sm text-slate-200">
                                Edit
                            </Link>
                            <Link
                                href={`/admin/education/${education.id}`}
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

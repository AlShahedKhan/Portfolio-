import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import type { Skill } from '@/types';

export default function SkillsIndex({ skills }: { skills: Skill[] }) {
    return (
        <AdminLayout title="Skills">
            <Head title="Skills" />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">Skills</h2>
                    <p className="text-sm text-slate-400">Showcase your capabilities.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/skills/create">Add skill</Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-4">
                {skills.map((skill) => (
                    <Card key={skill.id} className="flex items-center justify-between">
                        <div>
                            <p className="text-base font-semibold text-white">{skill.name}</p>
                            <p className="text-sm text-slate-400">{skill.category}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/admin/skills/${skill.id}/edit`} className="text-sm text-slate-200">
                                Edit
                            </Link>
                            <Link
                                href={`/admin/skills/${skill.id}`}
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

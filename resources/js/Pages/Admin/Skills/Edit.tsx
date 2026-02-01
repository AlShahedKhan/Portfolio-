import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';
import type { Skill } from '@/types';
import type { FormEvent } from 'react';

export default function SkillEdit({ skill }: { skill: Skill }) {
    const { data, setData, put, processing } = useForm({
        name: skill.name ?? '',
        category: skill.category ?? '',
        icon: skill.icon ?? '',
        level: skill.level ?? '',
        sort_order: skill.sort_order ?? 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/skills/${skill.id}`);
    };

    return (
        <AdminLayout title="Edit skill">
            <Head title="Edit skill" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Skill name" />
                    <Input value={data.category} onChange={(e) => setData('category', e.target.value)} placeholder="Category" />
                    <Input value={data.icon} onChange={(e) => setData('icon', e.target.value)} placeholder="Icon (optional)" />
                    <Input value={data.level} onChange={(e) => setData('level', e.target.value)} placeholder="Level" />
                    <Button type="submit" disabled={processing}>
                        Save changes
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

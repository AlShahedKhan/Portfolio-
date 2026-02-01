import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';
import type { FormEvent } from 'react';

export default function SkillCreate() {
    const { data, setData, post, processing } = useForm({
        name: '',
        category: '',
        icon: '',
        level: '',
        sort_order: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/skills');
    };

    return (
        <AdminLayout title="Create skill">
            <Head title="Create skill" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Skill name" />
                    <Input value={data.category} onChange={(e) => setData('category', e.target.value)} placeholder="Category" />
                    <Input value={data.icon} onChange={(e) => setData('icon', e.target.value)} placeholder="Icon (optional)" />
                    <Input value={data.level} onChange={(e) => setData('level', e.target.value)} placeholder="Level" />
                    <Button type="submit" disabled={processing}>
                        Create skill
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

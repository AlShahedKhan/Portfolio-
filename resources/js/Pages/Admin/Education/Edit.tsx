import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { Education } from '@/types';
import type { FormEvent } from 'react';

export default function EducationEdit({ education }: { education: Education }) {
    const { data, setData, put, processing } = useForm({
        school: education.school ?? '',
        degree: education.degree ?? '',
        year: education.year ?? '',
        details: education.details ?? '',
        sort_order: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/education/${education.id}`);
    };

    return (
        <AdminLayout title="Edit education">
            <Head title="Edit education" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.school} onChange={(e) => setData('school', e.target.value)} placeholder="School" />
                    <Input value={data.degree} onChange={(e) => setData('degree', e.target.value)} placeholder="Degree" />
                    <Input value={data.year} onChange={(e) => setData('year', e.target.value)} placeholder="Year" />
                    <Textarea value={data.details} onChange={(e) => setData('details', e.target.value)} placeholder="Details" />
                    <Button type="submit" disabled={processing}>
                        Save changes
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

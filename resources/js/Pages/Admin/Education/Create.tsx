import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { FormEvent } from 'react';

export default function EducationCreate() {
    const { data, setData, post, processing } = useForm({
        school: '',
        degree: '',
        year: '',
        details: '',
        sort_order: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/education');
    };

    return (
        <AdminLayout title="Create education">
            <Head title="Create education" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.school} onChange={(e) => setData('school', e.target.value)} placeholder="School" />
                    <Input value={data.degree} onChange={(e) => setData('degree', e.target.value)} placeholder="Degree" />
                    <Input value={data.year} onChange={(e) => setData('year', e.target.value)} placeholder="Year" />
                    <Textarea value={data.details} onChange={(e) => setData('details', e.target.value)} placeholder="Details" />
                    <Button type="submit" disabled={processing}>
                        Create education
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

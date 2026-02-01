import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { FormEvent } from 'react';

export default function ExperienceCreate() {
    const { data, setData, post, processing } = useForm({
        company: '',
        role: '',
        start_date: '',
        end_date: '',
        location: '',
        description: '',
        sort_order: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/experience');
    };

    return (
        <AdminLayout title="Create experience">
            <Head title="Create experience" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.company} onChange={(e) => setData('company', e.target.value)} placeholder="Company" />
                    <Input value={data.role} onChange={(e) => setData('role', e.target.value)} placeholder="Role" />
                    <div className="grid gap-4 md:grid-cols-2">
                        <Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                        <Input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} />
                    </div>
                    <Input value={data.location} onChange={(e) => setData('location', e.target.value)} placeholder="Location" />
                    <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Description" />
                    <Button type="submit" disabled={processing}>
                        Create experience
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

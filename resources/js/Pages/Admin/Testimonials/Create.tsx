import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { FormEvent } from 'react';

export default function TestimonialCreate() {
    const { data, setData, post, processing } = useForm({
        name: '',
        company: '',
        quote: '',
        rating: '',
        is_featured: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/testimonials');
    };

    return (
        <AdminLayout title="Create testimonial">
            <Head title="Create testimonial" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" />
                    <Input value={data.company} onChange={(e) => setData('company', e.target.value)} placeholder="Company" />
                    <Textarea value={data.quote} onChange={(e) => setData('quote', e.target.value)} placeholder="Quote" />
                    <Input
                        value={data.rating}
                        onChange={(e) => setData('rating', e.target.value)}
                        placeholder="Rating (1-5)"
                    />
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                        />
                        <span className="text-sm text-slate-300">Featured testimonial</span>
                    </div>
                    <Button type="submit" disabled={processing}>
                        Create testimonial
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

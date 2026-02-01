import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { Profile } from '@/types';
import type { FormEvent } from 'react';

export default function ProfileEdit({ profile }: { profile: Profile }) {
    const { data, setData, put, processing, errors } = useForm({
        name: profile?.name ?? '',
        title: profile?.title ?? '',
        tagline: profile?.tagline ?? '',
        bio: profile?.bio ?? '',
        location: profile?.location ?? '',
        email: profile?.email ?? '',
        phone: profile?.phone ?? '',
        resume_url: profile?.resume_url ?? '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/profile');
    };

    return (
        <AdminLayout title="Profile">
            <Head title="Profile" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" />
                            {errors.name ? <p className="mt-1 text-xs text-rose-400">{errors.name}</p> : null}
                        </div>
                        <div>
                            <Input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" />
                            {errors.title ? <p className="mt-1 text-xs text-rose-400">{errors.title}</p> : null}
                        </div>
                    </div>
                    <Input value={data.tagline} onChange={(e) => setData('tagline', e.target.value)} placeholder="Tagline" />
                    <Textarea value={data.bio} onChange={(e) => setData('bio', e.target.value)} placeholder="Bio" />
                    <div className="grid gap-4 md:grid-cols-2">
                        <Input value={data.location} onChange={(e) => setData('location', e.target.value)} placeholder="Location" />
                        <Input value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="Phone" />
                        <Input value={data.resume_url} onChange={(e) => setData('resume_url', e.target.value)} placeholder="Resume URL" />
                    </div>
                    <Button type="submit" disabled={processing}>
                        Save profile
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

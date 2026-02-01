import { Head, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import type { Setting } from '@/types';
import type { FormEvent } from 'react';

export default function SettingsEdit({ setting }: { setting: Setting }) {
    const { data, setData, put, processing } = useForm({
        key: setting.key ?? 'site',
        value: JSON.stringify(setting.value_json ?? {}, null, 2),
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        try {
            const parsed = JSON.parse(data.value || '{}');
            put('/admin/settings', { data: { key: data.key, value: parsed } });
        } catch (error) {
            alert('Invalid JSON. Please fix the settings payload.');
        }
    };

    return (
        <AdminLayout title="Settings">
            <Head title="Settings" />
            <Card>
                <form onSubmit={submit} className="space-y-4">
                    <Textarea
                        value={data.value}
                        onChange={(e) => setData('value', e.target.value)}
                        placeholder="Settings JSON"
                    />
                    <Button type="submit" disabled={processing}>
                        Save settings
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
}

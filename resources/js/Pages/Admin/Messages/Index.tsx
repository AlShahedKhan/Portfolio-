import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import type { ContactMessage } from '@/types';

export default function MessagesIndex({ messages }: { messages: { data: ContactMessage[] } }) {
    return (
        <AdminLayout title="Messages">
            <Head title="Messages" />
            <div className="grid gap-4">
                {messages.data.map((message) => (
                    <Card key={message.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base font-semibold text-white">{message.name}</p>
                                <p className="text-sm text-slate-400">{message.email}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                {['new', 'read', 'archived'].map((status) => (
                                    <Link
                                        key={status}
                                        href={`/admin/messages/${message.id}`}
                                        method="patch"
                                        data={{ status }}
                                        as="button"
                                        className={`rounded-full border px-3 py-1 ${
                                            message.status === status
                                                ? 'border-white text-white'
                                                : 'border-slate-700 text-slate-400'
                                        }`}
                                    >
                                        {status}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-slate-300">{message.message}</p>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
}

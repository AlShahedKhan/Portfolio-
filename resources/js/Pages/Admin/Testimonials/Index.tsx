import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import type { Testimonial } from '@/types';

export default function TestimonialsIndex({ testimonials }: { testimonials: { data: Testimonial[] } }) {
    return (
        <AdminLayout title="Testimonials">
            <Head title="Testimonials" />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">Testimonials</h2>
                    <p className="text-sm text-slate-400">Social proof and client quotes.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/testimonials/create">Add testimonial</Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-4">
                {testimonials.data.map((testimonial) => (
                    <Card key={testimonial.id} className="flex items-center justify-between">
                        <div>
                            <p className="text-base font-semibold text-white">{testimonial.name}</p>
                            <p className="text-sm text-slate-400">{testimonial.company}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/admin/testimonials/${testimonial.id}/edit`} className="text-sm text-slate-200">
                                Edit
                            </Link>
                            <Link
                                href={`/admin/testimonials/${testimonial.id}`}
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

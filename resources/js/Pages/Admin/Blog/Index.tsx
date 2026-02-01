import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import type { BlogPost } from '@/types';

export default function BlogIndex({ posts }: { posts: { data: BlogPost[] } }) {
    return (
        <AdminLayout title="Blog">
            <Head title="Blog" />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">Blog posts</h2>
                    <p className="text-sm text-slate-400">Write and publish your insights.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/blog/create">Add post</Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-4">
                {posts.data.map((post) => (
                    <Card key={post.id} className="flex items-center justify-between">
                        <div>
                            <p className="text-base font-semibold text-white">{post.title}</p>
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{post.status}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/admin/blog/${post.id}/edit`} className="text-sm text-slate-200">
                                Edit
                            </Link>
                            <Link
                                href={`/admin/blog/${post.id}`}
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

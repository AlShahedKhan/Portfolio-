import { Head, Link, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Container } from '@/Components/Container';
import { SectionHeading } from '@/Components/SectionHeading';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import type { BlogPost } from '@/types';
import { useState, type FormEvent } from 'react';

export default function BlogIndex({ posts, filters }: {
    posts: { data: BlogPost[]; links?: { url: string | null; label: string; active: boolean }[]; meta?: { links?: { url: string | null; label: string; active: boolean }[] } };
    filters: { search?: string };
}) {
    const paginationLinks = Array.isArray(posts.links)
        ? posts.links
        : Array.isArray((posts as { links?: { data?: unknown } }).links?.data)
            ? (posts as { links?: { data?: { url: string | null; label: string; active: boolean }[] } }).links?.data ?? []
            : Array.isArray(posts.meta?.links)
                ? posts.meta?.links
                : [];
    const [search, setSearch] = useState(filters.search ?? '');

    const submit = (e: FormEvent) => {
        e.preventDefault();
        router.get('/blog', { search: search || undefined }, { preserveScroll: true, preserveState: true });
    };

    return (
        <PublicLayout>
            <Head title="Blog" />
            <Container>
                <SectionHeading
                    eyebrow="Insights"
                    title="Blog"
                    subtitle="Writing about product strategy, engineering, and design systems."
                />

                <form onSubmit={submit} className="mt-8 flex flex-wrap items-center gap-3">
                    <div className="w-full md:w-80">
                        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search posts..." />
                    </div>
                    <button
                        type="submit"
                        className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200"
                    >
                        Search
                    </button>
                </form>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {posts.data.map((post) => (
                        <Card key={post.id} className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{post.published_at}</p>
                                <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                            </div>
                            <p className="text-sm text-slate-400">{post.excerpt}</p>
                            <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-slate-200">
                                Read article →
                            </Link>
                        </Card>
                    ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                    {paginationLinks.map((link) =>
                        link.url ? (
                            <Link
                                key={link.label}
                                href={link.url}
                                className={`rounded-full border px-3 py-1 text-xs ${
                                    link.active ? 'border-white text-white' : 'border-slate-700 text-slate-400'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={link.label}
                                className="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-600"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ),
                    )}
                </div>
            </Container>
        </PublicLayout>
    );
}

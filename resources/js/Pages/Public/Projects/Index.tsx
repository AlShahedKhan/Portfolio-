import { Head, Link, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Container } from '@/Components/Container';
import { SectionHeading } from '@/Components/SectionHeading';
import { Badge } from '@/Components/ui/Badge';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import type { Project } from '@/types';
import { useState, type FormEvent } from 'react';

export default function ProjectsIndex({ projects, filters }: {
    projects: { data: Project[]; links?: { url: string | null; label: string; active: boolean }[]; meta?: { links?: { url: string | null; label: string; active: boolean }[] } };
    filters: { search?: string; tech?: string; featured?: string };
}) {
    const paginationLinks = Array.isArray(projects.links)
        ? projects.links
        : Array.isArray((projects as { links?: { data?: unknown } }).links?.data)
            ? (projects as { links?: { data?: { url: string | null; label: string; active: boolean }[] } }).links?.data ?? []
            : Array.isArray(projects.meta?.links)
                ? projects.meta?.links
                : [];
    const [search, setSearch] = useState(filters.search ?? '');
    const [tech, setTech] = useState(filters.tech ?? '');
    const [featured, setFeatured] = useState(filters.featured === 'true');

    const submit = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            '/projects',
            { search: search || undefined, tech: tech || undefined, featured: featured ? 'true' : undefined },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <PublicLayout>
            <Head title="Projects" />
            <Container>
                <SectionHeading
                    eyebrow="Portfolio"
                    title="Projects"
                    subtitle="Deep dives into product work, design systems, and web experiences."
                />

                <form onSubmit={submit} className="mt-8 flex flex-wrap items-center gap-3">
                    <div className="w-full md:w-80">
                        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects..." />
                    </div>
                    <div className="w-full md:w-64">
                        <Input value={tech} onChange={(event) => setTech(event.target.value)} placeholder="Filter by tech..." />
                    </div>
                    <button
                        type="submit"
                        className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200"
                    >
                        Search
                    </button>
                    <label className="flex items-center gap-2 text-xs text-slate-300">
                        <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
                        Featured only
                    </label>
                </form>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {projects.data.map((project) => (
                        <Card key={project.id} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                {project.is_featured ? <Badge>Featured</Badge> : null}
                            </div>
                            <p className="text-sm text-slate-400">{project.summary}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack?.slice(0, 5).map((tech) => (
                                    <Badge key={tech}>{tech}</Badge>
                                ))}
                            </div>
                            <Link href={`/projects/${project.slug}`} className="text-sm font-semibold text-slate-200">
                                View case study →
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

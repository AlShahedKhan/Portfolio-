import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Container } from '@/Components/Container';
import { Badge } from '@/Components/ui/Badge';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import type { Project } from '@/types';

export default function ProjectShow({ project, related }: { project: Project; related: { data: Project[] } }) {
    return (
        <PublicLayout>
            <Head title={project.title} />
            <Container>
                <section className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Project</p>
                        <h1 className="text-4xl font-semibold text-white md:text-5xl">{project.title}</h1>
                        <p className="max-w-2xl text-lg text-slate-300">{project.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {project.live_url ? (
                            <Button asChild>
                                <a href={project.live_url} target="_blank" rel="noreferrer">
                                    Live Preview
                                </a>
                            </Button>
                        ) : null}
                        {project.github_url ? (
                            <Button variant="outline" asChild>
                                <a href={project.github_url} target="_blank" rel="noreferrer">
                                    GitHub Repo
                                </a>
                            </Button>
                        ) : null}
                    </div>
                </section>

                <section className="mt-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
                    <Card className="space-y-4">
                        <h2 className="text-xl font-semibold text-white">Project Overview</h2>
                        <p className="text-sm text-slate-300 whitespace-pre-line">{project.description}</p>
                    </Card>
                    <Card className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Role</h3>
                        <p className="text-sm text-slate-300">{project.role ?? 'Product Design & Engineering'}</p>
                    </Card>
                </section>

                <section className="mt-16 space-y-6">
                    <h3 className="text-xl font-semibold text-white">Related Projects</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                        {related.data.map((item) => (
                            <Card key={item.id} className="space-y-3">
                                <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                                <p className="text-sm text-slate-400">{item.summary}</p>
                                <Link href={`/projects/${item.slug}`} className="text-sm font-semibold text-slate-200">
                                    View case study →
                                </Link>
                            </Card>
                        ))}
                    </div>
                </section>
            </Container>
        </PublicLayout>
    );
}

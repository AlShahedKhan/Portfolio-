import { Link, Head } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Container } from '@/Components/Container';
import { SectionHeading } from '@/Components/SectionHeading';
import { Badge } from '@/Components/ui/Badge';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import type { Experience, Profile, Project, Skill, Testimonial } from '@/types';

export default function Home({ profile, featuredProjects, skills, experiences, testimonials }: {
    profile?: Profile | null;
    featuredProjects: { data: Project[] };
    skills: Skill[];
    experiences: Experience[];
    testimonials: { data: Testimonial[] };
}) {
    return (
        <PublicLayout>
            <Head title="Home" />
            <Container>
                <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Premium Portfolio</p>
                        <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                            {profile?.name ?? 'Abdullah Al Shahed'}
                            <span className="block text-slate-400">{profile?.title ?? 'Full-Stack Developer'}</span>
                        </h1>
                        <p className="max-w-xl text-lg text-slate-300">
                            {profile?.tagline ?? 'Designing and building digital products with crisp UX and resilient code.'}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href="/projects">View Projects</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/contact">Start a Project</Link>
                            </Button>
                        </div>
                    </div>
                    <Card className="flex flex-col justify-between gap-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Profile Snapshot</p>
                            <div className="mt-4 space-y-3 text-sm text-slate-300">
                                <p>Location: {profile?.location ?? 'Remote / Bangladesh'}</p>
                                <p>Email: {profile?.email ?? 'hello@example.com'}</p>
                                <p>Phone: {profile?.phone ?? '+880 1xx xxxx xxx'}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-slate-200">Focus Areas</p>
                            <div className="flex flex-wrap gap-2">
                                {skills.slice(0, 6).map((skill) => (
                                    <Badge key={skill.id}>{skill.name}</Badge>
                                ))}
                            </div>
                        </div>
                    </Card>
                </section>

                <section className="mt-20 space-y-8">
                    <SectionHeading
                        eyebrow="Featured Work"
                        title="Selected Projects"
                        subtitle="A curated set of product builds, platform experiences, and web apps."
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                        {featuredProjects.data.map((project) => (
                            <Card key={project.id} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                    {project.is_featured ? <Badge>Featured</Badge> : null}
                                </div>
                                <p className="text-sm text-slate-400">{project.summary}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack?.slice(0, 4)?.map((tech) => (
                                        <Badge key={tech}>{tech}</Badge>
                                    ))}
                                </div>
                                <Link href={`/projects/${project.slug}`} className="text-sm font-semibold text-slate-200">
                                    View case study →
                                </Link>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mt-20 grid gap-10 lg:grid-cols-2">
                    <div className="space-y-6">
                        <SectionHeading
                            eyebrow="Capabilities"
                            title="Skills & Tooling"
                            subtitle="A versatile stack tuned for shipping production-grade experiences."
                        />
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge key={skill.id}>{skill.name}</Badge>
                            ))}
                        </div>
                    </div>
                    <Card className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Experience</p>
                        <div className="space-y-4">
                            {experiences.map((experience) => (
                                <div key={experience.id} className="space-y-1">
                                    <p className="text-base font-semibold text-white">{experience.role}</p>
                                    <p className="text-sm text-slate-400">
                                        {experience.company} • {experience.location ?? 'Remote'}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Link href="/about" className="text-sm font-semibold text-slate-200">
                            See full timeline →
                        </Link>
                    </Card>
                </section>

                <section className="mt-20 space-y-8">
                    <SectionHeading
                        eyebrow="Social Proof"
                        title="Testimonials"
                        subtitle="What collaborators and clients say about working together."
                    />
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.data.map((testimonial) => (
                            <Card key={testimonial.id} className="space-y-4">
                                <p className="text-sm text-slate-300">“{testimonial.quote}”</p>
                                <div>
                                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-xs text-slate-400">{testimonial.company}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mt-20">
                    <Card className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Let’s build</p>
                            <h3 className="text-2xl font-semibold text-white">Ready to launch your next product?</h3>
                            <p className="text-sm text-slate-400">Let’s scope the idea and build it right.</p>
                        </div>
                        <Button asChild>
                            <Link href="/contact">Start the conversation</Link>
                        </Button>
                    </Card>
                </section>
            </Container>
        </PublicLayout>
    );
}

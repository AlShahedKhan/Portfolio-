import { Head } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Container } from '@/Components/Container';
import { SectionHeading } from '@/Components/SectionHeading';
import { Card } from '@/Components/ui/Card';
import type { Education, Experience, Profile } from '@/types';

export default function About({ profile, experiences, educations }: {
    profile?: Profile | null;
    experiences: Experience[];
    educations: Education[];
}) {
    return (
        <PublicLayout>
            <Head title="About" />
            <Container>
                <section className="space-y-6">
                    <SectionHeading
                        eyebrow="About"
                        title="Story & Background"
                        subtitle="A blend of product strategy, thoughtful design, and durable engineering."
                    />
                    <Card className="space-y-4">
                        <h2 className="text-xl font-semibold text-white">{profile?.name ?? 'Abdullah Al Shahed'}</h2>
                        <p className="text-sm text-slate-300 whitespace-pre-line">{profile?.bio ?? 'Share your story here.'}</p>
                    </Card>
                </section>

                <section className="mt-16 grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <SectionHeading eyebrow="Experience" title="Career Timeline" />
                        <div className="space-y-4">
                            {experiences.map((experience) => (
                                <Card key={experience.id} className="space-y-2">
                                    <p className="text-base font-semibold text-white">{experience.role}</p>
                                    <p className="text-sm text-slate-400">
                                        {experience.company} • {experience.location ?? 'Remote'}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {experience.start_date} - {experience.end_date ?? 'Present'}
                                    </p>
                                    <p className="text-sm text-slate-300">{experience.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <SectionHeading eyebrow="Education" title="Academic Background" />
                        <div className="space-y-4">
                            {educations.map((education) => (
                                <Card key={education.id} className="space-y-2">
                                    <p className="text-base font-semibold text-white">{education.degree}</p>
                                    <p className="text-sm text-slate-400">{education.school}</p>
                                    <p className="text-xs text-slate-500">{education.year}</p>
                                    <p className="text-sm text-slate-300">{education.details}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </Container>
        </PublicLayout>
    );
}

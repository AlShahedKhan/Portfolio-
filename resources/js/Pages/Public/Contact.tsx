import { Head, useForm } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Container } from '@/Components/Container';
import { SectionHeading } from '@/Components/SectionHeading';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import type { FormEvent } from 'react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset('message'),
        });
    };

    return (
        <PublicLayout>
            <Head title="Contact" />
            <Container>
                <SectionHeading
                    eyebrow="Contact"
                    title="Let's build something together"
                    subtitle="Share a few details and I will get back to you within 48 hours."
                />

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <Card>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Input
                                        value={data.name}
                                        onChange={(event) => setData('name', event.target.value)}
                                        placeholder="Your name"
                                    />
                                    {errors.name ? <p className="mt-1 text-xs text-rose-400">{errors.name}</p> : null}
                                </div>
                                <div>
                                    <Input
                                        value={data.email}
                                        onChange={(event) => setData('email', event.target.value)}
                                        placeholder="Email address"
                                    />
                                    {errors.email ? <p className="mt-1 text-xs text-rose-400">{errors.email}</p> : null}
                                </div>
                            </div>
                            <Input
                                value={data.subject}
                                onChange={(event) => setData('subject', event.target.value)}
                                placeholder="Subject"
                            />
                            <Textarea
                                value={data.message}
                                onChange={(event) => setData('message', event.target.value)}
                                placeholder="Tell me about your project..."
                            />
                            <input
                                type="text"
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                                value={data.website}
                                onChange={(event) => setData('website', event.target.value)}
                            />
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Sending...' : 'Send message'}
                            </Button>
                        </form>
                    </Card>
                    <Card className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Contact details</h3>
                        <div className="space-y-2 text-sm text-slate-400">
                            <p>Email: hello@example.com</p>
                            <p>Location: Dhaka, Bangladesh</p>
                            <p>Availability: Open for selective work</p>
                        </div>
                    </Card>
                </div>
            </Container>
        </PublicLayout>
    );
}

import { Head } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Container } from '@/Components/Container';
import type { BlogPost } from '@/types';

export default function BlogShow({ post, content_html }: { post: BlogPost; content_html: string }) {
    return (
        <PublicLayout>
            <Head title={post.title} />
            <Container>
                <article className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{post.published_at}</p>
                        <h1 className="text-4xl font-semibold text-white md:text-5xl">{post.title}</h1>
                        <p className="text-lg text-slate-300">{post.excerpt}</p>
                    </div>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: content_html }}
                    />
                </article>
            </Container>
        </PublicLayout>
    );
}

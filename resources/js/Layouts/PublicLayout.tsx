import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Container } from '@/Components/Container';
import { FlashToaster } from '@/Components/FlashToaster';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

type PublicLayoutProps = {
    children: ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%),radial-gradient(circle_at_20%_80%,_rgba(14,116,144,0.2),_transparent_50%)]" />
            <header className="sticky top-0 z-20 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
                <Container className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-base font-semibold tracking-wide">
                        Abdullah<span className="text-slate-400">.dev</span>
                    </Link>
                    <nav className="hidden items-center gap-6 text-sm md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-slate-400 transition hover:text-white',
                                    url === link.href && 'text-white',
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <Link
                        href="/contact"
                        className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-900"
                    >
                        Hire Me
                    </Link>
                </Container>
            </header>
            <main className="pb-20 pt-10">{children}</main>
            <footer className="border-t border-slate-800/70 py-10 text-center text-sm text-slate-500">
                Built with Laravel + Inertia + React.
            </footer>
            <Toaster richColors />
            <FlashToaster />
        </div>
    );
}

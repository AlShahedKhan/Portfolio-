import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { FlashToaster } from '@/Components/FlashToaster';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Profile', href: '/admin/profile' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Skills', href: '/admin/skills' },
    { label: 'Experience', href: '/admin/experience' },
    { label: 'Education', href: '/admin/education' },
    { label: 'Blog', href: '/admin/blog' },
    { label: 'Testimonials', href: '/admin/testimonials' },
    { label: 'Messages', href: '/admin/messages' },
    { label: 'Settings', href: '/admin/settings' },
];

type AdminLayoutProps = {
    children: ReactNode;
    title?: string;
};

export function AdminLayout({ children, title }: AdminLayoutProps) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_55%),radial-gradient(circle_at_90%_20%,_rgba(59,130,246,0.2),_transparent_60%)]" />
            <div className="flex min-h-screen">
                <aside className="hidden w-64 flex-shrink-0 border-r border-slate-800/70 bg-slate-950/80 p-6 lg:block">
                    <div className="text-sm font-semibold tracking-wide text-slate-200">Admin Studio</div>
                    <nav className="mt-8 space-y-1 text-sm">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'block rounded-xl px-3 py-2 text-slate-400 transition hover:bg-slate-900 hover:text-white',
                                    url.startsWith(item.href) && 'bg-slate-900 text-white',
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1">
                    <header className="border-b border-slate-800/70 bg-slate-950/70 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-lg font-semibold">{title ?? 'Dashboard'}</h1>
                                <p className="text-xs text-slate-400">Manage your portfolio content.</p>
                            </div>
                            <Link
                                href="/admin/logout"
                                method="post"
                                as="button"
                                className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-900"
                            >
                                Sign out
                            </Link>
                        </div>
                    </header>
                    <main className="p-6">{children}</main>
                </div>
            </div>
            <Toaster richColors />
            <FlashToaster />
        </div>
    );
}

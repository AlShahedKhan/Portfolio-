import { cn } from '@/lib/utils';

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export function Card({ children, className }: CardProps) {
    return (
        <div className={cn('rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-lg', className)}>
            {children}
        </div>
    );
}

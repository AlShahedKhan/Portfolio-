import { cn } from '@/lib/utils';

type BadgeProps = {
    children: React.ReactNode;
    className?: string;
};

export function Badge({ children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-200',
                className,
            )}
        >
            {children}
        </span>
    );
}

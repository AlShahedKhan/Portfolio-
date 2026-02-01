import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const buttonVariants = {
    primary: 'bg-slate-100 text-slate-900 hover:bg-white',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
    outline: 'border border-slate-700 text-slate-100 hover:bg-slate-900',
    ghost: 'text-slate-100 hover:bg-slate-900',
    danger: 'bg-rose-500 text-white hover:bg-rose-400',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof buttonVariants;
    asChild?: boolean;
};

export function Button({ className, variant = 'primary', asChild = false, ...props }: ButtonProps) {
    const Component = asChild ? Slot : 'button';

    return (
        <Component
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
                buttonVariants[variant],
                className,
            )}
            {...props}
        />
    );
}

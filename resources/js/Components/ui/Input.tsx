import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={cn(
                'h-11 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 text-sm text-slate-100',
                'placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400',
                className,
            )}
            {...props}
        />
    ),
);

Input.displayName = 'Input';

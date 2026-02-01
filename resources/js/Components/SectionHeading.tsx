type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    subtitle?: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
    return (
        <div className="space-y-3">
            {eyebrow ? <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p> : null}
            <h2 className="text-3xl font-semibold text-slate-50 md:text-4xl">{title}</h2>
            {subtitle ? <p className="max-w-2xl text-slate-400">{subtitle}</p> : null}
        </div>
    );
}

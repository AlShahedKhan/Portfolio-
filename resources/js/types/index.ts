export type Profile = {
    id: number;
    name: string;
    title: string;
    tagline?: string | null;
    bio?: string | null;
    location?: string | null;
    email?: string | null;
    phone?: string | null;
    resume_url?: string | null;
    socials_json?: Record<string, string> | null;
    meta_json?: Record<string, string> | null;
};

export type Project = {
    id: number;
    title: string;
    slug: string;
    summary?: string | null;
    description?: string | null;
    role?: string | null;
    tech_stack: string[];
    live_url?: string | null;
    github_url?: string | null;
    is_featured: boolean;
    sort_order?: number;
    cover_url?: string | null;
    gallery?: string[];
};

export type Skill = {
    id: number;
    name: string;
    category: string;
    icon?: string | null;
    level?: string | null;
    sort_order: number;
};

export type Experience = {
    id: number;
    company: string;
    role: string;
    start_date: string;
    end_date?: string | null;
    location?: string | null;
    description?: string | null;
    sort_order?: number;
};

export type Education = {
    id: number;
    school: string;
    degree: string;
    year?: string | null;
    details?: string | null;
    sort_order?: number;
};

export type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content_markdown: string;
    status: 'draft' | 'published';
    published_at?: string | null;
    tags: string[];
    cover_url?: string | null;
};

export type Testimonial = {
    id: number;
    name: string;
    company?: string | null;
    quote: string;
    rating?: number | null;
    is_featured: boolean;
    avatar_url?: string | null;
};

export type ContactMessage = {
    id: number;
    name: string;
    email: string;
    subject?: string | null;
    message: string;
    status: 'new' | 'read' | 'archived';
    created_at?: string;
};

export type Setting = {
    id: number;
    key: string;
    value_json: Record<string, string | number | boolean> | null;
};

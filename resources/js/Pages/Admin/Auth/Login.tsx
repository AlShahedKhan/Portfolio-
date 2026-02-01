import { Head, useForm } from '@inertiajs/react';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';
import type { FormEvent } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Head title="Admin Login" />
            <div className="flex min-h-screen items-center justify-center px-6">
                <Card className="w-full max-w-md space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-white">Admin access</h1>
                        <p className="text-sm text-slate-400">Sign in to manage the portfolio.</p>
                    </div>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Input
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                placeholder="Email"
                            />
                            {errors.email ? <p className="mt-1 text-xs text-rose-400">{errors.email}</p> : null}
                        </div>
                        <div>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                                placeholder="Password"
                            />
                            {errors.password ? <p className="mt-1 text-xs text-rose-400">{errors.password}</p> : null}
                        </div>
                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}

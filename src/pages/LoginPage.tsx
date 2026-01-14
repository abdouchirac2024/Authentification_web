import { Link } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const loginSchema = z.object({
    phone: z.string().min(8, 'Phone number is too short'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log('Login data:', data);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
    };

    return (
        <AuthLayout
            title="Connection"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames consequat eros, diam, eu morbi vehicula."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                    {...register('phone')}
                    label="Phone"
                    placeholder="Enter your phone"
                    icon={<Phone size={18} />}
                    error={errors.phone?.message}
                />

                <div className="space-y-1">
                    <Input
                        {...register('password')}
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        icon={<Lock size={18} />}
                        error={errors.password?.message}
                    />
                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-white/40 hover:text-white/60 text-xs transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button type="submit" isLoading={isSubmitting} className="mt-4">
                    Login
                </Button>

                <p className="text-center text-sm text-white/40">
                    Don't have account?{' '}
                    <Link
                        to="/register"
                        className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

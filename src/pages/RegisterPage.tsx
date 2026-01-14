import { Link } from 'react-router-dom';
import { User, Phone, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const registerSchema = z.object({
    name: z.string().min(2, 'Name is too short'),
    surname: z.string().min(2, 'Surname is too short'),
    phone: z.string().min(8, 'Phone number is too short'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        console.log('Register data:', data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
    };

    return (
        <AuthLayout
            title="Registration"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames consequat eros, diam, eu morbi vehicula."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        {...register('name')}
                        placeholder="Name"
                        icon={<User size={18} />}
                        error={errors.name?.message}
                    />
                    <Input
                        {...register('surname')}
                        placeholder="Surname"
                        icon={<User size={18} />}
                        error={errors.surname?.message}
                    />
                </div>

                <Input
                    {...register('phone')}
                    placeholder="Phone"
                    icon={<Phone size={18} />}
                    error={errors.phone?.message}
                />

                <Input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    icon={<Lock size={18} />}
                    error={errors.password?.message}
                />

                <Input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="Confirm password"
                    icon={<Lock size={18} />}
                    error={errors.confirmPassword?.message}
                />

                <Button type="submit" isLoading={isSubmitting} className="mt-4">
                    Sign In
                </Button>

                <p className="text-center text-sm text-white/40">
                    Have account?{' '}
                    <Link
                        to="/login"
                        className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
                    >
                        Connect
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

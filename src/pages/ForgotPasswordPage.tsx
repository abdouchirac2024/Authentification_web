import { Link } from 'react-router-dom';
import { Phone, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const forgotPasswordSchema = z.object({
    phone: z.string().min(8, 'Phone number is too short'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        console.log('Forgot password data:', data);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
    };

    return (
        <AuthLayout
            title="Forgot Password"
            description="Enter your phone number and we'll send you a link to reset your password."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    {...register('phone')}
                    label="Phone"
                    placeholder="Enter your phone"
                    icon={<Phone size={18} />}
                    error={errors.phone?.message}
                />

                <Button type="submit" isLoading={isSubmitting}>
                    Send Reset Link
                </Button>

                <div className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

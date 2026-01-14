import { motion } from 'framer-motion';
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Input
                        {...register('phone')}
                        label="Phone"
                        placeholder="Enter your phone"
                        icon={<Phone size={18} />}
                        error={errors.phone?.message}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="space-y-1"
                >
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
                            className="text-white/20 hover:text-white/40 text-[11px] font-bold uppercase tracking-wider transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    <Button type="submit" isLoading={isSubmitting} className="mt-4">
                        Login
                    </Button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center text-sm text-white/20"
                >
                    Don't have account?{' '}
                    <Link
                        to="/register"
                        className="text-brand-primary hover:text-brand-secondary font-bold transition-colors"
                    >
                        Register
                    </Link>
                </motion.p>
            </form>
        </AuthLayout>
    );
};

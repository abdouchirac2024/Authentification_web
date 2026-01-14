import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const loginSchema = z.object({
    phone: z.string().min(8, 'Le numéro de téléphone est trop court'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
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
            title="Bienvenue"
            description="Connectez-vous à votre compte pour accéder à toutes les fonctionnalités"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <Input
                        {...register('phone')}
                        label="Téléphone"
                        placeholder="Entrez votre numéro"
                        icon={<Phone size={18} />}
                        error={errors.phone?.message}
                        isNumeric
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="space-y-2"
                >
                    <Input
                        {...register('password')}
                        type="password"
                        label="Mot de passe"
                        placeholder="Entrez votre mot de passe"
                        icon={<Lock size={18} />}
                        error={errors.password?.message}
                        showPasswordToggle
                    />
                    <div className="flex justify-end pt-1">
                        <Link
                            to="/forgot-password"
                            className="text-white/40 hover:text-brand-primary text-xs font-semibold transition-colors duration-200 group inline-flex items-center gap-1"
                        >
                            Mot de passe oublié ?
                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="pt-2"
                >
                    <Button type="submit" isLoading={isSubmitting}>
                        Se connecter
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="relative py-4"
                >
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/[0.08]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-brand-dark px-4 text-white/30 font-medium">OU</span>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="text-center text-sm text-white/40"
                >
                    Vous n'avez pas de compte ?{' '}
                    <Link
                        to="/register"
                        className="text-brand-primary hover:text-brand-secondary font-bold transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                        Créer un compte
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.p>
            </form>
        </AuthLayout>
    );
};

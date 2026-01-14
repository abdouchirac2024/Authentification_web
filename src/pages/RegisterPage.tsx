import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Phone, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const registerSchema = z.object({
    name: z.string().min(2, 'Le nom est trop court'),
    surname: z.string().min(2, 'Le prénom est trop court'),
    phone: z.string().min(8, 'Le numéro de téléphone est trop court'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const password = watch('password');

    // Calculate password strength
    const calculatePasswordStrength = (pwd: string) => {
        if (!pwd) return 0;
        let strength = 0;
        if (pwd.length >= 6) strength++;
        if (pwd.length >= 10) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/\d/.test(pwd)) strength++;
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
        return Math.min(strength, 4);
    };

    const strength = calculatePasswordStrength(password);
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];

    const onSubmit = async (data: RegisterFormValues) => {
        console.log('Register data:', data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
    };

    return (
        <AuthLayout
            title="Créer un compte"
            description="Rejoignez-nous et profitez de toutes nos fonctionnalités"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="grid grid-cols-2 gap-3"
                >
                    <Input
                        {...register('name')}
                        label="Nom"
                        placeholder="Nom"
                        icon={<User size={18} />}
                        error={errors.name?.message}
                    />
                    <Input
                        {...register('surname')}
                        label="Prénom"
                        placeholder="Prénom"
                        icon={<User size={18} />}
                        error={errors.surname?.message}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    <Input
                        {...register('phone')}
                        label="Téléphone"
                        placeholder="Numéro de téléphone"
                        icon={<Phone size={18} />}
                        error={errors.phone?.message}
                        isNumeric
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="space-y-2"
                >
                    <Input
                        {...register('password')}
                        type="password"
                        label="Mot de passe"
                        placeholder="Créer un mot de passe"
                        icon={<Lock size={18} />}
                        error={errors.password?.message}
                        showPasswordToggle
                    />
                    {password && password.length > 0 && (
                        <div className="space-y-2 px-1">
                            <div className="flex gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                            i < strength ? strengthColors[strength] : 'bg-white/10'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-white/40 font-medium">
                                Force : <span className={strength >= 3 ? 'text-green-400' : 'text-orange-400'}>{strengthLabels[strength]}</span>
                            </p>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                >
                    <Input
                        {...register('confirmPassword')}
                        type="password"
                        label="Confirmation"
                        placeholder="Confirmer le mot de passe"
                        icon={<Lock size={18} />}
                        error={errors.confirmPassword?.message}
                        showPasswordToggle
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="pt-2"
                >
                    <Button type="submit" isLoading={isSubmitting}>
                        Créer mon compte
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
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
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="text-center text-sm text-white/40"
                >
                    Vous avez déjà un compte ?{' '}
                    <Link
                        to="/login"
                        className="text-brand-primary hover:text-brand-secondary font-bold transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                        Se connecter
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.p>
            </form>
        </AuthLayout>
    );
};

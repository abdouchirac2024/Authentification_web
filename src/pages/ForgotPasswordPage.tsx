import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

const forgotPasswordSchema = z.object({
    phone: z.string().min(8, 'Le numéro de téléphone est trop court'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    
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
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <AuthLayout
                title="Email envoyé !"
                description="Vérifiez votre téléphone pour le lien de réinitialisation"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                        <Send className="w-10 h-10 text-green-400" />
                    </div>
                    
                    <p className="text-white/60 text-sm leading-relaxed">
                        Un lien de réinitialisation a été envoyé à votre numéro. 
                        Suivez les instructions pour créer un nouveau mot de passe.
                    </p>

                    <Link to="/login">
                        <Button variant="primary">
                            Retour à la connexion
                        </Button>
                    </Link>
                </motion.div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Mot de passe oublié ?"
            description="Entrez votre numéro de téléphone pour recevoir un lien de réinitialisation"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    className="space-y-3"
                >
                    <Button type="submit" isLoading={isSubmitting}>
                        Envoyer le lien
                    </Button>
                    
                    <Link to="/login" className="block">
                        <Button type="button" variant="ghost">
                            <ArrowLeft size={16} className="mr-2" />
                            Retour à la connexion
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4"
                >
                    <p className="text-xs text-white/40 leading-relaxed">
                        💡 <span className="font-semibold">Astuce :</span> Si vous ne recevez pas l'email, 
                        vérifiez votre dossier spam ou réessayez dans quelques minutes.
                    </p>
                </motion.div>
            </form>
        </AuthLayout>
    );
};

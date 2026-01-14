import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../components/ui/Logo';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, description }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6">
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-secondary/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[440px] px-2"
            >
                <div className="glass-card rounded-[24px] md:rounded-[32px] p-6 md:p-10">
                    <div className="mb-10">
                        <Logo />
                    </div>

                    <div className="space-y-2 mb-8">
                        <h1 className="text-3xl font-bold text-white">{title}</h1>
                        <p className="text-white/50 text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {children}

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-white/30 text-xs">
                            Powered by <span className="text-white/50 font-medium">xenone search</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

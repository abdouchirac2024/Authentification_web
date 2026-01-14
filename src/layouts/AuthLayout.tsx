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
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 blur-[120px] rounded-full animate-blob" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/20 blur-[120px] rounded-full animate-blob [animation-delay:2s]" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 blur-[100px] rounded-full animate-blob [animation-delay:4s]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[460px] z-10"
            >
                <div className="glass-card rounded-[40px] p-8 md:p-12">
                    <div className="mb-12 flex justify-center">
                        <Logo />
                    </div>

                    <div className="space-y-3 mb-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-4xl font-extrabold text-white tracking-tight"
                        >
                            {title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-white/40 text-sm leading-relaxed max-w-[300px] mx-auto"
                        >
                            {description}
                        </motion.p>
                    </div>

                    {children}

                    <div className="mt-12 pt-8 border-t border-white/[0.05] text-center">
                        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium">
                            Powered by <span className="text-white/40">xenone search</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

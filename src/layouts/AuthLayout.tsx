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

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[480px] z-10"
            >
                <div className="glass-card rounded-[32px] p-8 md:p-10 shadow-2xl">
                    <div className="mb-10 flex justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                        >
                            <Logo />
                        </motion.div>
                    </div>

                    <div className="space-y-2 mb-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                        >
                            {title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="text-white/50 text-sm leading-relaxed max-w-[320px] mx-auto"
                        >
                            {description}
                        </motion.p>
                    </div>

                    {children}

                    <div className="mt-10 pt-6 border-t border-white/[0.06] text-center">
                        <p className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold">
                            Powered by <span className="text-white/40 font-bold">xenone search</span>
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-6 flex justify-center gap-2"
                >
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-white/10"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

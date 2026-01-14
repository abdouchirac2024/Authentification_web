import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'lg', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-gradient-to-r from-brand-primary via-indigo-600 to-brand-secondary text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-[1.02] relative overflow-hidden group',
            secondary: 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] hover:border-white/[0.2]',
            outline: 'border-2 border-white/[0.15] hover:bg-white/[0.08] hover:border-brand-primary/50 text-white',
            ghost: 'hover:bg-white/[0.08] text-white/80 hover:text-white',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-5 py-3 text-base',
            lg: 'px-6 py-4 text-base',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'w-full flex items-center justify-center rounded-2xl font-bold tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {variant === 'primary' && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                )}
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Chargement...</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-[1.02]',
            secondary: 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.05]',
            outline: 'border border-white/[0.1] hover:bg-white/[0.05] text-white',
            ghost: 'hover:bg-white/[0.05] text-white',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'w-full flex items-center justify-center px-6 py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-brand-primary hover:bg-brand-secondary text-white shadow-lg shadow-brand-primary/20',
            secondary: 'bg-white/10 hover:bg-white/20 text-white',
            outline: 'border border-white/10 hover:bg-white/5 text-white',
            ghost: 'hover:bg-white/5 text-white',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
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

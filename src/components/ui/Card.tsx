import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'gradient';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', children, ...props }, ref) => {
        const variants = {
            default: 'bg-white/[0.03] border border-white/[0.08]',
            glass: 'glass-card',
            gradient: 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08]',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-2xl p-4 backdrop-blur-xl transition-all duration-300',
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

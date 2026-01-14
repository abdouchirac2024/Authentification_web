import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    isNumeric?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, isNumeric, ...props }, ref) => {
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isNumeric) {
                // Allow: Backspace, Delete, Tab, Escape, Enter
                if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            }
            if (props.onKeyDown) {
                props.onKeyDown(e);
            }
        };

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors duration-300">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        onKeyDown={handleKeyDown}
                        inputMode={isNumeric ? 'numeric' : props.inputMode}
                        pattern={isNumeric ? '[0-9]*' : props.pattern}
                        className={cn(
                            'w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:bg-white/[0.04] transition-all duration-300',
                            icon ? 'pl-12 pr-4' : 'px-4',
                            error && 'border-red-500/30 focus:ring-red-500/20',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-[11px] font-medium text-red-400/80 ml-1 animate-in fade-in slide-in-from-top-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    isNumeric?: boolean;
    showPasswordToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, isNumeric, showPasswordToggle, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);

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

        const inputType = type === 'password' && showPassword ? 'text' : type;

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/40 ml-1 block">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300",
                            isFocused ? "text-brand-primary scale-110" : "text-white/30"
                        )}>
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        inputMode={isNumeric ? 'numeric' : props.inputMode}
                        pattern={isNumeric ? '[0-9]*' : props.pattern}
                        className={cn(
                            'w-full bg-white/[0.03] border rounded-2xl py-4 text-white placeholder-white/20 focus:outline-none transition-all duration-300 font-medium',
                            icon ? 'pl-12' : 'pl-4',
                            showPasswordToggle && type === 'password' ? 'pr-12' : 'pr-4',
                            isFocused 
                                ? 'border-brand-primary/50 bg-white/[0.06] shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-2 ring-brand-primary/20' 
                                : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04]',
                            error && 'border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20',
                            className
                        )}
                        {...props}
                    />
                    {showPasswordToggle && type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-200 focus:outline-none"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
                {error && (
                    <p className="text-xs font-medium text-red-400 ml-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

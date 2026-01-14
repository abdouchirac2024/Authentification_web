import { LayoutGrid } from 'lucide-react';

export const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/30">
                <LayoutGrid className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
                Abdu<span className="text-brand-primary">Ngine</span>
            </span>
        </div>
    );
};

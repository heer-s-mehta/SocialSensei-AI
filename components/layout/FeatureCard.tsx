
import React, { ReactNode } from 'react';

interface FeatureCardProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, children, className = '' }) => {
    return (
        <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg ${className}`}>
            <div className="px-6 py-4 border-b border-gray-700 flex items-center gap-3">
                {icon}
                <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

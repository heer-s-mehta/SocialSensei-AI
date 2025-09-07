
import React from 'react';
import { LogoIcon } from '../ui/Icons';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-900/30 backdrop-blur-md sticky top-0 z-20 border-b border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <LogoIcon />
                        <h1 className="text-2xl font-bold text-white tracking-tight">SocialSense AI</h1>
                    </div>
                    <div>
                        <a href="https://github.com/google/genai-js" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};


import React from 'react';
import { ContentIdea } from '../../types';
import { BulbIcon } from './Icons';

interface ContentIdeaCardProps {
    idea: ContentIdea;
}

export const ContentIdeaCard: React.FC<ContentIdeaCardProps> = ({ idea }) => {
    return (
        <div className="h-full p-px bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg transform transition-transform hover:-translate-y-1">
            <div className="flex flex-col h-full bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className="bg-yellow-500/20 text-yellow-300 p-2 rounded-full">
                        <BulbIcon />
                    </span>
                    <h4 className="font-bold text-lg text-white">{idea.title}</h4>
                </div>
                <p className="text-gray-400 text-sm">
                    {idea.description}
                </p>
            </div>
        </div>
    );
};

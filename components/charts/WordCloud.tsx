
import React from 'react';
import { WordCloudItem } from '../../types';

interface WordCloudProps {
    data: WordCloudItem[];
}

const FONT_SIZES = ['text-sm', 'text-md', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
const COLORS = ['text-gray-300', 'text-gray-100', 'text-white', 'text-brand-secondary', 'text-brand-primary', 'text-indigo-400'];

export const WordCloud: React.FC<WordCloudProps> = ({ data }) => {
    const maxVal = Math.max(...data.map(d => d.value));

    const getDynamicStyle = (value: number) => {
        const ratio = value / maxVal;
        const sizeIndex = Math.min(Math.floor(ratio * FONT_SIZES.length), FONT_SIZES.length - 1);
        const colorIndex = Math.min(Math.floor(ratio * COLORS.length), COLORS.length - 1);

        return {
            fontSize: FONT_SIZES[sizeIndex],
            color: COLORS[colorIndex],
            fontWeight: ratio > 0.7 ? 'bold' : 'normal',
        };
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 p-4 h-full min-h-[250px]">
            {data.sort((a,b) => b.value - a.value).map((item, index) => {
                const ratio = item.value / maxVal;
                const sizeClass = FONT_SIZES[Math.min(Math.floor(ratio * FONT_SIZES.length), FONT_SIZES.length - 1)];
                const colorClass = COLORS[Math.min(Math.floor(ratio * COLORS.length), COLORS.length - 1)];

                return (
                    <span key={index} className={`${sizeClass} ${colorClass} font-semibold p-1 transition-all duration-300 hover:scale-110`}>
                        {item.text}
                    </span>
                );
            })}
        </div>
    );
};

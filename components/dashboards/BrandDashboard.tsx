
import React from 'react';
import { BrandData } from '../../types';
import { FeatureCard } from '../layout/FeatureCard';
import { SentimentChart } from '../charts/SentimentChart';
import { WordCloud } from '../charts/WordCloud';
import { PostCard } from '../ui/PostCard';
import { ThumbsUpIcon, ThumbsDownIcon, SparklesIcon, MessageIcon } from '../ui/Icons';

interface BrandDashboardProps {
    data: BrandData;
    brandName: string;
}

export const BrandDashboard: React.FC<BrandDashboardProps> = ({ data, brandName }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-center">Brand Sentiment Analysis for <span className="text-brand-primary">{brandName}</span></h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <FeatureCard title="Sentiment Breakdown" icon={<SparklesIcon />} className="lg:col-span-1">
                    <SentimentChart data={data.sentiment} />
                </FeatureCard>
                <FeatureCard title="Word Cloud" icon={<MessageIcon />} className="lg:col-span-2">
                   <WordCloud data={data.wordCloud} />
                </FeatureCard>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureCard title="Top Positive Themes" icon={<ThumbsUpIcon />}>
                    <ul className="space-y-2">
                        {data.topThemes.positive.map((theme, index) => (
                            <li key={index} className="flex items-center gap-2 text-green-400">
                                <span className="bg-green-500/10 p-1 rounded-full"><ThumbsUpIcon small /></span>
                                {theme}
                            </li>
                        ))}
                    </ul>
                </FeatureCard>
                <FeatureCard title="Top Negative Themes" icon={<ThumbsDownIcon />}>
                    <ul className="space-y-2">
                        {data.topThemes.negative.map((theme, index) => (
                             <li key={index} className="flex items-center gap-2 text-red-400">
                                <span className="bg-red-500/10 p-1 rounded-full"><ThumbsDownIcon small /></span>
                                {theme}
                            </li>
                        ))}
                    </ul>
                </FeatureCard>
            </div>
            
            <FeatureCard title="Sample Social Media Posts" icon={<MessageIcon />}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.samplePosts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </div>
            </FeatureCard>
        </div>
    );
};

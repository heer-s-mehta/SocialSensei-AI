
import React from 'react';
import { YouTubeData } from '../../types';
import { FeatureCard } from '../layout/FeatureCard';
import { SentimentChart } from '../charts/SentimentChart';
import { ContentIdeaCard } from '../ui/ContentIdeaCard';
import { SparklesIcon, QuestionIcon, TrendIcon } from '../ui/Icons';


interface YoutubeDashboardProps {
    data: YouTubeData;
    videoUrl: string;
}

export const YoutubeDashboard: React.FC<YoutubeDashboardProps> = ({ data, videoUrl }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-center">YouTube Comment Analysis</h2>
            <p className="text-center text-gray-400 break-all">{videoUrl}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard title="Sentiment Breakdown" icon={<SparklesIcon />}>
                    <SentimentChart data={data.sentiment} />
                </FeatureCard>

                <FeatureCard title="Trending Topics" icon={<TrendIcon />}>
                    <ul className="space-y-2">
                        {data.trendingTopics.map((topic, index) => (
                            <li key={index} className="bg-gray-700/50 rounded-md px-3 py-2 text-sm">{topic}</li>
                        ))}
                    </ul>
                </FeatureCard>

                <FeatureCard title="Common Questions" icon={<QuestionIcon />}>
                    <ul className="space-y-2">
                        {data.commonQuestions.map((question, index) => (
                            <li key={index} className="bg-gray-700/50 rounded-md px-3 py-2 text-sm">"{question}"</li>
                        ))}
                    </ul>
                </FeatureCard>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-center mb-6">AI-Generated Content Ideas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.contentIdeas.map((idea, index) => (
                        <ContentIdeaCard key={index} idea={idea} />
                    ))}
                </div>
            </div>
        </div>
    );
};

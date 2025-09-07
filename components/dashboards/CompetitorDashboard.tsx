
import React from 'react';
import { CompetitorData } from '../../types';
import { FeatureCard } from '../layout/FeatureCard';
import { CompetitorChart } from '../charts/CompetitorChart';
import { PostCard } from '../ui/PostCard';
import { CompetitorIcon, MessageIcon } from '../ui/Icons';


interface CompetitorDashboardProps {
    data: CompetitorData;
}

export const CompetitorDashboard: React.FC<CompetitorDashboardProps> = ({ data }) => {
    const brandName = data.comparison[0]?.name || 'Your Brand';
    const competitorName = data.comparison[1]?.name || 'Competitor';
    
    return (
        <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-center">Competitor Analysis: <span className="text-brand-primary">{brandName}</span> vs <span className="text-brand-secondary">{competitorName}</span></h2>
            
            <FeatureCard title="Metrics Comparison" icon={<CompetitorIcon />}>
                <CompetitorChart data={data.comparison} />
            </FeatureCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FeatureCard title={`Top Post for ${brandName}`} icon={<MessageIcon />}>
                    {data.topPosts.brand.length > 0 ? (
                        <PostCard post={data.topPosts.brand[0]} />
                    ) : (
                        <p className="text-gray-400">No post data available.</p>
                    )}
                </FeatureCard>
                <FeatureCard title={`Top Post for ${competitorName}`} icon={<MessageIcon />}>
                     {data.topPosts.competitor.length > 0 ? (
                        <PostCard post={data.topPosts.competitor[0]} />
                    ) : (
                        <p className="text-gray-400">No post data available.</p>
                    )}
                </FeatureCard>
            </div>
        </div>
    );
};


import React from 'react';
import { SocialMediaPost } from '../../types';
import { ThumbsUpIcon, ThumbsDownIcon, NeutralIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from './Icons';

interface PostCardProps {
    post: SocialMediaPost;
}

const sentimentConfig = {
    Positive: {
        icon: <ThumbsUpIcon small />,
        borderColor: 'border-positive',
        textColor: 'text-positive',
        bgColor: 'bg-positive/10'
    },
    Negative: {
        icon: <ThumbsDownIcon small />,
        borderColor: 'border-negative',
        textColor: 'text-negative',
        bgColor: 'bg-negative/10'
    },
    Neutral: {
        icon: <NeutralIcon small />,
        borderColor: 'border-neutral',
        textColor: 'text-neutral',
        bgColor: 'bg-neutral/10'
    },
};

const platformIcons: { [key: string]: React.ReactNode } = {
    'Twitter': <TwitterIcon />,
    'YouTube': <YoutubeIcon />,
    'Instagram': <InstagramIcon />,
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const config = sentimentConfig[post.sentiment] || sentimentConfig.Neutral;

    return (
        <div className={`flex flex-col h-full ${config.bgColor} border-l-4 ${config.borderColor} rounded-lg p-4 transition-all duration-300 hover:shadow-xl hover:scale-105`}>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {platformIcons[post.platform] || null}
                    <span className="font-bold text-white text-sm">{post.username}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${config.textColor}`}>
                    {config.icon}
                    <span>{post.sentiment}</span>
                </div>
            </div>
            <p className="text-gray-300 text-sm flex-grow">
                "{post.content}"
            </p>
        </div>
    );
};

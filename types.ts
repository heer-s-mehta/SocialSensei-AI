
export enum AnalysisType {
    BRAND = 'BRAND',
    YOUTUBE = 'YOUTUBE',
    COMPETITOR = 'COMPETITOR',
}

export interface Sentiment {
    positive: number;
    negative: number;
    neutral: number;
}

export interface WordCloudItem {
    text: string;
    value: number;
}

export interface SocialMediaPost {
    platform: string;
    username: string;
    content: string;
    sentiment: 'Positive' | 'Negative' | 'Neutral';
}

export interface BrandData {
    type: AnalysisType.BRAND;
    sentiment: Sentiment;
    wordCloud: WordCloudItem[];
    topThemes: {
        positive: string[];
        negative: string[];
    };
    samplePosts: SocialMediaPost[];
}

export interface ContentIdea {
    title: string;
    description: string;
}

export interface YouTubeData {
    type: AnalysisType.YOUTUBE;
    sentiment: Sentiment;
    trendingTopics: string[];
    commonQuestions: string[];
    contentIdeas: ContentIdea[];
}

export interface CompetitorMetric {
    name: string;
    engagementRate: number;
    postingFrequency: number;
    positiveSentiment: number;
}

export interface CompetitorData {
    type: AnalysisType.COMPETITOR;
    comparison: CompetitorMetric[];
    topPosts: {
        brand: SocialMediaPost[];
        competitor: SocialMediaPost[];
    };
}

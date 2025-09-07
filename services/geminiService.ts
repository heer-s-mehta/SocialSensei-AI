
import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisType, BrandData, YouTubeData, CompetitorData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonResponse = <T,>(text: string): T => {
    try {
        // The response may be wrapped in markdown JSON block
        const jsonString = text.replace(/^```json\n/, '').replace(/\n```$/, '');
        return JSON.parse(jsonString) as T;
    } catch (e) {
        console.error("Failed to parse JSON response:", text);
        throw new Error("AI returned an invalid response format.");
    }
};

export async function generateBrandSentiment(brandName: string): Promise<BrandData> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the social media sentiment for the brand "${brandName}". Provide a detailed analysis including sentiment breakdown (positive, negative, neutral percentages), a word cloud of frequent terms, top positive and negative themes, and 5 sample posts from various platforms (Twitter, YouTube, Instagram).`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    sentiment: {
                        type: Type.OBJECT,
                        properties: {
                            positive: { type: Type.NUMBER, description: "Percentage of positive sentiment, e.g., 65" },
                            negative: { type: Type.NUMBER, description: "Percentage of negative sentiment, e.g., 25" },
                            neutral: { type: Type.NUMBER, description: "Percentage of neutral sentiment, e.g., 10" },
                        },
                        required: ["positive", "negative", "neutral"],
                    },
                    wordCloud: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                text: { type: Type.STRING, description: "A word or phrase" },
                                value: { type: Type.NUMBER, description: "Frequency or importance score, e.g., 88" },
                            },
                            required: ["text", "value"],
                        },
                    },
                    topThemes: {
                        type: Type.OBJECT,
                        properties: {
                            positive: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of top 3-5 positive themes" },
                            negative: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of top 3-5 negative themes" },
                        },
                        required: ["positive", "negative"],
                    },
                    samplePosts: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                platform: { type: Type.STRING, description: "e.g., 'Twitter', 'YouTube'" },
                                username: { type: Type.STRING, description: "e.g., '@user123'" },
                                content: { type: Type.STRING },
                                sentiment: { type: Type.STRING, enum: ["Positive", "Negative", "Neutral"] },
                            },
                            required: ["platform", "username", "content", "sentiment"],
                        },
                    },
                },
                required: ["sentiment", "wordCloud", "topThemes", "samplePosts"],
            },
        },
    });

    const parsedData = parseJsonResponse<Omit<BrandData, 'type'>>(response.text);
    return { ...parsedData, type: AnalysisType.BRAND };
}

export async function generateYouTubeAnalysis(videoUrl: string): Promise<YouTubeData> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the comments section of a YouTube video (pretend the URL is ${videoUrl}). Provide a sentiment breakdown, list trending topics, common questions, and suggest 3 new, creative content ideas based on the feedback.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    sentiment: {
                        type: Type.OBJECT,
                        properties: {
                            positive: { type: Type.NUMBER },
                            negative: { type: Type.NUMBER },
                            neutral: { type: Type.NUMBER },
                        },
                        required: ["positive", "negative", "neutral"],
                    },
                    trendingTopics: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "Top 3-5 topics discussed in comments."
                    },
                    commonQuestions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "Most frequently asked questions."
                    },
                    contentIdeas: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING, description: "A catchy video title." },
                                description: { type: Type.STRING, description: "A brief description of the video idea." },
                            },
                             required: ["title", "description"],
                        },
                    },
                },
                required: ["sentiment", "trendingTopics", "commonQuestions", "contentIdeas"],
            },
        },
    });
    const parsedData = parseJsonResponse<Omit<YouTubeData, 'type'>>(response.text);
    return { ...parsedData, type: AnalysisType.YOUTUBE };
}

export async function generateCompetitorAnalysis(brand1: string, brand2: string): Promise<CompetitorData> {
     const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide a competitive analysis of two brands on social media: "${brand1}" and "${brand2}". Compare them on key metrics: engagement rate (%), posting frequency (posts/week), and positive sentiment (%). Also, provide one top-performing post for each brand.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    comparison: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Brand name" },
                                engagementRate: { type: Type.NUMBER, description: "e.g., 3.5" },
                                postingFrequency: { type: Type.NUMBER, description: "e.g., 5" },
                                positiveSentiment: { type: Type.NUMBER, description: "e.g., 75" },
                            },
                             required: ["name", "engagementRate", "postingFrequency", "positiveSentiment"],
                        },
                    },
                    topPosts: {
                        type: Type.OBJECT,
                        properties: {
                            brand: {
                                type: Type.ARRAY, items: {
                                    type: Type.OBJECT,
                                    properties: { platform: { type: Type.STRING }, username: { type: Type.STRING }, content: { type: Type.STRING }, sentiment: { type: Type.STRING } }
                                }
                            },
                            competitor: {
                                type: Type.ARRAY, items: {
                                    type: Type.OBJECT,
                                    properties: { platform: { type: Type.STRING }, username: { type: Type.STRING }, content: { type: Type.STRING }, sentiment: { type: Type.STRING } }
                                }
                            }
                        },
                         required: ["brand", "competitor"],
                    },
                },
                 required: ["comparison", "topPosts"],
            },
        },
    });

    const parsedData = parseJsonResponse<Omit<CompetitorData, 'type'>>(response.text);
    return { ...parsedData, type: AnalysisType.COMPETITOR };
}


import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisType, BrandData, YouTubeData, CompetitorData } from './types';
import { generateBrandSentiment, generateYouTubeAnalysis, generateCompetitorAnalysis } from './services/geminiService';
import { Header } from './components/layout/Header';
import { Loader } from './components/ui/Loader';
import { BrandDashboard } from './components/dashboards/BrandDashboard';
import { YoutubeDashboard } from './components/dashboards/YoutubeDashboard';
import { CompetitorDashboard } from './components/dashboards/CompetitorDashboard';
import { SearchIcon, BrandIcon, YoutubeIcon, CompetitorIcon } from './components/ui/Icons';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AnalysisType>(AnalysisType.BRAND);
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<BrandData | YouTubeData | CompetitorData | null>(null);
    const [analysisTopic, setAnalysisTopic] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input1) {
            setError('Please provide a topic or link to analyze.');
            return;
        }
        if (activeTab === AnalysisType.COMPETITOR && !input2) {
            setError('Please provide a competitor to compare.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            let result;
            let topic = input1;
            if (activeTab === AnalysisType.BRAND) {
                result = await generateBrandSentiment(input1);
            } else if (activeTab === AnalysisType.YOUTUBE) {
                result = await generateYouTubeAnalysis(input1);
            } else if (activeTab === AnalysisType.COMPETITOR) {
                topic = `${input1} vs ${input2}`;
                result = await generateCompetitorAnalysis(input1, input2);
            }
            setData(result);
            setAnalysisTopic(topic);
        } catch (err) {
            console.error(err);
            setError('Failed to get analysis from AI. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderDashboard = () => {
        if (isLoading) return <div className="flex justify-center items-center py-20"><Loader /></div>;
        if (error) return <div className="text-center py-10 text-red-400 bg-red-900/20 rounded-lg">{error}</div>;
        if (!data) return (
            <div className="text-center py-20 text-gray-400">
                <h2 className="text-2xl font-bold mb-2">Welcome to SocialSense AI</h2>
                <p>Select an analysis type and enter a topic to begin.</p>
            </div>
        );

        switch (data.type) {
            case AnalysisType.BRAND:
                return <BrandDashboard data={data as BrandData} brandName={analysisTopic} />;
            case AnalysisType.YOUTUBE:
                return <YoutubeDashboard data={data as YouTubeData} videoUrl={analysisTopic} />;
            case AnalysisType.COMPETITOR:
                return <CompetitorDashboard data={data as CompetitorData} />;
            default:
                return null;
        }
    };

    const renderInputFields = () => {
        if (activeTab === AnalysisType.COMPETITOR) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                        placeholder="Your Brand Handle (e.g., @Nike)"
                        className="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <input
                        type="text"
                        value={input2}
                        onChange={(e) => setInput2(e.target.value)}
                        placeholder="Competitor Handle (e.g., @Adidas)"
                        className="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                </div>
            );
        }
        return (
             <input
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                placeholder={
                    activeTab === AnalysisType.BRAND
                        ? "Enter a brand, product, or topic (e.g., Starlight Coffee)"
                        : "Paste a YouTube video URL"
                }
                className="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
        );
    }
    
    const tabs = [
        { type: AnalysisType.BRAND, label: 'Brand Sentiment', icon: <BrandIcon /> },
        { type: AnalysisType.YOUTUBE, label: 'YouTube Analyzer', icon: <YoutubeIcon /> },
        { type: AnalysisType.COMPETITOR, label: 'Competitor Scanner', icon: <CompetitorIcon /> },
    ];

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200 font-sans">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8 shadow-2xl">
                        <div className="flex border-b border-gray-700 mb-6">
                             {tabs.map(tab => (
                                <button
                                    key={tab.type}
                                    onClick={() => { setActiveTab(tab.type); setData(null); setInput1(''); setInput2(''); setError(null);}}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 ${activeTab === tab.type ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                           {renderInputFields()}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader small={true}/>
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <SearchIcon />
                                        <span>Analyze Now</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8">
                        {renderDashboard()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;

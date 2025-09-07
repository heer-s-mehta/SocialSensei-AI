
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CompetitorMetric } from '../../types';

interface CompetitorChartProps {
    data: CompetitorMetric[];
}

export const CompetitorChart: React.FC<CompetitorChartProps> = ({ data }) => {
    const chartData = [
        {
            name: 'Engagement Rate (%)',
            [data[0]?.name]: data[0]?.engagementRate,
            [data[1]?.name]: data[1]?.engagementRate,
        },
        {
            name: 'Posting Frequency (p/w)',
            [data[0]?.name]: data[0]?.postingFrequency,
            [data[1]?.name]: data[1]?.postingFrequency,
        },
        {
            name: 'Positive Sentiment (%)',
            [data[0]?.name]: data[0]?.positiveSentiment,
            [data[1]?.name]: data[1]?.positiveSentiment,
        },
    ];

    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                    <XAxis dataKey="name" stroke="#a0aec0" />
                    <YAxis stroke="#a0aec0" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937', // gray-800
                            borderColor: '#4b5563', // gray-600
                        }}
                    />
                    <Legend />
                    <Bar dataKey={data[0]?.name} fill="#4F46E5" />
                    <Bar dataKey={data[1]?.name} fill="#7C3AED" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

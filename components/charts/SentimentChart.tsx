
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Sentiment } from '../../types';

interface SentimentChartProps {
    data: Sentiment;
}

const COLORS = {
    positive: '#22C55E', // green-500
    negative: '#EF4444', // red-500
    neutral: '#6B7280',  // gray-500
};

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
    const chartData = [
        { name: 'Positive', value: data.positive },
        { name: 'Negative', value: data.negative },
        { name: 'Neutral', value: data.neutral },
    ];
    
    const chartColors = [COLORS.positive, COLORS.negative, COLORS.neutral];

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937', // gray-800
                            borderColor: '#4b5563', // gray-600
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

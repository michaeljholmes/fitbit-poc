import React, { useState, useEffect } from 'react';

interface StepData {
    user: string;
    cheatingSteps: number;
    competitionSteps: number;
    totalSteps: number;
}

export const DemoPage: React.FC = () => {
    const [stepsData, setStepsData] = useState<StepData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.stridewars.com/api/users/steps');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: StepData[] = await response.json();
                setStepsData(data);
            } catch (error) {
                console.error('Fetching error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>User Steps Data</h1>
            <table>
                <thead>
                    <tr>
                        <th style={{ padding: '10px' }}>User</th>
                        <th style={{ padding: '10px' }}>Competition Steps</th>
                        <th style={{ padding: '10px' }}>Cheating Steps</th>
                        <th style={{ padding: '10px' }}>Total Steps</th>
                    </tr>
                </thead>
                <tbody>
                    {stepsData.map((item, index) => (
                        <tr key={index}>
                            <td style={{ padding: '10px' }}>{item.user}</td>
                            <td style={{ padding: '10px' }}>{item.competitionSteps}</td>
                            <td style={{ padding: '10px' }}>{item.cheatingSteps}</td>
                            <td style={{ padding: '10px' }}>{item.totalSteps}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


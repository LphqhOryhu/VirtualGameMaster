'use client';
import { useEffect, useState } from 'react';

interface History {
    history: string[];
}

export default function HistoryPanel() {
    const [history, setHistory] = useState<History | null>(null);

    const fetchHistory = async () => {
        const res = await fetch('http://localhost:3005/api/history');
        const data = await res.json();
        setHistory(data);
    };

    const clearHistory = async () => {
        await fetch('http://localhost:3005/api/history', {
            method: 'DELETE'
        });
        await fetchHistory();
    };


    useEffect(() => {
        fetchHistory(); // premier chargement
        const interval = setInterval(fetchHistory, 1000); // refresh toutes les 1s
        return () => clearInterval(interval);
    }, []);

    if (!history) return <div>Chargement de l’histoire...</div>;

    return (
        <div className="h-full overflow-y-auto p-4 bg-white text-gray-800 rounded-lg shadow">
            <button
                onClick={clearHistory}
                className="mb-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
                🧹 Vider l’historique
            </button>

            <h3 className="text-lg font-bold mb-2">📜 Histoire</h3>
            <ul className="space-y-2 text-sm">
                {history.history.map((line, i) => (
                    <li key={i} className="border-b pb-1">{line}</li>
                ))}
            </ul>
        </div>
    );
}

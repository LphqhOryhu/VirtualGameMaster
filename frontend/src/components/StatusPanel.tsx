'use client';
import { useEffect, useState } from 'react';

interface Status {
    name: string;
    health: number;
    mana: number;
    xp: number;
}

export default function StatusPanel() {
    const [status, setStatus] = useState<Status | null>(null);

    useEffect(() => {
        fetch('http://localhost:3005/api/status')
            .then(res => res.json())
            .then(data => setStatus(data));
    }, []);

    if (!status) return <div>Chargement...</div>;

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg shadow w-64">
            <h2 className="text-xl font-bold mb-2">{status.name}</h2>
            <p>❤️ Santé : {status.health}</p>
            <p>🔮 Mana : {status.mana}</p>
            <p>⭐ XP : {status.xp}</p>
        </div>
    );
}

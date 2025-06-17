'use client';
import { useEffect, useRef, useState } from 'react';

interface ChatEntry {
    sender: 'player' | 'ia';
    text: string;
}

export default function ChatPanel() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = async () => {
        if (!message.trim()) return;

        // Ajoute le message du joueur
        setChatHistory(prev => [...prev, { sender: 'player', text: message }]);

        const res = await fetch('http://localhost:3005/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        const aiReply = data.reply;

        // Ajoute la réponse de l'IA
        setChatHistory(prev => [...prev, { sender: 'ia', text: aiReply }]);

        // Envoie à l’historique
        await fetch('http://localhost:3005/api/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: aiReply })
        });

        setMessage('');
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <div className="flex flex-col h-full">
            {/* Zone scrollable */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg mb-4 space-y-3">
                {chatHistory.map((entry, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded max-w-[80%] ${entry.sender === 'player' ? 'bg-blue-100 self-end text-right' : 'bg-white text-left'}`}
                    >
                        <p className="text-sm text-gray-800 whitespace-pre-line">{entry.text}</p>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Champ de saisie */}
            <div className="flex gap-2">
                <input
                    className="flex-1 p-2 border rounded text-black"
                    placeholder="Tape ton choix (1, 2 ou 3)..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}

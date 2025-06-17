'use client';
import { useEffect, useState } from 'react';

interface Inventory {
    items: string[];
}

export default function InventoryPanel() {
    const [inventory, setInventory] = useState<Inventory | null>(null);

    useEffect(() => {
        fetch('http://localhost:3005/api/inventory')
            .then(res => res.json())
            .then(data => setInventory(data));
    }, []);

    if (!inventory) return <div>Chargement de l'inventaire...</div>;

    return (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">🎒 Inventaire</h3>
            <ul className="list-disc pl-5">
                {inventory.items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

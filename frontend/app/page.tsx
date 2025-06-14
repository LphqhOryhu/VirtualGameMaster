'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/')
        .then((res) => res.text())
        .then((data) => setMessage(data))
        .catch((err) => console.error('Erreur:', err));
  }, []);

  return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">Front + Back test</h1>
        <p className="mt-4 text-xl">Réponse du backend : {message}</p>
      </main>
  );
}

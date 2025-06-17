const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.generateSummary = async (req, res) => {
    try {
        // Charger l'historique via l'API
        const historyRes = await axios.get('http://localhost:3005/api/history');
        const history = historyRes.data;

        const prompt = `
Voici l'historique des derniers événements dans un jeu de rôle fantasy :
${history.history.slice(-10).join('\n')}

Fais un résumé narratif immersif, en une dizaine de lignes maximum, comme un narrateur.
Ne reformule pas chaque ligne. Raconte la scène comme un résumé.
`;

        const result = await axios.post('http://localhost:11434/api/generate', {
            model: 'mistral', // Utiliser le même modèle que l'AI service
            prompt,
            stream: false
        });

        const summary = result.data.response;

        fs.writeFileSync(path.join(__dirname, 'context.json'), JSON.stringify({ summary }, null, 2));
        res.json({ summary });
    } catch (err) {
        console.error('Erreur lors du résumé :', err.message);
        res.status(500).json({ error: 'Erreur IA lors du résumé.' });
    }
};
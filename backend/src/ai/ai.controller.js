const axios = require('axios');

exports.askAi = async (req, res) => {
    const { message } = req.body;

    try {
        // === 1. Charger les données via les API ===
        const [statusRes, inventoryRes, historyRes, campaignRes, charactersRes] = await Promise.all([
            axios.get('http://localhost:3005/api/status'),
            axios.get('http://localhost:3005/api/inventory'),
            axios.get('http://localhost:3005/api/history'),
            axios.get('http://localhost:3005/api/campaign'),
            axios.get('http://localhost:3005/api/characters')
        ]);

        const status = statusRes.data;
        const inventory = inventoryRes.data;
        const history = historyRes.data;
        const campaign = campaignRes.data;
        const characters = charactersRes.data;

        // === 2. Générer le résumé narratif via le service context ===
        const contextRes = await axios.post('http://localhost:3005/api/context/generate');
        const summary = contextRes.data.summary;

        // === 3. Préparer le prompt pour Mistral ===
        // Formater l'historique pour alterner clairement entre IA et Joueur
        let formattedHistory = '';
        for (let i = 0; i < history.history.length; i += 2) {
            if (i + 1 < history.history.length) {
                formattedHistory += `IA: ${history.history[i]}\n`;
                formattedHistory += `Joueur: ${history.history[i + 1]}\n\n`;
            } else {
                formattedHistory += `IA: ${history.history[i]}\n`;
            }
        }

        const context = `
Tu es le maître du jeu d'un RPG fantasy **structuré et persistant**.

Le joueur **choisit uniquement 1, 2 ou 3** parmi les options que tu lui proposes.

Ta mission :
- Continuer l'histoire à partir du **résumé narratif**.
- Intégrer les personnages, quêtes et objets existants.
- Proposer **exactement 3 choix numérotés** (formatés : [1] ..., [2] ..., [3] ...).

---

🎯 État du joueur :
- Nom : ${status.name}
- PV : ${status.health}
- Mana : ${status.mana}
- XP : ${status.xp}

💒 Inventaire :
${inventory.items.map(item => `- ${item}`).join('\n')}

📜 Contexte de la campagne :
- Titre : ${campaign.title}
- Acte : ${campaign.acte}
- Objectif principal : ${campaign.objectif_principal}
- Étapes accomplies : ${campaign.étapes_accomplies.join(', ') || "Aucune"}
- État du monde :
${Object.entries(campaign.état_monde).map(([k, v]) => `• ${k} : ${v}`).join('\n')}

👥 Personnages rencontrés :
${Object.entries(characters).map(([name, char]) => `- ${char.nom} : ${char.description} (${char.relation})`).join('\n')}

📖 Historique récent :
${formattedHistory}

Voici le résumé de la campagne :

${summary}

Le joueur vient de choisir : "${message}"

Tu dois faire avancer l'histoire de manière cohérente. Ne répète pas l'étape précédente. Fais évoluer la situation logiquement. Termine toujours ta réponse par 3 choix numérotés.

Raconte la suite de manière immersive et propose 3 choix clairs pour la suite.
`;

        // === 4. Envoyer le prompt à Mistral ===
        const result = await axios.post('http://localhost:11434/api/generate', {
            model: 'mistral',
            prompt: context,
            stream: false
        });

        const reply = result.data.response;
        
        // === 5. Mettre à jour l'historique ===
        await axios.post('http://localhost:3005/api/history', {
            message,
            reply
        });
        
        res.json({ reply });
    } catch (err) {
        console.error('Erreur IA locale :', err.message);
        res.status(500).json({ error: 'Erreur IA avec Mistral' });
    }
};
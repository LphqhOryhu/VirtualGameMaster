const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'history.json');

exports.getHistory = (req, res) => {
    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
};

exports.addHistoryEntry = (req, res) => {
    const { message, reply } = req.body;

    if (!message || !reply) {
        return res.status(400).json({ error: "Le message et la réponse de l'IA sont requis" });
    }

    const data = JSON.parse(fs.readFileSync(filePath));
    data.history.push(message);
    data.history.push(reply);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ message: "Message et réponse ajoutés à l'historique" });
};

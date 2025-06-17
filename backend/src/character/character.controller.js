const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'characters.json');

exports.getCharacters = (req, res) => {
    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
};

exports.updateCharacters = (req, res) => {
    const newData = req.body;
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    res.json({ message: "Personnages mis à jour." });
};

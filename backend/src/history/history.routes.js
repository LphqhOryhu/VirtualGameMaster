const express = require('express');
const router = express.Router();
const controller = require('./history.controller');
const path = require('path');
const fs = require('fs');


router.get('/', controller.getHistory);
router.post('/', controller.addHistoryEntry);



router.delete('/', (req, res) => {
    const filePath = path.join(__dirname, 'history.json');
    const newContent = { playerId: "hugo", history: [] };
    fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));
    res.json({ message: "Historique vidé" });
});

module.exports = router;
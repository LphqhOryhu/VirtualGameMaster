const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'campaign.json');

exports.getCampaign = (req, res) => {
    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
};

exports.updateCampaign = (req, res) => {
    const newData = req.body;
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    res.json({ message: "Campagne mise à jour." });
};

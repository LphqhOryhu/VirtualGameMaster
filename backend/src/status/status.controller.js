const fs = require('fs');
const path = require('path');
const statusPath = path.join(__dirname, 'playerStatus.json');

exports.getStatus = (req, res) => {
    const data = fs.readFileSync(statusPath);
    res.json(JSON.parse(data));
};

exports.updateStatus = (req, res) => {
    const newStatus = req.body;
    fs.writeFileSync(statusPath, JSON.stringify(newStatus, null, 2));
    res.json({ message: "Status updated" });
};

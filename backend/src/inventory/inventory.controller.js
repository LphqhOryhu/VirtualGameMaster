const fs = require('fs');
const path = require('path');
const inventoryPath = path.join(__dirname, 'inventory.json');

exports.getInventory = (req, res) => {
    const data = fs.readFileSync(inventoryPath);
    res.json(JSON.parse(data));
};

exports.updateInventory = (req, res) => {
    const newInventory = req.body;
    fs.writeFileSync(inventoryPath, JSON.stringify(newInventory, null, 2));
    res.json({ message: "Inventory updated" });
};

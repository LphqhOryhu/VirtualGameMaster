const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(require('cors')());

app.get('/', (req, res) => res.send('API is running'));
app.listen(PORT, () => console.log(`Server on port ${PORT}`));

const statusRoutes = require('./status/status.routes');
app.use('/api/status', statusRoutes);

const inventoryRoutes = require('./inventory/inventory.routes');
app.use('/api/inventory', inventoryRoutes);

const historyRoutes = require('./history/history.routes');
app.use('/api/history', historyRoutes);


const aiRoutes = require('./ai/ai.routes');
app.use('/api/ai', aiRoutes);

const contextRoutes = require('./context/context.routes');
app.use('/api/context', contextRoutes);

const campaignRoutes = require('./campaign/campaign.routes');
app.use('/api/campaign', campaignRoutes);

const characterRoutes = require('./character/character.routes');
app.use('/api/characters', characterRoutes);
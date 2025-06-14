const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(require('cors')());

app.get('/', (req, res) => res.send('API is running'));
app.listen(PORT, () => console.log(`Server on port ${PORT}`));

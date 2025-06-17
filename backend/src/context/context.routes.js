const express = require('express');
const router = express.Router();
const controller = require('./context.controller');

router.post('/generate', controller.generateSummary);

module.exports = router;

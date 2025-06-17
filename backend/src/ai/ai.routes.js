const express = require('express');
const router = express.Router();
const controller = require('./ai.controller');

router.post('/', controller.askAi);

module.exports = router;

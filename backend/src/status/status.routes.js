const express = require('express');
const router = express.Router();
const controller = require('./status.controller');

router.get('/', controller.getStatus);
router.post('/', controller.updateStatus);

module.exports = router;

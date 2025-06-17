const express = require('express');
const router = express.Router();
const controller = require('./inventory.controller');

router.get('/', controller.getInventory);
router.post('/', controller.updateInventory);

module.exports = router;

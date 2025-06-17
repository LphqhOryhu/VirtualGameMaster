const express = require('express');
const router = express.Router();
const controller = require('./character.controller');

router.get('/', controller.getCharacters);
router.post('/', controller.updateCharacters);

module.exports = router;

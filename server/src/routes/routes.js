const express = require('express');
const router = express.Router();
const promptController = require('../controllers/prompt-controller');
const { validatePrompt } = require('../middlewares/validatePrompt');

router.post('/api/prompt', validatePrompt, promptController.sendText);

module.exports = router;
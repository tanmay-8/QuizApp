// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { submitAnswer,getQuestions } = require('../controllers/quizController');
const auth = require('../middleware/authMiddleware');

router.post('/submit', auth, submitAnswer);
router.get('/questions', auth, getQuestions);

module.exports = router;

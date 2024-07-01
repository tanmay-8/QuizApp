// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getUser,getLeaderboard } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/user', auth, getUser);
router.get("/getLeaderboard",auth,getLeaderboard)

module.exports = router;

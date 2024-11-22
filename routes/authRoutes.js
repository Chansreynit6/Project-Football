const express = require('express');
const { registerUser, loginUser,getAllUsers } = require('../Controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all-user',getAllUsers);

module.exports = router;

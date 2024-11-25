const express = require('express');
const { registerUser, loginUser,getAllUsers,getUserByid,deleteUser,updateUser } = require('../Controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all-user',getAllUsers);
router.get('/user/:id',getUserByid);
router.delete('/user-delete/:id',deleteUser);
router.put('/update-user/:id',updateUser);
module.exports = router;

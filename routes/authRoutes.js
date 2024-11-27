const express = require('express');
const { registerUser, loginUser,getAllUsers,getUserByid,deleteUser,updateUser } = require('../Controllers/authController');
const {protect,adminOnly}=require('../Modelware/authmodelware')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all-user',protect,adminOnly,getAllUsers);
router.get('/user/:id',getUserByid);
router.delete('/user-delete/:id',protect,adminOnly,deleteUser);
router.put('/update-user/:id',protect,adminOnly,updateUser);
module.exports = router;

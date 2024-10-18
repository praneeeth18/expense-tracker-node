const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, handleLogin } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/login', handleLogin);

module.exports = router;
const express = require('express');
const router = express.Router();
const { loginAdmin, changePassword } = require('../controller/AdminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/login', loginAdmin);

// Protected routes
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;

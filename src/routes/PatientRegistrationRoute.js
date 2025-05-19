// routes/opdRoutes.js
const express = require('express');
const router = express.Router();
const { registerOpd } = require('../controller/PatientRegistrationController');

router.post('/opd-register', registerOpd);

module.exports = router;

// routes/opdRoutes.js
const express = require('express');
const router = express.Router();
const { registerOpd, getRegisteredPatients } = require('../controller/PatientRegistrationController');

router.post('/opd-register', registerOpd);
router.get('/registered-patients', getRegisteredPatients)

module.exports = router;

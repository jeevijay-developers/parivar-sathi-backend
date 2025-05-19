const express = require('express');
const router = express.Router();
const { ClinicPartnershipRegister } = require('../controller/ClinicPartnerController');
const clinicBrochureUpload = require('../middlewares/clinicBrochureUpload');

router.post('/clinic-register', clinicBrochureUpload, ClinicPartnershipRegister);

module.exports = router;
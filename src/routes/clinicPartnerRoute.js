const express = require('express');
const router = express.Router();
const { ClinicPartnershipRegister, getRegisteredClinics } = require('../controller/ClinicPartnerController');
const clinicBrochureUpload = require('../middlewares/clinicBrochureUpload');

router.post('/clinic-register', clinicBrochureUpload, ClinicPartnershipRegister);
router.get('/registered-clinics', getRegisteredClinics);

module.exports = router;
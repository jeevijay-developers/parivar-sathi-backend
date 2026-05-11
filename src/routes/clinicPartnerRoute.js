const express = require('express');
const router = express.Router();
const { ClinicPartnershipRegister, getRegisteredClinics, editClinic, deleteClinic } = require('../controller/ClinicPartnerController');
const clinicBrochureUpload = require('../middlewares/clinicBrochureUpload');

router.post('/clinic-register', clinicBrochureUpload, ClinicPartnershipRegister);
router.get('/registered-clinics', getRegisteredClinics);
router.put('/clinic/:clinicId', clinicBrochureUpload, editClinic);
router.delete('/clinic/:clinicId', deleteClinic);

module.exports = router;
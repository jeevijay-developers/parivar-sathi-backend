const express = require('express')
const router = express.Router();
const {getConsultReq, sendConsultReq} = require('../controller/ConsultController.js');

router.get('/get-consults', getConsultReq);

router.post('/send-consult', sendConsultReq);

module.exports = router;
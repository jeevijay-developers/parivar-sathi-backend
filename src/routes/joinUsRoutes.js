const { getJoinUsForms, getJoinUsForm, addJoinUsForm, deleteJoinUsForm } = require('../controller/JoinUsController');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getJoinUsForms);
router.get('/:id', getJoinUsForm);
router.post('/', upload.single('resume'), addJoinUsForm);
router.delete('/:id', deleteJoinUsForm);

module.exports = router;

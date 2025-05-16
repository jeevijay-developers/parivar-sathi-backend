const express = require("express");
const router = express.Router();
const {getAllPreviousOPDCamps, getNextFourOPDCamps, getMostUpcomingOPDCamp, addNextOPDCamps, getFourPreviousOPDCamps, getAllTodaysOPDCamps, getNextOPDCamps} = require("../controller/OpdController");
const opdCampUpload = require("../middlewares/opdCampUpload");

router.post("/add-opd", opdCampUpload, addNextOPDCamps);
router.get("/opdcamps/next", getNextOPDCamps);
router.get("/opdcampsfour", getNextFourOPDCamps);
router.get("/todays-opdcamps", getAllTodaysOPDCamps);
router.get("/opdcamps/upnext", getMostUpcomingOPDCamp);
router.get("/opdcamps/previous-four", getFourPreviousOPDCamps);
router.get("/opdcamps/previous-all", getAllPreviousOPDCamps);

module.exports = router;

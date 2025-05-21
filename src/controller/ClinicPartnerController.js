const ClinicPartnership = require('../modals/ClinicPartner');
const { uploadToCloudinary } = require('../configure/cloudinary');

const ClinicPartnershipRegister = async (req, res) => {
  try {
    // Validate file type
    if (req.file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          message: 'Invalid file type. Only JPG, JPEG and PNG files are allowed'
        });
      }
    }

    const {
      clinicName,
      clinicAddress,
      country,
      clinicPhone,
      clinicEmail,
      clinicWebsite,
      contactName,
      contactPosition,
      contactPhone,
      contactEmail,
      services,
      interests,
      clinicDescription,
      consent
    } = req.body;

    // Get the brochure file URL from the middleware
    const brochureFile = req.file ? req.file.filename : null;

    const newSubmission = new ClinicPartnership({
      clinicName,
      clinicAddress,
      country,
      clinicPhone,
      clinicEmail,
      clinicWebsite,
      contactName,
      contactPosition,
      contactPhone,
      contactEmail,
      services,
      interests,
      clinicDescription,
      brochureFile,
      consent
    });

    await newSubmission.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      data: newSubmission
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({
      message: 'Server error while submitting the form',
      error: error.message
    });
  }
};

const getRegisteredClinics = async (req, res) => {
  try{
    const registeredClinics = await ClinicPartnership.find();
    return res.status(200).json(registeredClinics);
  }catch(err){
    return res.status(500).json({ message: 'Unable to find registered clinics' });
  }
}

module.exports = {ClinicPartnershipRegister, getRegisteredClinics};

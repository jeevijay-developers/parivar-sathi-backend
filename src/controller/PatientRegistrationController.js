const OpdRegistration = require('../modals/PatientRegistration');

// @desc    Handle OPD registration form submission
// @route   POST /api/opd-register
// @access  Public
const registerOpd = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      age,
      phoneNumber,
      email,
      city,
      state,
      department,
      primaryConcern,
      symptoms,
      preExistingConditions,
      consent
    } = req.body;

    // Basic server-side validation
    if (
      !fullName || !gender || !age || !phoneNumber ||
      !city || !state || !department || !primaryConcern || !consent
    ) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // Create new OPD registration document
    const registration = new OpdRegistration({
      fullName,
      gender,
      age,
      phoneNumber,
      email,
      city,
      state,
      department,
      primaryConcern,
      symptoms,
      preExistingConditions,
      consent
    });

    await registration.save();

    res.status(201).json({ message: 'Registration successful', data: registration });
  } catch (error) {
    console.error('OPD Registration Error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {registerOpd}
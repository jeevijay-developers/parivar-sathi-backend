const mongoose = require('mongoose');

const opdRegistrationSchema = new mongoose.Schema({
  // Personal Info
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },

  // Medical Info
  department: { type: String, required: true },
  primaryConcern: { type: String, required: true },
  symptoms: { type: String },

  // Pre-existing Conditions
  preExistingConditions: {
    diabetes: { type: Boolean, default: false },
    hypertension: { type: Boolean, default: false },
    heartDisease: { type: Boolean, default: false },
    asthma: { type: Boolean, default: false },
    thyroid: { type: Boolean, default: false },
    other: { type: Boolean, default: false },
    otherText: { type: String }
  },

  // Consent
  consent: { type: Boolean, required: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OpdRegistration', opdRegistrationSchema);

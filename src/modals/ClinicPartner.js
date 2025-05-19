const mongoose = require('mongoose');

const clinicPartnershipSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    required: true,
  },
  clinicAddress: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    enum: [
      "India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka",
      "Afghanistan", "Bhutan", "Maldives", "Other"
    ],
  },
  clinicPhone: {
    type: String,
    required: true,
  },
  clinicEmail: {
    type: String,
    required: true,
  },
  clinicWebsite: {
    type: String,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactPosition: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  services: {
    generalPractice: { type: Boolean, default: false },
    pediatrics: { type: Boolean, default: false },
    gynecology: { type: Boolean, default: false },
    cardiology: { type: Boolean, default: false },
    dermatology: { type: Boolean, default: false },
    diagnostics: { type: Boolean, default: false },
    telemedicine: { type: Boolean, default: false },
    other: { type: Boolean, default: false },
    otherText: { type: String },
  },
  interests: {
    marketing: { type: Boolean, default: false },
    opdSupport: { type: Boolean, default: false },
    callCenter: { type: Boolean, default: false },
    clinicManagement: { type: Boolean, default: false },
    other: { type: Boolean, default: false },
    otherText: { type: String },
  },
  clinicDescription: {
    type: String,
  },
  brochureFile: {
    type: String, // only jpg, png, jpeg
  },
  consent: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('ClinicPartnership', clinicPartnershipSchema);

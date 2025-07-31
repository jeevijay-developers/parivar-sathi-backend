const mongoose = require('mongoose');

const JoinUsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  cityState: { type: String, required: true },
  preferredRole: { 
    type: String, 
    enum: [
      'Fertility Counselor', 
      'Doctor (IVF/Gynae)', 
      'OPD Camp Coordinator', 
      'Patient Support/Telecaller', 
      'Other'
    ],
    required: true
  },
  otherRole: { type: String }, // if 'Other' is selected
  currentOccupation: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  preferredWorkMode: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Remote/Teleconsult', 'On-call'] 
  },
  resume: { type: String }, // store file path or URL
  linkedInOrWebsite: { type: String },
  reasonForJoining: { type: String, required: true },
  anythingElse: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('JoinUs', JoinUsSchema);
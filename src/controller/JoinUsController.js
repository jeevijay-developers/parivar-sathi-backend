const fs = require('fs');
const path = require('path');
const JoinUs = require('../modals/JoinUs');
const { uploadToCloudinary } = require('../configure/cloudinary');

// Get all Join Us forms
const getJoinUsForms = async (req, res) => {
  try {
    const forms = await JoinUs.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
};

// Get a single Join Us form by ID
const getJoinUsForm = async (req, res) => {
  try {
    const form = await JoinUs.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch form' });
  }
};

// Add a new Join Us form
const addJoinUsForm = async (req, res) => {
  try {
    let resumeUrl = '';
    if (req.file) {
      // Upload resume to Cloudinary
      const uploadResult = await uploadToCloudinary(req.file, 'joinus-resumes');
      resumeUrl = uploadResult.url;

      // Delete the file from /uploads after uploading to Cloudinary
      const filePath = path.join(__dirname, '../..', 'uploads', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete local resume file:', err.message);
        }
      });
    }

    const formData = {
      ...req.body,
      resume: resumeUrl
    };

    const newForm = new JoinUs(formData);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit form', error: err.message });
  }
};

// Delete a Join Us form by ID
const deleteJoinUsForm = async (req, res) => {
  try {
    const deleted = await JoinUs.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Form not found' });
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete form' });
  }
};

module.exports = {
  getJoinUsForms,
  getJoinUsForm,
  addJoinUsForm,
  deleteJoinUsForm
};
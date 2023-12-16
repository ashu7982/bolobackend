

const mongoose = require('mongoose');

// Subschema for Professional Experience
const ProfessionalExperienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  techStack: { type: String, required: true },
  skillsUsed: [{ type: String, required: true }],
  timePeriod: { type: String, required: true }
});

// Subschema for Educational Experience
const EducationalExperienceSchema = new mongoose.Schema({
  degreeName: { type: String, required: true },
  schoolName: { type: String, required: true },
  timePeriod: { type: String, required: true }
});

// Main Developer Schema
const DeveloperSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: [{ type: String, required: true }], // Assuming skills are predefined and selected from a list
  professionalExperiences: [ProfessionalExperienceSchema],
  educationalExperiences: [EducationalExperienceSchema]
});


const DeveloperModel = mongoose.model('Developer', DeveloperSchema);

module.exports ={ DeveloperModel};

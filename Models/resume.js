import mongoose, { Schema, model } from "mongoose";

const ExperienceSchema = new Schema(
  {
    title: { type: String, trim: true },
    company: { type: String, trim: true },
    address: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    summary: { type: String },
  },
  { _id: false } // Prevents subdocument _id
);

const EducationSchema = new Schema(
  {
    name: { type: String, trim: true },
    address: { type: String, trim: true },
    qualification: { type: String, trim: true },
    year: { type: String, trim: true },
  },
  { _id: false }
);

const SkillSchema = new Schema(
  {
    name: { type: String, trim: true },
    level: { type: String, trim: true },
  },
  { _id: false }
);

const ResumeSchema = new Schema(
  {
    userEmail: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    name: { type: String, trim: true },
    job: { type: String, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    themeColor: { type: String, trim: true },
    summary: { type: String },
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillSchema],
  },
  { timestamps: true }
);

const Resume = mongoose.models.Resume || model("Resume", ResumeSchema);

export default Resume;

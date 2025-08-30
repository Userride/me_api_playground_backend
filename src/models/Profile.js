import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  field: String,
  startYear: Number,
  endYear: Number
}, {_id:false});

const WorkSchema = new mongoose.Schema({
  company: String,
  role: String,
  start: String,
  end: String,
  description: String
}, {_id:false});

const SkillSchema = new mongoose.Schema({
  name: { type: String, index: true },
  level: { type: String, enum: ["beginner", "intermediate", "advanced", "expert"], default: "intermediate" }
}, {_id:false});

const LinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  portfolio: String
}, {_id:false});

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  summary: String,
  education: [EducationSchema],
  work: [WorkSchema],
  skills: [SkillSchema],
  links: LinksSchema
}, { timestamps: true });

export default mongoose.model("Profile", ProfileSchema);

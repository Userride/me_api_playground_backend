import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, index: "text" },
  description: { type: String, index: "text" },
  skills: [{ type: String, index: true }],
  links: {
    demo: String,
    repo: String
  }
}, { timestamps: true });

ProjectSchema.index({ title: "text", description: "text" });

export default mongoose.model("Project", ProjectSchema);

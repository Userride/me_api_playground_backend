import dotenv from "dotenv";
import { connectDB } from "../db.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";

dotenv.config();

async function run() {
  await connectDB(process.env.MONGODB_URI);

  await Profile.deleteMany({});
  await Project.deleteMany({});

  const profile = await Profile.create({
    name: "Prince Kumar",
    email: "singhprince131074@gmail.com",
    summary: "Aspiring Backend Developer (MERN) focused on building clean, reliable APIs.",
    education: [
      { school: "IIIT Kalyani", degree: "B.Tech", field: "CSE", startYear: 2022, endYear: 2026 }
    ],
    work: [
      { company: "PaediPrime", role: "Backend Developer", start: "2024", end: "2025",
        description: "Built REST APIs, authentication, file storage, and notifications." }
    ],
    skills: [
      { name: "Node.js", level: "expert" },
      { name: "Express.js", level: "advanced" },
      { name: "MongoDB", level: "advanced" },
      { name: "React", level: "intermediate" },
      { name: "JavaScript", level: "expert" }
    ],
    links: {
      github: "https://github.com/Userride",
      linkedin: "https://www.linkedin.com/in/prince-singh-891a1b279/",
      portfolio: "https://princekumarportfolio.vercel.app/"
    }
  });

  await Project.insertMany([
    {
      title: "PaediPrime",
      description: "Pediatric clinic automation platform: bookings, checkups, and patient management.",
      skills: ["Node.js", "Express.js", "MongoDB", "React.Js", "Cloudinary", "js"],
      links: { demo: "https://www.paediprime.tech/", repo: "https://github.com/Userride/padi" }
    },
    {
      title: "EatFit",
      description: "Food ordering MERN app with cart, orders, and nearby search.",
      skills: ["React", "Node.js", "Express.js", "MongoDB"],
      links: { demo: "https://eat-fit-flame.vercel.app", repo: "https://github.com/Userride/Food_App" }
    },
    {
      title: "Library Management System",
      description: "Full-stack LMS with roles, issuing/return, and reminders via Twilio.",
      skills: ["Node.js", "Express.js", "MongoDB", "React"],
      links: { demo: "https://lib-frontend-umber.vercel.app/", repo: "https://github.com/Userride/Library-Management" }
    },
    {
      title: "Emergency Vehicle Detection",
      description: "AI-powered system to detect emergency vehicles and improve traffic management.",
      skills: ["Python", "Streamlit", "Deep Learning", "Computer Vision"],
      links: { demo: "https://majorprojectcse-3rdyear.streamlit.app/", repo: "https://github.com/Userride/Emergency-vehicle-detection" }
    }
  ]);

  console.log("✅ Seeded database with sample data.");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

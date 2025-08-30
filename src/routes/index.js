import { Router } from "express";
import { Auth, getProfile, upsertProfile, listProjects, createProject, updateProject, getTopSkills, searchAll } from "../controllers/index.js";

const router = Router();

// Profile
router.get("/profile", getProfile);
router.post("/profile", Auth.requireBasicAuth, upsertProfile);
router.put("/profile", Auth.requireBasicAuth, upsertProfile);

// Projects
router.get("/projects", listProjects);
router.post("/projects", Auth.requireBasicAuth, createProject);
router.put("/projects/:id", Auth.requireBasicAuth, updateProject);

// Queries
router.get("/skills/top", getTopSkills);
router.get("/search", searchAll);

export default router;

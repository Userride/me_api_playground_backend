import Profile from "../models/Profile.js";
import Project from "../models/Project.js";

/** Basic-auth helper (optional nice-to-have) */
function requireBasicAuth(req, res, next) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;
  if (!user || !pass) return next();
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Basic" || !token) return res.status(401).json({ error: "Auth required" });
  const [u, p] = Buffer.from(token, "base64").toString().split(":");
  if (u === user && p === pass) return next();
  return res.status(401).json({ error: "Invalid credentials" });
}

export const Auth = { requireBasicAuth };

/** Profile CRUD */
export async function getProfile(req, res) {
  const profile = await Profile.findOne();
  res.json(profile || null);
}

export async function upsertProfile(req, res) {
  const data = req.body;
  const existing = await Profile.findOne();
  const profile = existing ? Object.assign(existing, data) : new Profile(data);
  await profile.save();
  res.status(existing ? 200 : 201).json(profile);
}

/** Projects CRUD + queries */
export async function listProjects(req, res) {
  const { skill, q, limit = 50 } = req.query;
  const filter = {};

  // Full-text search with regex (works without Mongo text index)
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];
  }

  // Skill filter with regex
  if (skill) {
    filter.skills = { $regex: skill, $options: "i" };
  }

  try {
    const items = await Project.find(filter).limit(Math.min(Number(limit) || 50, 100));
    res.json(items);
  } catch (err) {
    console.error("Error in listProjects:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createProject(req, res) {
  try {
    const p = new Project(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: "Invalid project data" });
  }
}

export async function updateProject(req, res) {
  const { id } = req.params;
  try {
    const p = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.json(p);
  } catch (err) {
    res.status(404).json({ error: "Project not found" });
  }
}

/** Skills aggregation */
export async function getTopSkills(req, res) {
  try {
    const agg = await Project.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    const projectSkills = agg.map(s => ({ name: s._id, count: s.count }));

    const profile = await Profile.findOne();
    const skillSet = new Map(projectSkills.map(s => [s.name, s.count]));
    (profile?.skills || []).forEach(s => {
      skillSet.set(s.name, (skillSet.get(s.name) || 0) + 1);
    });

    const result = Array.from(skillSet, ([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error fetching skills" });
  }
}

/** General search */
export async function searchAll(req, res) {
  const { q } = req.query;
  if (!q) return res.json({ projects: [], profile: null });

  try {
    const projects = await Project.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { skills: { $regex: q, $options: "i" } }
      ]
    });

    const profile = await Profile.findOne({
      $or: [
        { name: new RegExp(q, "i") },
        { email: new RegExp(q, "i") },
        { "skills.name": new RegExp(q, "i") }
      ]
    });

    res.json({ projects, profile });
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
}

# Me-API Playground (Track A: Backend Assessment)

A minimal MERN playground that stores my  own information in MongoDB and exposes it via an API + tiny React UI.

## Architecture
- **Backend**: Node.js + Express + Mongoose (MongoDB), with optional Basic Auth for write operations.
- **Database**: MongoDB (Atlas or local). See `.env`.
- **Frontend**: Vite + React. Consumes the API; lets you search by skill, list projects, and view your profile.
- **Hosting**: Backend on RENDER and frontend on VERCEL

## Quickstart (Local)
### 1) Server
```bash
cd server
npm install
npm run seed   # seeds my data in databse
npm run dev
# Health: GET http://localhost:5000/health  -> { status: "ok" }
```


### 2) Client
```bash
cd ../client
npm install
# point to your API:
echo 'VITE_API_URL=http://localhost:5000' > .env
npm run dev
# open http://localhost:5173
```
# Production Setup
Backend: Deploy on RENDER.
Env vars: MONGODB_URI, PORT, CORS_ORIGIN, BASIC_AUTH_USER, BASIC_AUTH_PASS

Frontend: Deploy on vercel.
Env var: VITE_API_URL=https://<me-api-playground-backend.onrender.com/>

# Deployment Links
# it deploy on free plateform so it takes somes times to load the data 
Backend: https://<me-api-playground-backend.onrender.com/>
Frontend: https://<me-api-playground-frontend-ogxm.vercel.app/> 

## Database Schema
- **Profile**: name, email, summary, education[], work[], skills[], links{ github, linkedin, portfolio }.
- **Projects**: title, description, skills[], links{ demo, repo }.

See `/server/src/models` and `/server/src/seed/seed.js` for example data using your real details.


## API Overview
- `GET /health` → liveness check. (https://<me-api-playground-backend.onrender.com/health>)
- `GET /profile` → read profile.  (https://<me-api-playground-backend.onrender.com/api/profile>)
- `POST /profile` (basic-auth) → create/update profile. 
- `PUT /profile` (basic-auth) → update/replace profile. 
- `GET /projects?skill=<name>&q=<search>&limit=50` → list projects with filters. 
- `POST /projects` (basic-auth) → create a project. 
- `PUT /projects/:id` (basic-auth) → update a project.  
- `GET /skills/top` → aggregated top skills across profile and projects.
- `GET /search?q=...` → search across projects and profile. 

**CORS** is enabled and controlled via `CORS_ORIGIN` in `.env`.



## Postman / curl
A Postman collection is included in `/postman/MeAPI.postman_collection.json`.
```bash
curl http://localhost:5000/projects?skill=Node.js
curl http://localhost:5000/search?q=React
```


## Known Limitations
* **No Authentication:** The `POST` and `PUT` endpoints are not protected by a robust authentication layer, relying only on basic auth for demonstration.
* **Basic Search:** The search functionality uses simple, case-insensitive regex matching. It does not support complex queries or full-text search indexing.
* **No Pagination:** Endpoints returning lists (like `/projects`) do not currently support pagination.



## Resume Link
https://drive.google.com/file/d/1PTd1lk5wet9J_cUShMCBnSayYuuq5u5p/view?usp=drivesdk

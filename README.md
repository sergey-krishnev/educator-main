# React + TypeScript + Vite
Frontend for Education Platform

🚀 Quick start

Node.js 18+ (check: node -v)

npm (or pnpm / yarn)

Install
git clone <your-repo-url> app && cd app
npm ci            # or: npm install

Environment

Create .env in the repo root (only VITE_ keys are exposed to the client):

VITE_API_URL=http://localhost:8000/api

Development
npm run dev
# open http://localhost:5173

Production build
npm run build     # outputs to dist/
npm run preview   # serve the built app locally

Common scripts (if present)
npm run lint
npm run test
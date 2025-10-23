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

Add some files to show AI avatar correctly
1) android_assistant.vrm into public/avatars/android_assistant.vrm. You can get it from https://vroid.com/en/studio
2) Idle.fbx and Waving.fbx into public/anims/ . You can get it from https://www.mixamo.com/#/?page=1&type=Motion%2CMotionPack

Development
npm run dev
# open http://localhost:5173

Production build
npm run build     # outputs to dist/
npm run preview   # serve the built app locally

Common scripts (if present)
npm run lint
npm run test

//TODO PLANS
1) Add unit tests
2) Refactor components
3) Add login via Google

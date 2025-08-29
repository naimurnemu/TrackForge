# 🚀 Progress Tracker

A full-stack **Next.js + Firebase** app to track your learning journey.  
Create sections → phases → topics → notes → summaries.  
Stay motivated with a daily quote + progress graph.

---

## ✨ Features
- 🔐 Google OAuth login (Firebase Auth + cookies)
- 📊 Dashboard with graph + daily motivational quote
- 📚 Progress tracker (Sections → Phases → Topics)
- 📝 Topic summaries & time tracking
- 📖 Summaries in book view
- 🗒 Notes per section/phase/topic

---

## 🛠 Tech Stack
- Next.js 13+ (App Router) + Tailwind + Shadcn UI  
- Firebase Auth + Firestore  
- React Context API (auth state)  
- Next.js API routes (server logic)  

---

## ⚡ Quickstart
```bash
git clone https://github.com/naimurnemu/TrackForge.git
cd trackforge
pnpm install         # or npm install
cp .env.example .env.local   # add Firebase keys
pnpm dev             # start dev server

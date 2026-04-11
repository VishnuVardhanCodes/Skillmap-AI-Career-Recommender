# SkillMap AI — Intelligent Career Path Recommender

**SkillMap AI** is a professional career assistant that helps students and professionals discover required skills, learning roadmaps, and project ideas tailored to their career goals.

![SkillMap AI Hero](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80) 

## 🚀 Key Features

- **AI-Powered Roadmaps**: Generate dynamic, high-fidelity career paths using LLMs (Groq/OpenAI).
- **Skill Discovery**: Visual skill cards with animated progress bars.
- **Visual Timelines**: Vertical roadmap UI with clear milestones.
- **Career Comparison**: Side-by-side analysis of different career paths (Salary, Difficulty, Duration).
- **Export to PDF**: Download your personalized roadmap for offline access.
- **Local Storage**: Save and reload your generated plans anytime.
- **Premium UI**: Modern dark theme with glassmorphism, gradients, and smooth animations.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide Icons, Axios.
- **Backend**: Python Flask, Groq API (Llama 3.1).
- **Deployment**: Render-ready configuration.

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd SkillMap-AI
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Create a .env file and add your GROQ_API_KEY
# GROQ_API_KEY=your_key_here
python app.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🎯 Usage
1. Enter a career goal (e.g., "Data Scientist").
2. Explore the generated dashboard: Skills, Timeline, Projects, and Tools.
3. Use the **Compare** feature to benchmark against other roles.
4. Click **Export** to save your roadmap as a PDF.
5. Save your plan to the **History** dashboard for later review.

## 📄 License
MIT

---
*Built with ❤️ by Antigravity AI*

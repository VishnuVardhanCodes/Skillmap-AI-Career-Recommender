# SkillMap AI — Intelligent Career Recommender 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask)](https://flask.palletsprojects.com/)
[![Groq](https://img.shields.io/badge/AI-Groq_Llama_3.3-orange)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**SkillMap AI** is a state-of-the-art career path architect that leverages Artificial Intelligence to generate precise, interactive, and personalized learning roadmaps. Designed for the modern learner, it transforms career ambiguity into a structured, actionable dossier of skills, projects, and resources.

---

## 💎 The SkillMap 2.0 Experience

SkillMap AI goes beyond simple lists. It provides a high-fidelity **"Command Center"** for your professional growth:

- **Quantum Mesh UI**: A premium, high-contrast dark theme featuring animated mesh gradients and grainy textures for a sophisticated "Tech Lab" aesthetic.
- **Dynamic Brand Logotypes**: Instant recognition of technologies via official brand icons integrated into every skill matrix and tool grid.
- **Interactive Deep-Dive Roadmap**: An expandable vertical timeline that breaks down broad milestones into granular, week-by-week sub-tasks.
- **AI-Driven Personalization**: Real-time recalibration of roadmap density based on your custom duration (4 to 24 weeks).
- **Market Intelligence**: Integrated salary projections, difficulty benchmarks, and curated resources (including W3Schools).
- **Portability**: One-click **PDF Export** and local saving for offline career tracking.

---

## 🛠️ Architecture & Tech Stack

SkillMap AI is built with a scalable, modular architecture:

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Tailwind CSS 4.0, Framer Motion (Animations), Lucide React (Icons) |
| **Backend** | Python Flask, Groq SDK |
| **AI Intelligence** | Llama 3.3 70B (via Groq for Sub-second Latency) |
| **Data Flow** | Axios, RESTful API Design |
| **Utilities** | jsPDF, html2canvas (Export Engine) |

---

## 📦 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- [Groq API Key](https://console.groq.com/)

### 1. Repository Setup
```bash
git clone https://github.com/VishnuVardhanCodes/Skillmap-AI-Career-Recommender.git
cd Skillmap-AI-Career-Recommender
```

### 2. Backend Configuration
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the `backend/` directory:
```env
GROQ_API_KEY=your_actual_key_here
```
Start the server:
```bash
python app.py
```

### 3. Frontend Configuration
```bash
cd frontend
npm install
npm run dev
```
The application will be live at `http://localhost:5173`.

---

## 🎯 Strategic Roadmap Usage

1. **Input Your Goal**: Specify a role (e.g., "Full Stack Engineer" or "Quantum Programmer").
2. **Define Timeline**: Select your desired learning duration (e.g., 12 weeks).
3. **Analyze & Expand**: Click on timeline milestones to reveal the detailed sub-tasks.
4. **Master the Tech**: Review the **Tech Stack Grid** to see the brand-specific tools required.
5. **Validate with Projects**: Build the AI-suggested projects to solidify your knowledge.
6. **Export & Conquer**: Download your dossier and start your journey.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Architected with Precision by [Vishnu Vardhan](https://github.com/VishnuVardhanCodes)*

# InnoBridge v2.0 — AI-Powered Student Innovation Platform

> **Where Campus Innovation Gets Discovered, Evaluated, and Scaled.**  
> InnoBridge is a modern, full-stack ecosystem bridging student builders, university faculty advisors, and enterprise recruiters/investors through multi-parameter AI scoring, an 11-stage IP progression pipeline, and role-based workspace portals.

---

## 🌟 Key Features

### 1. Multi-Parameter AI Evaluation Engine
- **5 Startup Metrics Benchmark**: Automatically scores submitted student projects across **Innovation**, **Feasibility**, **Impact & Market Demand**, **Technical Depth**, and **Scalability**.
- **Composite AI Score**: Generates a verified score (out of 10 or 100) alongside qualitative **AI Mentor Expert Commentary** and improvement recommendations.

### 2. 11-Stage IP Progression Pipeline
Structured progression tracking guiding projects through 11 core development phases:
1. `Idea Formulation` (Concept & Brainstorm)
2. `Problem Definition` (Need & Scope)
3. `Research & Analysis` (Market & Literature)
4. `Requirements & Planning` (PRD & Milestones)
5. `Architecture & Design` (System & UI/UX)
6. `PoC / Prototype` (Proof of Concept)
7. `MVP Development` (Core Engineering)
8. `Testing & Validation` (QA & User Tests)
9. `Pilot Deployment` (Field Sandbox)
10. `Final Product` (Production Ready)
11. `Launch → Scale → Maintain` (Market Scale & IP)

*Includes stage-gated Intellectual Property (IP) security controls protecting early-stage technical blueprints from public exposure.*

### 3. Role-Based Workspaces & Portals
- **Student Innovation Workspace**: Portfolio command center, submission tracking, multi-parameter AI breakdown modal, and project document drawer.
- **Faculty Evaluation Portal**: Academic review workspace allowing faculty advisors to audit student submissions, reference AI evaluation benchmarks, assign 1-5 star ratings, approve projects, or request technical changes.
- **Industry & Talent Scouting Hub**: Enterprise dashboard for corporate scouts and investors to filter top campus projects by domain, development stage, and minimum AI score cutoff, with one-click candidate shortlisting and interest logging.
- **Verified Innovator Profile**: Professional public portfolio showcasing student projects, university ranking, peak AI evaluation metrics, and IP-protected assets.

### 4. Interactive AI Personal Mentor Widget
- Persistent floating AI chatbot (`AIMentorWidget`) accessible across all pages.
- Context-aware guidance tailored for Students, Faculty, and Company scouts (e.g. MVP transition steps, AI score optimization, elevator pitch formulas, and faculty endorsement strategies).

### 5. University Innovation Leaderboard
- Real-time campus leaderboard ranking top student builders by their **Total Innovation Score**.
- Features flat Gold, Silver, and Bronze top-3 rank highlights (`Lucide Trophy/Medal/Award` icons) with domain and university filtering.

$$\text{Total Innovation Score} = (\text{Projects} \times 10) + (\text{AI Score} \times 5) + (\text{Faculty Rating} \times 15) + \text{Stage Bonus}$$

### 6. GitHub / Linear Visual Aesthetic & Theme Toggle
- Ultra-clean aesthetic using sharp **6px rounded corners (`rounded-md`)**, flat neutral slate surfaces, 1px subtle borders (`border-slate-800`), and GitHub topic tag styling.
- **Dark / Light Mode System**: Full Tailwind dark/light mode switching with smooth Sun/Moon icon toggle in the Navbar and `localStorage` persistence.
- **100% SVG Icon System**: Clean `lucide-react` icon system with zero emoji dependencies.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite 5, React Router DOM v6
- **Styling**: Tailwind CSS v3 (Custom color semantics, dark mode class strategy)
- **Icons**: Lucide React (`lucide-react`)
- **Backend & Database**: Cloud Supabase (PostgreSQL, Row Level Security, Auth) with fallback LocalStorage Demo Mode
- **AI Logic**: Multi-parameter score calculator (`lib/aiScoring.js`, `lib/scoreCalculator.js`)

---

## 📁 Directory Structure

```text
innobridge-v2/
├── index.html                  # HTML entry point with early dark mode script
├── tailwind.config.js          # Tailwind CSS theme extension & dark mode class config
├── vite.config.js              # Vite build configuration
├── package.json                # Dependencies & scripts
└── src/
    ├── main.jsx                # React root entry point with ThemeProvider & ErrorBoundary
    ├── App.jsx                 # Main application routes & Navbar layout
    ├── index.css               # Global typography, scrollbars, and Light/Dark CSS tokens
    ├── components/
    │   ├── Navbar.jsx          # Top sticky header with Theme Toggle (Sun/Moon)
    │   ├── ProjectCard.jsx     # Shared project card with GitHub topic tags & flat AI score badge
    │   ├── ProjectUploadModal.jsx # Project upload form with multi-metric AI scoring card
    │   ├── ProjectDocModal.jsx # 11-stage IP roadmap document drawer
    │   ├── AIMentorWidget.jsx  # Floating persistent AI mentor chatbot
    │   └── AIScoreBreakdownModal.jsx # AI 5-parameter score breakdown modal
    ├── context/
    │   ├── AuthContext.jsx     # User authentication & active role context (Student/Faculty/Company)
    │   └── ThemeContext.jsx    # Dark/Light mode theme state & localStorage handler
    ├── lib/
    │   ├── supabase.js         # Supabase client initialization & fallback mock data
    │   ├── aiScoring.js        # Multi-parameter AI project scoring logic
    │   └── scoreCalculator.js  # Innovation score formula implementation
    └── pages/
        ├── LandingPage.jsx     # Public landing page with hero CTA & featured innovations
        ├── InnovationFeedPage.jsx # Searchable project feed with stage & domain filters
        ├── LeaderboardPage.jsx # Campus leaderboard with top-3 rank highlight cards
        ├── StudentDashboard.jsx# Student workspace dashboard
        ├── FacultyDashboard.jsx# Academic evaluation portal
        ├── CompanyDashboard.jsx# Industry scouting & shortlist dashboard
        ├── ProfilePage.jsx     # Verified student portfolio page
        └── AuthPage.jsx        # Login & registration portal with role selector
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/marthijayaraam/innobridge-v2.git
   cd innobridge-v2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   Generates an optimized production build in the `dist/` directory.

---

## 🔐 Supabase Setup (Optional)

InnoBridge runs out-of-the-box using local persistent fallback mode. To connect to a live Cloud Supabase database:

1. Create `.env` in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. Create the required database tables:
   - `profiles`: `id`, `full_name`, `role`, `college`, `company_name`, `innovation_score`
   - `projects`: `id`, `student_id`, `student_name`, `title`, `description`, `domain`, `stage`, `demo_url`, `github_url`, `visibility`, `ai_scores`, `avg_faculty_rating`, `reviews_count`
   - `reviews`: `id`, `project_id`, `faculty_id`, `rating`, `comment`, `status`
   - `interests`: `id`, `project_id`, `company_id`, `company_name`, `project_title`, `student_name`

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Author & Maintainer

**Marthi Jayaraam**  
- GitHub: [@marthijayaraam](https://github.com/marthijayaraam)  
- Platform: InnoBridge v2.0

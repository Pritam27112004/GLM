# NCCT – COOPERATIVE TRAINING INTELLIGENCE
## Integrated Digital Platform for Training, Skill Development & Employment

### Problem Statement Alignment
This project addresses the institutional training challenge for the **National Council for Cooperative Training (NCCT)**, Ministry of Cooperation, Government of India, interconnecting:
- **VAMNICOM (Vaikunth Mehta National Institute of Cooperative Management, Pune)**
- **5 Regional Institutes of Cooperative Management (RICMs - Patna, Bengaluru, Gandhinagar, Chandigarh, Kalyani)**
- **14 Institutes of Cooperative Management (ICMs)**
- **Primary Agricultural Credit Societies (PACS)**, Milk Unions, Cooperative Banks & Rural Youth

---

## Key Core Modules

### 1. Training & Programme Management
- Centralized scheduling of hybrid, residential, and online training programmes.
- Capacity utilization tracking and 1-click candidate registration.

### 2. Learning Management System (LMS)
- Accredited curricula covering:
  1. *Digital Literacy for Cooperative Personnel*
  2. *Dairy Cooperative Management*
  3. *PACS Digital Operations & Common Accounting Standards*
  4. *Agricultural Entrepreneurship & FPO Incubation*
  5. *Financial Literacy & Cooperative Accounting*
  6. *Cooperative Society Management & Governance*
- Interactive video lesson player with speed controls, syllabus navigation, and low-bandwidth rural mode.
- Interactive assessment quiz module with real-time grading and certificate unlocking.

### 3. Digital Attendance Management & Edge Hardware Integration
- Attendance ledger tracking presence, late arrivals, excused leave, and unexcused absences.
- **Raspberry Pi 5 + Camera Module Edge Simulation**: Live simulated edge node gateway (`/api/attendance/device-status` and `/api/attendance/simulate-checkin`) ready for physical GPIO and camera module deployment.
- Attendance Analytics: Weekly line trends, department distributions, present vs. absent donut breakdown, late arrivals by hour, and 6-month compliance area charts.

### 4. Skill Certification & Central Verification Ledger
- Digital certificates featuring cryptographic proofs and QR code verification payloads.
- Integrated certificate view and download simulation.

### 5. AI Career Assistant & Job Placement Portal
- **NVIDIA Jetson Nano Local Edge AI Architecture**: Simulated local AI advisory providing career guidance, skill gap analysis, and course recommendations.
- Cooperative vacancies board with 1-click apply and automatic verified credential attachment.

### 6. Executive & Trainee Dual Dashboards
- Instant 1-click role switcher between **NCCT Administrator** and **Rural Trainee (Rahul Sharma)**.
- Continuous value pipeline tracking:
  $$\text{TRAINING} \longrightarrow \text{ATTENDANCE} \longrightarrow \text{LEARNING} \longrightarrow \text{CERTIFICATION} \longrightarrow \text{EMPLOYMENT}$$

---

## Directory Structure & Standalone Frontend Architecture

```
ncct-platform/
├── frontend/             # React 18 + Vite + Tailwind CSS (100% Standalone Capable)
│   ├── src/
│   │   ├── api/          # Dual-mode API client (REST API + Automatic Offline MockStore Fallback)
│   │   ├── components/   # Navbar, Sidebar, Protected routes, Role Switcher
│   │   ├── data/         # mockStore.js with persistent LocalStorage state
│   │   ├── pages/        # Admin and Trainee pages
│   │   └── ...
│   └── package.json
├── backend/              # Node.js + Express REST API & MongoDB Data Layer
│   ├── src/              # Controllers, Models, Routes, Auto-Seeder
│   └── package.json
└── package.json          # Root scripts for concurrent execution
```

> **Standalone Frontend Capability**: The `frontend` is built to be 100% functional when hosted independently (e.g., on Vercel, Netlify, Cloudflare Pages, GitHub Pages) without an active backend server. When API requests detect that the backend is offline, the client seamlessly falls back to the embedded `mockStore` with `localStorage` persistence, allowing full LMS interaction, quiz assessments, certificate generation, job applications, and AI assistant conversations in any environment.

---

## Technical Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6, Lucide React icons, Recharts
- **Backend**: Node.js, Express.js REST API
- **Database**: Local MongoDB (`mongodb://127.0.0.1:27017/ncct_platform`) with auto-seeding and high-resilience in-memory fallback
- **Storage Directory**: `D:\SIH\CLM` for storage of verification manifests, exports, and caches.

---

## How to Run the Platform

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Run Options

#### Option A: Run Full Stack (Frontend + Backend Concurrently)
```bash
npm run dev
```

#### Option B: Run Standalone Frontend Only
```bash
npm run frontend
# or: cd frontend && npm run dev
```

#### Option C: Build Frontend for Production / Static Hosting
```bash
npm run build
# or: cd frontend && npm run build
```

- **Frontend Application**: `http://localhost:5173`
- **Backend REST API**: `http://localhost:5000`
- **API Health Endpoint**: `http://localhost:5000/api/health`

### Demonstration Credentials
- **Admin**: `admin@ncct.demo` / `admin123`
- **Trainee**: `user@ncct.demo` / `user123`
*(Or use the single-click Quick Login buttons on the login page)*

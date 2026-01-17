
> **Note:** This document follows the principles in [system design phylosophy.md](system%20design%20phylosophy.md).

Perfect 👌 — you’re asking us to **document the UI/UX design flow** of your genomic platform (frontend client experience) before coding. I’ll capture it as a **numbered roadmap of user interface elements and flows**, showing how the user journeys will look. This will guide the frontend (Vite + React + TS + CSS Modules) work later.

---

# 📑 UI/UX Documentation – Genomic Platform (Client Side)

---

### 1. **Landing Page (Home)**

* Clear branding, logo, and project name.
* Hero section: one-line mission (“AI + Classical Genomic Analysis on Blockchain”).
* Call-to-Action (CTA) buttons:

  * **Get Started** (leads to login/registration).
  * **Learn More** (links to docs/introduction).
* Short description blocks of the 7–8 domains (clinical, research, education, agriculture, forensic, etc.).
* Footer with quick links (Docs, Roadmap, GitHub, Contact).

---

### 2. **Authentication System**

* **Login page** (Stacks wallet connect for Web3 auth, plus email option for fallback).
* **Register page** with profile creation:

  * Name, email, role (researcher, clinic, student, farmer, forensic analyst).
  * Optional upload profile image.
* **Passwordless option** through Stacks.js (preferred).

---

### 3. **Main Dashboard (after login)**

* Top navigation bar with tabs:

  * **Dashboard**
  * **Docs**
  * **Use Cases** (Healthcare, Research, etc.)
  * **Clarity dApps** (smart contract interaction).
  * **Oracle Data Feeds**.
  * **Profile**
* Sidebar for quick navigation (collapsible).
* Overview cards:

  * Pending analyses
  * Past reports
  * Clarity contract interactions
  * Notifications (system updates, oracle data refreshed, etc.)

---

### 4. **Classical Analysis Workspace**

* File upload component (DNA/RNA FASTA, CSV, TXT).
* Analysis selection panel:

  * Mutation detection
  * Resistance screening
  * Comparative genomics
* Progress indicator (loading animation during analysis).
* Results dashboard:

  * Table view (mutations, variants, annotations).
  * Visualization (heatmaps, phylogenetic tree, resistance markers).
  * Downloadable reports (PDF, JSON, CSV).

---

### 5. **Clarity Integration UI**

* Tab inside dashboard: **Smart Contract Interactions**.
* Buttons for:

  * Submit analysis hash to blockchain.
  * Retrieve analysis proofs.
  * Tokenize genomic data (NFTs or data-rights tokens).
* Wallet connect modal (Stacks.js).
* History of on-chain transactions (with explorer links).

---

### 6. **Oracle Data Interface**

* Oracle tab shows:

  * External feeds connected (e.g., public genomic databases, weather for agri-genomics, etc.).
  * Data synchronization status (green = live, yellow = syncing).
  * Option to request oracle refresh.
* Visualization of oracle-fed data (graphs, timelines, variant frequencies).

---

### 7. **Use Case Portals (Mini-Dashboards)**

Separate mini-dashboards for each domain (modular design):

* **Healthcare** → drug resistance reports, patient-friendly outputs.
* **Research** → raw sequence comparison, annotation export.
* **Education** → simplified tutorials, sandbox for students.
* **Agriculture** → plant/animal genomics interface.
* **Forensic** → identity matching, probability results.
  Each with tailored UI (cards, data upload, results visualization).

---

### 8. **Collaboration & Messaging**

* Chat panel for researcher-to-researcher communication.
* Group discussion threads around a dataset or project.
* Notifications (real-time with socket).

---

### 9. **Profile & Account Settings**

* View/update personal info.
* Role-specific settings (e.g., clinic profile vs. student profile).
* Data access permissions (who can see shared results).
* Security: connected wallets, two-factor auth option.

---

### 10. **Documentation Portal (In-App Docs)**

* Integrated markdown renderer (fetch from `/docs`).
* Sidebar nav: Introduction, Technical Roadmap, Clarity Integration, etc.
* Search bar for docs.
* Light/dark theme toggle.

---

### 11. **Reports & Exports**

* User-friendly reports:

  * Clinical = PDF (for patients/doctors).
  * Research = JSON/CSV with raw results.
  * Blockchain log export (hash, block, proof).
* History archive accessible from dashboard.

---

### 12. **UI Design System**

* Consistent color palette (science + blockchain theme: blue, green, black, neon accents).
* Typography: modern, clean, data-friendly.
* Reusable components: buttons, cards, modals, tables, charts.
* Accessibility (WCAG compliance: alt text, contrast, keyboard nav).

---

👉 This flow ensures the platform is **structured, modular, and expandable** while making sure every user group (clinics, researchers, students, etc.) has an intuitive experience.

---

Perfect 🚀 — let’s lay out the **wireframe flow (screen-by-screen mock layout)** for your genomic platform UI/UX. This will serve as a **visual skeleton** (not design polish yet, but the structure of each screen). I’ll keep it **modular** so later we can expand easily with React components.

---

# 📐 Wireframe Flow – Genomic Platform UI/UX

---

### **1. Landing Page (Home)**

```
 -------------------------------------------------
| LOGO | Home | Docs | Roadmap | Login/Register   |
 -------------------------------------------------
|         HERO SECTION                            |
|   "AI + Classical Genomic Analysis on Blockchain"|
|   [ Get Started ]   [ Learn More ]              |
 -------------------------------------------------
| Cards: Healthcare | Research | Education | etc. |
 -------------------------------------------------
| Footer: Quick Links | Contact | GitHub          |
 -------------------------------------------------
```

---

### **2. Authentication**

**Login Page**

```
 -----------------------------------------------
| LOGO                                          |
|                                               |
|   Login with Email [__________] (Password)    |
|   [ Login ]                                   |
|                                               |
|   Or connect with Stacks Wallet [ Connect ]   |
 -----------------------------------------------
```

**Register Page**

```
 ------------------------------------------------
| LOGO                                           |
|                                                |
|   Name: [__________]                           |
|   Email: [__________]                          |
|   Role: (Dropdown: Researcher, Clinic, etc.)   |
|   Upload Profile Image [ Browse ]              |
|                                                |
|   [ Register ]                                 |
 ------------------------------------------------
```

---

### **3. Main Dashboard**

```
 --------------------------------------------------------
| Sidebar          | Top Nav                             |
| Dashboard        | User Icon | Notifications | Docs    |
| Classical Anal.  |-------------------------------------|
| Clarity dApps    |                                         
| Oracle Feeds     |  Dashboard Cards:                     
| Use Cases        |   - Pending Analyses                 
| Reports          |   - Past Reports                     
| Profile          |   - Blockchain Activity              
|                  |   - Oracle Feeds Status              
 --------------------------------------------------------
```

---

### **4. Classical Analysis Workspace**

```
 ----------------------------------------------------------
| Upload File (DNA/RNA FASTA/CSV/TXT) [ Browse ]           |
| Select Analysis:                                         |
|   [x] Mutation Detection  [ ] Resistance Screening       |
|   [ ] Comparative Genomics                               |
|                                                          |
| [ Start Analysis ]                                       |
 ----------------------------------------------------------
| Progress Bar: [██████....]  65%                         |
 ----------------------------------------------------------
| Results:                                                 |
|   Table: Variant | Position | Mutation | Annotation      |
|   Visualization: [ Graphs | Heatmap | Phylo Tree ]       |
 ----------------------------------------------------------
| [ Download PDF ] [ Download CSV ] [ Blockchain Log ]     |
 ----------------------------------------------------------
```

---

### **5. Clarity Integration UI**

```
 ----------------------------------------------------------
| Smart Contract Actions                                   |
|  [ Submit Analysis Hash ]                                |
|  [ Retrieve Proofs ]                                     |
|  [ Tokenize Genomic Data ]                               |
 ----------------------------------------------------------
| Wallet Status: Connected (Stacks ID: user.id.stx)        |
 ----------------------------------------------------------
| Blockchain History:                                      |
|   - Tx #1 Hash: 0x12345 (Link to Explorer)               |
|   - Tx #2 Hash: 0x67890                                  |
 ----------------------------------------------------------
```

---

### **6. Oracle Data Interface**

```
 ----------------------------------------------------------
| Oracle Feeds Connected:                                  |
|   - NCBI GenBank [LIVE]                                  |
|   - WHO Resistance DB [SYNCING]                         |
|   - Weather API (Agri) [LIVE]                            |
 ----------------------------------------------------------
| Data Visualization:                                      |
|   Graph of mutation frequencies over time                |
|   Timeline of variant emergence                          |
 ----------------------------------------------------------
| [ Refresh Oracle ] [ Export Data ]                       |
 ----------------------------------------------------------
```

---

### **7. Use Case Mini-Dashboards**

**Healthcare Portal Example**

```
 ----------------------------------------------------------
| Upload Patient Sample [ Browse ]                         |
| [ Run Resistance Screening ]                             |
 ----------------------------------------------------------
| Report Output:                                           |
|   - Drug: XYZ | Resistance: High                         |
|   - Drug: ABC | Resistance: Low                          |
 ----------------------------------------------------------
| [ Generate PDF for Clinic ]                              |
 ----------------------------------------------------------
```

(Research, Education, Agriculture, Forensic → similar mini-dashboards with tailored options.)

---

### **8. Collaboration & Messaging**

```
 ----------------------------------------------------------
| Group Chat: [ Sequence Project #12 ]                     |
|   UserA: "Uploaded dataset today."                       |
|   UserB: "I’ll check mutations in position 234."         |
|                                                          |
| [ Type your message...__________ ] [ Send ]              |
 ----------------------------------------------------------
```

---

### **9. Profile & Settings**

```
 ----------------------------------------------------------
| Profile Picture   | Name: Dr. Jane Doe                   |
| Email: jane@example.com                                  |
| Role: Researcher                                         |
| Wallet: 0x123.stx                                        |
 ----------------------------------------------------------
| [ Edit Info ] [ Manage Permissions ] [ Security Options ]|
 ----------------------------------------------------------
```

---

### **10. Documentation Portal**

```
 ----------------------------------------------------------
| Sidebar:                                                |
|   Introduction                                          |
|   Technical Roadmap                                     |
|   Business Roadmap                                      |
|   Clarity Integration                                   |
|   Oracle Use                                            |
|   Use Cases (Healthcare, Research, etc.)                |
 ----------------------------------------------------------
| Content (Markdown Rendered)                             |
 ----------------------------------------------------------
| [ Light/Dark Mode Toggle ]                              |
 ----------------------------------------------------------
```

---

👉 This wireframe flow shows **all critical client-side screens**. Later we can translate each into React components (`LandingPage`, `Login`, `Dashboard`, `AnalysisWorkspace`, `ClarityUI`, etc.), styled with CSS modules.

---

Would you like me to **map these wireframes directly to the frontend file/component structure** (so you’ll see which React files will correspond to which UI screen)?

Great ✅ — let’s **map the wireframes to React components and file structure** for your Vite + React + TypeScript frontend (using CSS Modules).

This way, every **UI screen we designed** earlier will have a **matching component file + CSS module file**.

---

# 📂 Frontend File/Component Structure (Mapped to Wireframes)

```
genomic-platform-frontend/
│── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes/                  # Page-level routes
│   │   ├── LandingPage.tsx      # (Wireframe 1)
│   │   ├── Login.tsx            # (Wireframe 2a)
│   │   ├── Register.tsx         # (Wireframe 2b)
│   │   ├── Dashboard.tsx        # (Wireframe 3)
│   │   ├── AnalysisWorkspace.tsx# (Wireframe 4)
│   │   ├── ClarityUI.tsx        # (Wireframe 5)
│   │   ├── OracleInterface.tsx  # (Wireframe 6)
│   │   ├── HealthcarePortal.tsx # (Wireframe 7a)
│   │   ├── ResearchPortal.tsx   # (Wireframe 7b)
│   │   ├── EducationPortal.tsx  # (Wireframe 7c)
│   │   ├── AgriculturePortal.tsx# (Wireframe 7d)
│   │   ├── ForensicPortal.tsx   # (Wireframe 7e)
│   │   ├── Collaboration.tsx    # (Wireframe 8)
│   │   ├── Profile.tsx          # (Wireframe 9)
│   │   ├── DocsPortal.tsx       # (Wireframe 10)
│   │   └── NotFound.tsx         # 404 fallback
│   │
│   ├── components/              # Reusable UI building blocks
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FileUploader.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── DataTable.tsx
│   │   ├── GraphViewer.tsx
│   │   ├── ChatBox.tsx
│   │   ├── WalletConnector.tsx
│   │   ├── ReportCard.tsx
│   │   └── MarkdownRenderer.tsx
│   │
│   ├── styles/                  # CSS Modules
│   │   ├── LandingPage.module.css
│   │   ├── Login.module.css
│   │   ├── Register.module.css
│   │   ├── Dashboard.module.css
│   │   ├── AnalysisWorkspace.module.css
│   │   ├── ClarityUI.module.css
│   │   ├── OracleInterface.module.css
│   │   ├── HealthcarePortal.module.css
│   │   ├── ResearchPortal.module.css
│   │   ├── EducationPortal.module.css
│   │   ├── AgriculturePortal.module.css
│   │   ├── ForensicPortal.module.css
│   │   ├── Collaboration.module.css
│   │   ├── Profile.module.css
│   │   ├── DocsPortal.module.css
│   │   ├── Navbar.module.css
│   │   ├── Sidebar.module.css
│   │   ├── Footer.module.css
│   │   └── Shared.module.css     # Shared styles
│   │
│   ├── assets/                  # Logos, icons, static images
│   └── utils/                   # Helper functions (API calls, types)
│       ├── api.ts
│       ├── types.ts
│       ├── clarity.ts
│       ├── oracle.ts
│       └── auth.ts
│
│── public/                      # Static files
│── docs/                        # Markdown docs (rendered inside DocsPortal)
│   ├── introduction.md
│   ├── technical-roadmap.md
│   ├── business-roadmap.md
│   ├── clarity-integration.md
│   ├── oracle-use.md
│   ├── classical-analysis.md
│   ├── healthcare-usecases.md
│   ├── research-usecases.md
│   ├── education-usecases.md
│   ├── agriculture-usecases.md
│   └── forensic-usecases.md
```

---

# 🔑 Mapping of Wireframes → Components

* **Landing Page (1)** → `LandingPage.tsx` (+ `HeroSection.tsx`, `Navbar.tsx`, `Footer.tsx`)
* **Auth (2a, 2b)** → `Login.tsx`, `Register.tsx`
* **Dashboard (3)** → `Dashboard.tsx` (+ `Sidebar.tsx`, `ReportCard.tsx`)
* **Analysis Workspace (4)** → `AnalysisWorkspace.tsx` (+ `FileUploader.tsx`, `ProgressBar.tsx`, `DataTable.tsx`, `GraphViewer.tsx`)
* **Clarity UI (5)** → `ClarityUI.tsx` (+ `WalletConnector.tsx`)
* **Oracle Data (6)** → `OracleInterface.tsx`
* **Use Cases (7a–7e)** → `HealthcarePortal.tsx`, `ResearchPortal.tsx`, etc.
* **Collaboration (8)** → `Collaboration.tsx` (+ `ChatBox.tsx`)
* **Profile (9)** → `Profile.tsx`
* **Docs Portal (10)** → `DocsPortal.tsx` (+ `MarkdownRenderer.tsx`)

---

✅ This way, every **wireframe design** we outlined earlier has a **direct representation** in the codebase.
✅ We’re modular → easier to scale (each page + reusable components).
✅ Markdown docs are **rendered directly** into the Docs Portal.

---

Do you want me to **expand this further into Simple → Medium → Complex phases**, so we know which files to start with first (minimum viable UI) and which to add later?


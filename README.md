# 🍽️ VIT-AP Mess Menu Dashboard

A clean, modern, vibrant single-page web menu application built using **React** and **Tailwind CSS** designed to parse and display day-to-day mess menu spreadsheets (`mess.xlsx`).

---

## ✨ Key Features

1. **Intelligent Day Group Matching & Today Auto-Highlighting**:
   - Matches every day of the week to its respective menu rotation group:
     - **Monday & Friday** &rarr; Monday / Friday Menu
     - **Tuesday, Thursday & Saturday** &rarr; Tuesday / Thursday / Saturday Menu
     - **Wednesday** &rarr; Wednesday Menu
     - **Sunday** &rarr; Sunday Menu
   - Automatically detects current system day (e.g. **Friday**) and spotlights it with an animated **"TODAY"** badge and automatic group selection.
   - Quick 7-day pill strip lets users jump across any weekday or tap "Jump to Today".

2. **Clean Breakfast & Lunch Toggle / Side-by-Side Compare**:
   - Prominent segmented tab navigation separating **Breakfast** and **Lunch**, plus quick tabs for **Evening Snacks** and **Dinner**.
   - **Breakfast vs Lunch Mode**: Side-by-side comparative grid view to see both primary meals at a glance.
   - Live meal time detection showing what is currently being served in the cafeteria.

3. **Multi-Sheet Support (Regular vs Special Menu)**:
   - Instant switcher between **Veg / Non-Veg Menu** and **Special Menu** (which includes fresh juices, special soups, cereals, and gourmet desserts).

4. **Dynamic In-Browser Excel Parser (`mess.xlsx`)**:
   - Built-in **SheetJS (xlsx)** parser allows uploading and parsing updated `mess.xlsx` files directly in the browser with drag-and-drop.
   - Pre-parsed default data bundled directly so the app opens instantly with zero loading delay.

5. **Dietary & Rotation Tags**:
   - Visual badges: 🥗 **Veg**, 🍗 **Non-Veg**, 🥚 **Egg**, ☕ **Beverage**, 🍬 **Sweet / Dessert**, 🍲 **Soup**.
   - Rotation indicators: `Week 1 & 3`, `Week 2 & 4`, `Alternate Weeks`.
   - Real-time search bar to look up specific dishes (e.g., "Biryani", "Dosa", "Paneer").

6. **Official Mess Service Instructions Modal**:
   - Displays all **13 official mess service guidelines** from the spreadsheet (chicken/paneer gram weight standards, curd rules, toaster guidelines, and juice minimum volumes).

7. **Weekly Schedule Grid**:
   - Full 7-day weekly matrix modal for meal planning.

---

## 🚀 Quick Start

### Method 1: Instant Launch (Zero-install, works immediately)
Double-click **`start.bat`** or run:
```bash
python run_dashboard.py
```
This starts a local HTTP server and automatically opens the dashboard at `http://localhost:3000/index.html`.

Alternatively, you can double-click **`index.html`** to open it directly in Google Chrome, Microsoft Edge, or Firefox.

### Method 2: Vite + React Build (When Node.js is installed)
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Production build
npm run build
```

---

## 📁 Project Structure

```
mess-app/
├── index.html                   # Turnkey standalone SPA with React, Tailwind & SheetJS
├── package.json                 # Modern React 18 + Vite dependencies
├── vite.config.js               # Vite bundler configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── mess.xlsx                    # Copy of your mess menu spreadsheet
├── run_dashboard.py             # Python local HTTP server & browser launcher
├── start.bat                    # Windows 1-click launcher
├── scripts/
│   └── build_data.py            # Python script to convert mess.xlsx into defaultMenu.json
├── src/
│   ├── main.jsx                 # Vite application entry point
│   ├── App.jsx                  # Main React cafeteria dashboard component
│   ├── index.css                # Global stylesheet & Tailwind directives
│   ├── components/
│   │   ├── Navbar.jsx           # Top glassmorphic navigation bar with live clock
│   │   ├── DaySelector.jsx      # 7-day strip with TODAY auto-highlighting
│   │   ├── MealTabs.jsx         # Segmented Breakfast/Lunch tabs & compare toggle
│   │   ├── MenuCard.jsx         # Vibrant dish cards with dietary badges & alternates
│   │   ├── InstructionsModal.jsx# 13 Mess Service Rules modal
│   │   ├── UploadModal.jsx      # Dynamic Excel file uploader & drag-drop zone
│   │   └── WeeklyScheduleModal.jsx # Full weekly matrix overview modal
│   ├── utils/
│   │   └── excelParser.js       # SheetJS Excel parser engine
│   └── data/
│       ├── defaultMenu.json     # Pre-parsed menu data in JSON format
│       └── defaultMenu.js       # Window-accessible script for offline execution
└── mad/
    └── mess.xlsx.xlsx           # Original spreadsheet source
```


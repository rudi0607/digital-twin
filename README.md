# Kimi Agent – QuakeGuard

A production-ready, full-stack earthquake monitoring platform with real-time seismic ingestion, map visualization, alerting, authentication, risk prediction, and emergency preparedness guidance.

## 1) Folder Structure

```text
.
├── ai-module
│   ├── app.py
│   └── requirements.txt
├── backend
│   ├── .env.example
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── config/db.js
│       ├── controllers
│       │   ├── authController.js
│       │   ├── earthquakeController.js
│       │   └── userController.js
│       ├── middleware/auth.js
│       ├── models
│       │   ├── Earthquake.js
│       │   └── User.js
│       ├── routes
│       │   ├── authRoutes.js
│       │   ├── earthquakeRoutes.js
│       │   └── userRoutes.js
│       ├── services
│       │   ├── earthquakeService.js
│       │   └── predictionService.js
│       ├── utils/http.js
│       └── server.js
├── frontend
│   ├── .env.example
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src
│       ├── api/client.js
│       ├── App.jsx
│       ├── components
│       │   ├── AlertPanel.jsx
│       │   ├── DashboardCards.jsx
│       │   ├── EmergencyGuide.jsx
│       │   ├── MapView.jsx
│       │   └── Navbar.jsx
│       ├── context/AuthContext.jsx
│       ├── hooks/useQuakeData.js
│       ├── main.jsx
│       ├── pages
│       │   ├── AuthCard.jsx
│       │   └── Dashboard.jsx
│       └── styles/index.css
└── package.json
```

## 2) Frontend Code
- React + Tailwind CSS + Leaflet map with responsive dashboard.
- Includes: Navbar, Dashboard cards, Live map, Alert panel, Emergency guide.
- Includes dark/light mode and browser notification permission flow.
- Authentication UI with login/signup and session persistence.

## 3) Backend Code
- Node.js + Express + MongoDB (Mongoose).
- Core endpoints:
  - `GET /api/earthquakes`
  - `GET /api/alerts?threshold=4.5`
  - `GET /api/prediction`
- Auth endpoints:
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
- User endpoint:
  - `GET /api/user/me`
  - `PATCH /api/user/preferences`

## 4) AI Module Code
- JS-based model integrated in backend (`predictionService.js`) for risk score and hot zone inference.
- Optional standalone Python Flask AI service in `ai-module/app.py`.

## 5) Installation Steps

### Prerequisites
- Node.js 20+
- MongoDB local instance or hosted cluster
- (Optional) Python 3.11+ for standalone AI module

### Setup
1. Clone repository.
2. Copy env files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
3. Install dependencies:
   - `npm run install:all`
4. Start backend:
   - `npm run dev:backend`
5. Start frontend:
   - `npm run dev:frontend`
6. Open `http://localhost:5173`.

### Optional Python AI module
1. `cd ai-module`
2. `python -m venv .venv && source .venv/bin/activate`
3. `pip install -r requirements.txt`
4. `python app.py`
5. Test with `POST http://localhost:8001/predict`

## 6) Future Improvements
- Add WebSocket stream for true real-time push from backend to frontend.
- Add geofencing and user-specific alert subscriptions.
- Use historical datasets + clustering model (e.g., XGBoost, LSTM) for better forecasting.
- Add PWA support for offline emergency guide and mobile notifications.
- Add automated tests (Vitest/Jest + Supertest + Cypress).

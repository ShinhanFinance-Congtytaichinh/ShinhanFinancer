Shinhan Finance
A full-stack web application for loan applications, featuring OTP verification, live chat, SSR, PWA, and an awards section. Built with Node.js, Express, MongoDB, Next.js, Tailwind CSS, and Socket.io.
Features

Loan Application: Form with validation, interest calculation (6.5-8%), file upload.
OTP Verification: SMS/email OTP for secure submission.
Live Chat: Real-time chat using Socket.io.
Testimonials: Slider showcasing partner feedback (MoMo, VNPAY, Nguyen Kim).
Awards: Section highlighting achievements (Top 10 Finance 2024, etc.).
SSR: Next.js for SEO and fast rendering.
PWA: Offline support, installable app.
Security: Input sanitization, regex validation, CSRF-ready.

Tech Stack

Backend: Node.js, Express, MongoDB, Socket.io
Frontend: Next.js, React, Tailwind CSS
Others: PWA (Service Worker), Webpack, Jest-ready

Prerequisites

Node.js >= 18.x
MongoDB >= 4.4
Git

Installation
Backend
cd backend
npm install
npm run start


Ensure MongoDB runs on localhost:27017.
Backend runs on http://localhost:5000.

Frontend
cd frontend
npm install
npm run dev


Frontend runs on http://localhost:3000.

Project Structure
shinhan-finance/
├── backend/
│   ├── src/
│   │   ├── routes/loan.js
│   │   ├── models/Lead.js
│   │   ├── services/otp.js
│   │   ├── server.js
├── frontend/
│   ├── pages/index.js
│   ├── components/
│   │   ├── Menu.js
│   │   ├── LoanForm.js
│   │   ├── LiveChat.js
│   ├── public/
│   │   ├── manifest.json
│   │   ├── sw.js
├── README.md
├── .gitignore
├── SPECIFICATION.md

API Endpoints

POST /api/loan/submit: Submit loan application, returns OTP ID.
POST /api/loan/verify-otp: Verify OTP, generate contract.

Running Tests
cd frontend
npm run test


Uses Jest (configure separately).

Deployment

Backend: Heroku, Railway
Frontend: Vercel, Netlify
CI/CD: GitHub Actions

Contributing

Fork the repo.
Create a branch (git checkout -b feature/xyz).
Commit changes (git commit -m "Add xyz").
Push (git push origin feature/xyz).
Open a PR.

License
MIT

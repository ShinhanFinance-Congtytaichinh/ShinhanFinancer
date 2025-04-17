Shinhan Finance Project Specification
Overview
A full-stack loan application platform for Shinhan Finance, supporting loan applications, OTP verification, live chat, testimonials, and awards. Built with modern tech for performance, security, and scalability.
Requirements
Functional

Loan Application:
Form: Full name, phone, email, CCCD/CMND, loan amount, term, type, file upload.
Validation: Regex (phone: 10 digits, email, CCCD: 9-12 digits), min loan 1M VND, term 6-60 months.
Interest calculation: 6.5% (auto), 7% (home), 7.5% (renovation), 8% (unsecured).
OTP: SMS/email verification before contract generation.


Live Chat:
Real-time chat with Socket.io, user/support toggle.
Persist messages in session.


Testimonials:
Slider with 3 reviews (MoMo, VNPAY, Nguyen Kim).
Auto-slide every 5s, manual prev/next.


Awards:
Display 3 awards (Top 10 Finance 2024, Customer Service 2023, Innovation 2022).
Responsive grid (3 cols desktop, 1 col mobile).


Menu:
Sticky, responsive (hamburger mobile), 6 items (Home, Loans, Cards, Promotions, About, Contact).


Footer:
4 columns (Logo, Contact, Quick Links, Social).
Responsive (1 col mobile).



Non-Functional

Performance: Page load < 2s, Lighthouse score > 90.
SEO: Meta tags, schema (Organization, Product), SSR.
Security: Sanitize inputs, CSRF-ready, file upload validation (.pdf,.jpg,.png, <5MB).
Accessibility: ARIA labels, keyboard navigation.
PWA: Offline support, installable, manifest.json.

Tech Stack

Backend: Node.js, Express, MongoDB, Socket.io
Frontend: Next.js, React, Tailwind CSS
Dev Tools: Webpack, Jest, Prettier, ESLint

API Endpoints

POST /api/loan/submit: Submit loan data, return OTP ID, contract ID.
POST /api/loan/verify-otp: Verify OTP, finalize contract.
WebSocket: / for live chat messages.

Design

Colors: Primary #004080, secondary #60A5FA, background #F3F4F6.
Font: Roboto (16px body, 24px h2, 36px h1).
Container: 1200px desktop, 720px tablet, 320px mobile.
Breakpoints: 1280px, 1024px, 768px, 640px.

Deliverables

Source code on GitHub.
README.md with setup instructions.
.gitignore for node_modules, build.
Deployed demo (Vercel frontend, Heroku backend).

Timeline

Week 1: Backend setup, API, MongoDB schema.
Week 2: Frontend components, form, live chat.
Week 3: SSR, PWA, testing, deployment.
Week 4: Bug fixes, documentation.

Risks

API Downtime: Mitigate with retries, fallback UI.
OTP Delivery: Use reliable services (Twilio/SendGrid).
Browser Compatibility: Test on Chrome, Firefox, Safari.

Success Criteria

100% form submissions saved to MongoDB.
Live chat latency < 100ms.
Lighthouse SEO score > 90.
PWA installable on Chrome, Safari.


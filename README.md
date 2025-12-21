# 🗂️ Job Application Tracker

![CI](https://github.com/Maryam1982/job-applications-tracker/actions/workflows/ci.yml/badge.svg)

A clean, production-oriented web application to help users track their job applications — from submission to interviews — built with **Next.js**, **Supabase**, and **PostgreSQL**.

This project is part of my portfolio and focuses on real-world concerns such as authentication flows, data ownership, offline-friendly UX, and scalable frontend architecture.

---

## ✨ Features & Roadmap

### Phase One — Core Application (Completed)

➕ Add, ✏️ Edit, 🗑️ Delete, and 🔍 Search job applications  
⏰ Automatic timestamps for created records  
💾 Local persistence for guest users (Local Storage)  
🧭 Clean, responsive UI built with Tailwind CSS  

---

### Phase Two — User Experience & Insights (Implemented)

🔐 Authentication and personal user accounts (Supabase Auth)  
🔄 Sync local (guest) job applications to the server after login  
📊 Dashboard with charts and application insights  
🎨 Color-coded application statuses for better visual clarity  

---

### Phase Three — Advanced Functionality (Planned)

🔽 Sorting, filtering, and pagination  
👤 Recruiter & contact management  
📎 Resume / document uploads  

---

## 🧠 Tech Stack

| Layer      | Technology                  |
|-----------|-----------------------------|
| Frontend  | Next.js (React, TypeScript) |
| Backend   | Supabase (PostgreSQL)       |
| Styling   | Tailwind CSS                |
| Auth      | Supabase Auth               |
| Storage  | Local Storage (guest mode)  |
| Deploy   | Vercel (planned)            |

---

## 🧪 Testing

This project uses a pragmatic, production-focused testing setup:

- **Vitest** as the test runner
- **React Testing Library** for user-centric component testing
- Tests focus on **observable behavior**, accessibility, and critical user flows
- Server-side dependencies (e.g. auth, adapters) are mocked at clear boundaries
- A **smoke test** ensures the app boots correctly in CI

This approach provides confidence without over-testing implementation details.

---

## 🏗️ Architecture Overview

- The **Next.js frontend** communicates directly with Supabase via its client SDK  
- Authenticated users store data securely in PostgreSQL  
- Guest users can use the app without authentication via Local Storage  
- Upon login, local job applications can be synced to the server  
- Each server-side record is associated with a `user_id`  
- Modular component structure designed for clarity and scalability  

> A simple architecture diagram will be added soon.

---

## 🗄️ Database Schema

### Table: `job_applications`

| Column           | Type      | Description                               |
|------------------|-----------|-------------------------------------------|
| id               | UUID      | Primary key                               |
| created_at       | Timestamp | Auto-generated creation time              |
| job_title        | Text      | Job title                                 |
| company_name     | Text      | Company name                              |
| contract_type    | Text      | Full-time, Part-time, Freelance, etc.     |
| location         | Text      | Job location                              |
| application_date | Date      | Date the application was submitted        |
| status           | Text      | Application status                        |
| notes            | Text      | Optional notes                            |
| user_id          | UUID      | Foreign key → authenticated user          |

All database records are **user-owned** and only accessible within the authenticated session.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
git clone https://github.com/Maryam1982/job-applications-tracker.git

### 2️⃣ Navigate into the project
cd job-applications-tracker

### 3️⃣ Install dependencies
npm install

### 4️⃣ Run the development server
npm run dev

### 5️⃣ Environment variables
Create a .env.local file in the project root:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

### 6️⃣ Open the app
Open your browser and navigate to:
👉 http://localhost:3000


## 🚀 Usage

### 👤 Guest Mode (No Login Required)

- Users can immediately add job applications

- Data is stored locally in the browser (Local Storage)

- Full CRUD functionality is available

- Ideal for quick usage without registration

### 🔐 Authenticated Mode

- Users can sign up or log in

- Successful login redirects to the landing page

- If local job applications exist, users can sync them to the server

- All synced and future applications are stored securely in PostgreSQL

- Dashboard and insights become available

### 🔄 Local → Server Sync Logic

- Guest applications are stored locally using the same data structure

- After login, the app detects unsynced local entries

- Users can migrate local applications to their personal account

After successful sync:

- Records are persisted server-side

- Local copies are cleared to avoid duplication

This enables a seamless transition from anonymous usage to a personal account.


## 🔐 Authentication Flow

This project implements a secure authentication system using Supabase Auth, with privacy-safe UX messaging and clear user feedback.

### 1️⃣ Login

#### Happy Path

- Navigate to /login

- Enter email and password

- Authentication succeeds

- Redirect to landing page

- Authenticated UI and dashboard become available

#### Error Handling

- Invalid credentials message

- Reset Password link always available

### 2️⃣ Sign-Up

#### Happy Path

- Enter new email and valid password

- Account created

- Message displayed:

> Account created! Please check your email to confirm.

- Redirect to login after a short delay

#### Privacy-Safe Case

- Message:

> This email address may already be registered.

- Options: Log in or Reset password

### 3️⃣ Forgot Password

- User enters email

- Supabase sends reset link if account exists

- UI always shows:

If an account exists for this email, a reset link has been sent.

### 4️⃣ Reset Password

- Accessed only via Supabase email link

#### Success

- Password updated

- Redirect to login

#### Invalid / Expired Token

-Message shown with option to request a new reset link

### 5️⃣ UX Principles Applied

- Offline-friendly usage via Local Storage

- Privacy-safe messaging

- Clear guest vs authenticated states

- No sensitive Supabase data exposed

- Predictable redirects and readable feedback


## 🧩 Future Enhancements

- Recruiter & contact management

- Advanced filtering and sorting

- Document uploads (CVs, cover letters)

- Smart reminders and analytics


## 🧾 License

MIT License © 2025 Maryam Saleh

## 💡 About This Project

This project demonstrates a complete, realistic full-stack workflow — including guest usage, authentication, data migration, and user-owned persistence.

It reflects my focus on:

- clean, maintainable code

- thoughtful UX decisions

- building software that works naturally for real users

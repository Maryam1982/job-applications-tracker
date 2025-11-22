🗂️ Job Application Tracker

A clean and minimal web application to help users track their job applications — from submission to interviews — built with Next.js, Supabase, and PostgreSQL.


---

✨ Features

Phase One

➕ Add, ✏️ Edit, 🗑️ Delete, and 🔍 Search job applications

⏰ Automatic timestamps for created and updated records

💾 Data stored securely in Supabase (PostgreSQL)

🧭 Simple and responsive interface built with Tailwind CSS


Phase Two (Planned)

🔽 Sorting, filtering, and pagination

📊 Dashboard with charts and application insights

👤 Recruiter contact management

📎 Resume/document uploads

🔐 Authentication and personal user accounts



---

🧠 Tech Stack

Layer Technology

Frontend Next.js (React)
Backend Supabase (PostgreSQL)
Styling Tailwind CSS
Deployment Vercel (planned)



---

🏗️ Architecture Overview

Next.js frontend communicates directly with Supabase via its client library.

CRUD operations (Create, Read, Update, Delete) are handled securely through Supabase’s API.

The structure follows a modular component design for scalability and readability.


(A simple architecture diagram will be added soon.)


---

🗄️ Database Schema

Table: applications

Column Type Description

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company | Text | Company name |
| role | Text | Job title |
| status | Text | Application status |
| date_applied | Date | When the application was submitted |
| job_link | Text | URL to the job posting |
| notes | Text | Optional notes |
| created_at | Timestamp | Auto-generated |
| updated_at | Timestamp | Auto-updated |



---

⚙️ Installation & Setup

# Clone the repository
git clone https://github.com/<your-username>/job-application-tracker.git

# Navigate into the project
cd job-application-tracker

# Install dependencies
npm install

# Run the development server
npm run dev

Create a .env.local file in the project root and add your Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

Then open the app in your browser:

> http://localhost:3000




---

🚀 Usage

Click “Add Application” to create a new record.

View all applications in the main list.

Use the search bar to quickly find jobs by company or role.

Edit or delete any record with a single click.



---

🧩 Future Enhancements

User authentication (Supabase Auth)

Chart dashboard (applications per week, status breakdown)

Color-coded statuses

Recruiter tracking with contacts table

Document uploads (CV, cover letter)

Smart reminders and insights



---

## 🔐 Authentication Flow (Login, Signup, Reset Password)

This project implements a secure authentication system using **Supabase Auth**, with clear UX messaging, server-action validation, and privacy-safe error handling.

---

### **1. Login Flow**

#### ✅ Happy Path
1. User navigates to **/login**  
2. Enters email & password  
3. Credentials are valid → user logs in  
4. Redirects to the dashboard  
5. Navbar updates via `auth-changed` event  

#### ❗ Error Handling
If credentials are incorrect, Supabase returns a generic error.  
The UI displays:

> **Invalid credentials. If you forgot your password, you can reset it.**

A **Reset Password** link is always available.

---

### **2. Sign-Up Flow**

#### ✅ Happy Path
1. User enters a *new* email + valid password  
2. Supabase successfully creates the account  
3. User sees:  
   > **Account created! Please check your email to confirm.**  
4. After 2 seconds, user is redirected to **Login**

#### ⚠ Privacy Case (Email Already Exists)
If Supabase cannot reveal whether the email exists  
(`data.user.identities.length === 0`):

UI shows a neutral (non-error) message:

> **This email address may already be registered.**

Then the UI shows:

- **Log in**
- **Reset password**

No redirect occurs.

#### ❌ Real Errors
(weak password, invalid email, etc.)

Displayed as a red error message.  
No redirect.

---

### **3. Forgot Password Flow**
1. User enters an email in **/forgot-password**  
2. Supabase sends a reset link (if account exists)  
3. UI always shows the same security-safe confirmation:

> **If an account exists for this email, a reset link has been sent.**

---

### **4. Reset Password Flow**

Accessible only via Supabase’s email link.

#### ✅ Happy Path
1. User enters new password + confirmation  
2. `supabase.auth.updateUser()` updates password  
3. UI shows success message  
4. Redirects to **Login** after 2 seconds

#### ❌ Expired / Invalid Token
If the reset link is expired or invalid:

> **This password reset link is invalid or has expired.**

UI also shows:

- **Request a new reset link** → /forgot-password

---

### **5. UX Principles Implemented**
- Neutral messages for privacy-sensitive cases  
- Clear visual distinction between **success**, **neutral**, and **error**  
- Reset link available wherever confusion might occur  
- Redirects delayed to allow users to read success messages  
- No sensitive Supabase information exposed in UI  

---



🧾 License

MIT License © 2025 Maryam.S


---

💡 About This Project

This project is part of my portfolio and was built to demonstrate a full-stack workflow — from database design and API interaction to frontend state management and UI design.
It reflects my focus on clean code, usability, and continuous learning as a frontend developer.


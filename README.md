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

🧾 License

MIT License © 2025 Maryam.S


---

💡 About This Project

This project is part of my portfolio and was built to demonstrate a full-stack workflow — from database design and API interaction to frontend state management and UI design.
It reflects my focus on clean code, usability, and continuous learning as a frontend developer.


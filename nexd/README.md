# NexD — The Placement Assist  
*Task for Training & Placement Cell, DTU*

NexD is a student data-sharing and visualization web app developed as part of the task assigned by the **TNP Cell of Delhi Technological University**. It allows authorized users to view, paginate, and filter student data efficiently through a secure share link system.

## 🎯 Objective

Build a frontend application with the following features:

Admin Panel
Protected behind login (basic authentication is acceptable)
Button to generate a shareable link
Display the generated link on screen
Public Share Page
Accessible via the shareable link
Automatically uses the token in the URL to fetch student data
Displays the data in a clean, readable table
Implements a basic email filter for search functionality
## 📸 Preview

![NexD Preview](https://drive.google.com/file/d/1Uabs1fb9FoBt9Mreql3OqiUrA5FBnfsC/view?usp=sharing)

## 🚀 Features

- ✅ Secure Token-Based Data Fetching
- 📊 Paginated Student View
- 🔍 Email Search Filter
- 🧠 Branch Filter (CO, SE, IT, MCE, ME, EP, ECE, EE, ENE)
- 💌 Clickable Email Links
- ⚡ Smooth UI using **shadcn/ui** and **Lucide Icons**
- ⏳ Dynamic Loading Progress Bar

## 🧪 Branch Parsing Logic

Branch is derived from the roll number (e.g., `2K23/CO/002` → `Computer Engineering`) using the branch code.

| Code | Branch                       |
|------|------------------------------|
| CO   | Computer Engineering         |
| SE   | Software Engineering         |
| IT   | Information Technology       |
| MCE  | Mathematics and Computing    |
| ME   | Mechanical Engineering       |
| EP   | Engineering Physics          |
| ECE  | Electronics and Communication|
| EE   | Electrical Engineering       |
| ENE  | Environmental Engineering    |

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **Lucide React Icons**
- **Axios** for API requests

## 📦 Getting Started

```bash
git clone https://github.com/yourusername/nexd-tnp-task.git
cd nexd
npm install
npm run dev

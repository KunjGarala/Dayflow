# 🧑‍💼 Dayflow – Human Resource Management System  
**Every workday, perfectly aligned.**

Dayflow HRMS is a modern **Human Resource Management System (HRMS)** designed to digitize and streamline core HR operations such as employee onboarding, profile management, attendance tracking, leave management, payroll visibility, and approval workflows for Admins and HR officers.

---

## 📌 Purpose

The purpose of Dayflow HRMS is to provide a centralized, secure, and efficient platform to manage human resources digitally, reducing manual effort and improving transparency across HR processes.

---

## 📦 Scope

The system provides the following functionalities:

- Secure authentication (Sign Up / Sign In)
- Role-based access control (Admin / HR / Employee)
- Employee profile management
- Attendance tracking (daily & weekly)
- Leave and time-off management
- Approval workflows for Admins and HR
- Payroll visibility (read-only for employees)

---

## 👥 User Classes & Characteristics

| User Type | Description |
|---------|-------------|
| **Admin / HR Officer** | Manages employees, approves attendance & leave, views payroll data |
| **Employee** | Views personal profile, attendance, applies for leave, views salary |

---

## 🔐 Authentication & Authorization

### Sign Up
Users can register using:
- Employee ID  
- Email  
- Password  
- Role (Employee / HR)

Additional rules:
- Strong password policy
- Email verification required

### Sign In
- Login using email & password
- Error messages for invalid credentials
- Successful login redirects to dashboard

---

## 📊 Dashboards

### Employee Dashboard
- Quick access to:
  - Profile
  - Attendance
  - Leave Requests
  - Logout
- Recent alerts and activity
- Check-in / Check-out functionality

### Admin / HR Dashboard
- View all employees
- View attendance records
- Approve or reject leave requests
- Switch between employee views

---

## 👤 Employee Profile Management

### View Profile
Employees can view:
- Personal details
- Job details
- Salary structure
- Documents
- Profile picture

### Edit Profile
- Employees: limited fields (address, phone, profile picture)
- Admin/HR: full access to edit employee details

---

## ⏱ Attendance Management

### Attendance Tracking
- Daily and weekly views
- Check-in / Check-out option
- Attendance statuses:
  - Present
  - Absent
  - Half-day
  - Leave

### Attendance Visibility
- Employees: can view **only their own attendance**
- Admin/HR: can view attendance of **all employees**

---

## 🌴 Leave & Time-Off Management

### Apply for Leave (Employee)
Employees can:
- Select leave type (Paid / Sick / Unpaid)
- Choose date range
- Add remarks

Leave statuses:
- Pending
- Approved
- Rejected

### Leave Approval (Admin / HR)
Admins can:
- View all leave requests
- Approve or reject requests
- Add comments

Changes are reflected immediately in employee records.

---

## 💰 Payroll & Salary Management

### Employee Payroll View
- Read-only access to payroll information

### Admin Payroll Control
Admins can:
- View payroll of all employees
- Update salary structure
- Ensure payroll accuracy

Additional features:
- Email notifications
- Analytics & reports (salary slips, attendance reports)

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js & Express
- REST APIs
- JWT Authentication

### Database
- MySQL

---

## 🔌 API Endpoints (Sample)

### Attendance
- `GET /api/employee/attendance/status`
- `POST /api/employee/attendance/checkin`
- `POST /api/employee/attendance/checkout`

### Employees
- `GET /employees`
- `POST /employees` (HR only)

---

## 🧑‍🤝‍🧑 Contributors

| Name | Email |
|-----|------|
| **Viral Dobariya** | viraldobariya33@gmail.com |
| **Kunj Garala (Team Leader)** | kunjgarala55@gmail.com |
| **Jay Lakhani** | 23ce062@gmail.com |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <repository-url>

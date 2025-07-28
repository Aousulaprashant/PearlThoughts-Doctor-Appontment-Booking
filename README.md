## 🩺 Shedula - Doctor Appointment Booking App

A responsive doctor appointment booking app built using **Next.js 14 (App Router)**, **Tailwind CSS**, and **JSON Server** as a mock backend.

🚀 **Live Demo:** [Click here](https://pearl-thoughts-doctor-appontment-bo-flax.vercel.app/login)
📦 **Mock API:** Powered by [JSON Server](https://github.com/typicode/json-server)

---

### ✨ Features

* 🔐 OTP-based login (mocked)
* 🩺 Browse and view doctor profiles
* 📅 Book appointments by date and time slot
* 🔍 Search doctors
* 📱 Mobile-first UI (450px layout on all devices)
* ✅ Mock backend with JSON Server (`db.json`)
* 🌐 Deployed on Vercel

---

### 🛠️ Tech Stack

| Layer      | Technology                            |
| ---------- | ------------------------------------- |
| Frontend   | Next.js 14 (App Router), Tailwind CSS |
| Backend    | JSON Server (Mock API)                |
| Auth       | Mock OTP login (no real SMS/email)    |
| Deployment | Vercel (Frontend)                     |

---

### 📁 Folder Structure

```bash
.
├── src
│   ├── app
│   │   ├── login
│   │   ├── otp
│   │   ├── home
│   │   ├── book/[id]
│   │   ├── book/[id]/appointment
│   ├── components
│   │   └── BottomNavbar.tsx
├── db.json  ← JSON Server mock data
├── public
└── README.md
```

---

### 🚀 Getting Started Locally

#### 🔹 1. Clone and Install

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```

#### 🔹 2. Start JSON Server (Mock API)

```bash
npx json-server --watch db.json --port 5000
```

#### 🔹 3. Start Next.js Frontend

```bash
npm run dev
```

App runs at: [http://localhost:3000](http://localhost:3000)
API runs at: [http://localhost:5000](http://localhost:5000)

---

### 📦 Example API Endpoints

* `GET /doctors` → list all doctors
* `GET /doctors/:id` → get doctor details
* You can extend with more endpoints in `db.json` as needed.

---



### ✅ To Do (Next Features)

* [ ] Store appointments in `db.json`
* [ ] Add patient profile page
* [ ] Admin panel (mocked)
* [ ] Real OTP API (optional)

---

### 👨‍💻 Author

**A Prashanth**
🔗 [LinkedIn](https://www.linkedin.com/in/prashanth-aousula-9a9b33369/) 

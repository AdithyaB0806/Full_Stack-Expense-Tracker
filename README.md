# 💰 Full Stack Expense Tracker

A modern full-stack expense tracker built with **React + FastAPI + PostgreSQL**.
Track your income, expenses, and analyze spending with interactive charts.

---

## 🚀 Features

* ➕ Add, edit, and delete transactions
* 📊 Expense breakdown using pie chart
* 📅 Monthly analytics using bar chart
* 💡 Real-time balance calculation
* 🧾 Transaction history with edit modal
* 🎨 Clean and responsive dashboard UI

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Axios
* Recharts (Charts)

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL

---

## 📂 Project Structure

```
.
├── backend
│   ├── main.py
│   ├── database.py
│   ├── databasemodel.py
│   ├── schemas.py
│   └── transaction.py
│
├── expense-tracker (frontend)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── AddTransaction.jsx
│   │   ├── History.jsx
│   │   ├── Summary.jsx
│   │   ├── Chart.jsx
│   │   └── MonthlyChart.jsx
│   └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/AdithyaB0806/Full_Stack-Expense-Tracker.git
cd Full_Stack-Expense-Tracker
```

---

### 2️⃣ Backend Setup (FastAPI)

```
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup (React)

```
cd expense-tracker
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/transactions`     | Get all transactions |
| POST   | `/transaction`      | Add transaction      |
| PUT    | `/transaction/{id}` | Update transaction   |
| DELETE | `/transaction/{id}` | Delete transaction   |
| GET    | `/monthly-summary`  | Monthly analytics    |

---



## 🚀 Future Improvements

* 🤖 AI-based spending insights
* 📅 Date filtering
* 📈 Expense trends comparison
* 🌍 Deployment (Vercel + Render)

---

## 👨‍💻 Author

**Adithya B**

* Aspiring AI Engineer & Full Stack Developer

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps!

![Status](https://img.shields.io/badge/Status-Working-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Tech](https://img.shields.io/badge/Backend-Node.js-yellow)
![DB](https://img.shields.io/badge/Database-MySQL-lightgrey)


## 📄 README.md (Full Content — Copy/Paste This)

```markdown
# 📈 Stock Trading Simulation Backend

A backend system simulating real-time stock trading, loan management, and user analytics with Swagger API documentation.

---

## 🛠️ Tech Stack

- Node.js + Express.js
- MySQL with Sequelize ORM
- Swagger UI for API Docs
- Cron Job for 5-min stock price updates
- Seed data and trade simulation scripts

---

## 🚀 Features

- ✅ Register stocks and users
- ✅ Buy/Sell stocks
- ✅ Track profit/loss per user
- ✅ Loan system (limit: ₹1,00,000)
- ✅ Simulate 5–10 users trading
- ✅ View top stocks and top users
- ✅ Swagger API docs at `/api-docs`
- ✅ Price updates every 5 mins

---

## 📂 Folder Structure

```

stock-trading-sim/
├── controllers/
├── models/
├── routes/
├── jobs/
├── utils/
├── .env
├── seed.js
├── server.js
├── package.json

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/GThiruAishwarya/stocktradingsimulationtask.git
cd stocktradingsimulationtask
````

### 2. Create MySQL Database

```sql
CREATE DATABASE stock_trading_sim;
```

### 3. Create `.env` File

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=stock_trading_sim
DB_DIALECT=mysql
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Seed Data

```bash
node seed.js
```

### 6. Start Server

```bash
npm start
```

---

## 🧪 Simulate Trading

```bash
node utils/simulateTrade.js
```

---

## 📊 API Docs via Swagger

Go to:
👉 `http://localhost:5000/api-docs`

---

## 🔑 API Endpoints

### Stock Management

* `POST /stocks/register`
* `GET /stocks/history`

### Loan Management

* `POST /users/loan`

### Trading Operations

* `POST /users/buy`
* `POST /users/sell`

### Analytics & Reports

* `GET /users/report`
* `GET /stocks/report`
* `GET /users/top`
* `GET /stocks/top`

---

## 👤 Author

**ThiruAishwarya Gotte**
Project: Stock Trading Simulation (2025)

```
![image](https://github.com/user-attachments/assets/a4dad760-5bfd-4d0c-a5b7-99d213b18456)


---


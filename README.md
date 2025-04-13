# 🍽️ FoodBridge



> **Connecting food donors with NGOs to reduce food waste and fight hunger.**

FoodBridge is a web platform that connects restaurants and individuals with surplus food to nearby NGOs in need. It offers an intuitive UI for donors and requesters and provides real-time statistics and location-based services for better coordination.

---



## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Leaflet.js for maps
- Font Awesome for icons

### Backend
- Node.js + Express.js
- MongoDB (via MongoDB Atlas)
- CORS & dotenv

### Hosting
- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---


---

## 🚀 Features

- 📦 Donate food in 3 simple steps
- 🏥 NGOs can request food from nearby donors
- 📍 Location-based interaction (via Leaflet)
- 📊 Real-time statistics of donations and impact
- 🔒 Backend API with MongoDB integration

---

## 📁 Project Structure

/frontend
├── index.html
├── style.css
└── script.js

/backend
├── app.js
├── routes/
├── models/
├── config/
└── .env (not included in GitHub)





---

## 🔧 Installation (For Developers)

### Backend Setup
```bash
git clone https://github.com/AaryanPartap/foodbridge.git
cd backend
npm install

# Create a .env file
echo "MONGO_URI=your-mongodb-uri" > .env
npm start

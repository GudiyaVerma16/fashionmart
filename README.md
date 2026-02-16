# FashionMart – E-Commerce Website (MERN Stack)

## Yeh project kya hai?

**FashionMart** ek **full-stack e-commerce website** hai jisme:

1. **Customer** – Frontend (React) pe products dekhta hai, cart bharta hai, order place karta hai.
2. **Backend** – Node.js + Express API jo database (MongoDB) se data leta/rakhta hai, login/cart/orders handle karta hai.
3. **Admin** – Alag React app jahan se products add/remove aur orders ka status manage hota hai.

Sab cheezein **MERN** se bani hain: **M**ongoDB, **E**xpress, **R**eact, **N**ode.js.

---

## Project ka structure (folders)

```
fashionmart/
├── frontend/    → Customer ke liye website (home, collection, cart, order, login, etc.)
├── backend/     → API server (users, products, cart, orders – sab yahan se)
└── admin/       → Admin panel (products add karo, orders dekho/update karo)
```

- **frontend** aur **admin** dono alag-alag React apps hain (Vite + React).
- **backend** ek hi API hai; frontend aur admin dono isi API ko use karte hain.

---

## Pehle kya chahiye (Prerequisites)

- **Node.js** (v18 ya usse upar) – [nodejs.org](https://nodejs.org) se install karo.
- **MongoDB** – Ya to apne computer pe install + run karo, ya **MongoDB Atlas** (cloud) ka free account use karo.

---

## Setup – step by step

### Step 1: Code clone karo aur dependencies install karo

```bash
git clone https://github.com/GudiyaVerma16/fashionmart.git
cd fashionmart
```

Phir teeno folders me jaa kar `npm install` chalao:

```bash
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd admin && npm install && cd ..
```

### Step 2: Environment variables (.env files)

Har part ko apni **.env** file chahiye taaki sahi URL / password / keys use ho.

**1) Backend – `backend/.env`**  
(Pehle se nahi hai to nayi file banao `backend` folder ke andar.)

```env
MONGODB_URI=mongodb://127.0.0.1:27017
PORT=4000
JWT_SECRET=apna-koi-bhi-long-random-secret-key

# Admin panel login (jo bhi email/password admin ke liye chaho)
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123

# Optional – product images cloud pe rakhne ke liye (chhod do to local upload use hoga)
# CLOUDINARY_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_SECRET_KEY=
```

- **MONGODB_URI**: Agar MongoDB apne PC pe chal raha hai to `mongodb://127.0.0.1:27017`. Atlas use kar rahe ho to unka connection string yahan daalo.
- **JWT_SECRET**: Koi bhi strong random string (e.g. `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` se generate kar sakte ho).

**2) Frontend – `frontend/.env`**

```env
VITE_BACKEND_URL=http://localhost:4000
```

**3) Admin – `admin/.env`**

```env
VITE_BACKEND_URL=http://localhost:4000
```

Dono me ye batata hai ki API kahan chal rahi hai (localhost:4000 = backend).

### Step 3: MongoDB chalana

- **Local MongoDB**:  
  - Linux: `sudo systemctl start mongod`  
  - Mac: `brew services start mongodb-community`  
- **Atlas**: Kuch nahi start karna, sirf connection string `backend/.env` me sahi daalna.

### Step 4: Teen servers start karo (3 alag terminals)

Order matter karta hai: pehle **backend**, phir **frontend**, phir **admin**.

**Terminal 1 – Backend (API)**  
```bash
cd backend
npm run server
```
- Ye **http://localhost:4000** pe chalega.  
- Terminal me "Connected to MongoDB" dikhe to backend theek hai.

**Terminal 2 – Frontend (customer site)**  
```bash
cd frontend
npm run dev
```
- Browser me **http://localhost:5173** kholo – yahi customer wali website hai.

**Terminal 3 – Admin panel**  
```bash
cd admin
npm run dev
```
- Browser me **http://localhost:5174** (ya jo port Vite dikhaye) – yahan se admin login karke products/orders manage karte ho.

---

## Kaunsi URL pe kya hai?

| URL | Kya hai |
|-----|--------|
| http://localhost:5173 | **Frontend** – customer store (shopping, cart, order) |
| http://localhost:5174 | **Admin panel** – products add karo, orders dekho/update karo |
| http://localhost:4000 | **Backend API** – direct browser me kam use hoga, frontend/admin isi ko call karte hain |

---

## Admin login (default)

- **Email:** `admin@forever.com`  
- **Password:** `admin123`  

Ye values `backend/.env` me **ADMIN_EMAIL** aur **ADMIN_PASSWORD** me change kar sakte ho.

---

## Product images – Cloudinary (optional)

- **.env me Cloudinary na daalo** to product ki images **local** save hoti hain (`backend/uploads/`) aur site phir bhi chalegi.
- **Cloud pe rakhna ho** to:
  1. [cloudinary.com](https://cloudinary.com) pe account banao.
  2. Dashboard se **Cloud name**, **API Key**, **API Secret** copy karo.
  3. `backend/.env` me add karo:  
     `CLOUDINARY_NAME=...`, `CLOUDINARY_API_KEY=...`, `CLOUDINARY_SECRET_KEY=...`  
  4. Backend restart karo.

---

## Technologies (kya use hua hai)

| Part | Tech |
|------|------|
| Frontend & Admin | React, React Router, Axios, Tailwind CSS, Vite |
| Backend | Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Multer |
| Images | Cloudinary (optional) ya local uploads |
| Payment | COD by default; Stripe/Razorpay code maujood hai, extend kar sakte ho |

---

## API (short overview)

Backend ye routes provide karta hai:

- **User:** register, login  
- **Admin:** admin login  
- **Products:** list, add (admin), remove (admin)  
- **Cart:** add, update, get (login required)  
- **Orders:** place (user), list (admin), status update (admin)  

Detail ke liye `backend/routes/` me dekh sakte ho.

---

## Deploy karna ho to

- **Frontend & Admin:** `npm run build` → `dist` folder deploy karo (e.g. Vercel, Netlify).  
- **Backend:** Koi bhi Node host (e.g. Render, Railway); wahan MongoDB (Atlas) aur env variables set karo.  
- Deploy ke baad frontend aur admin ki `.env` me **VITE_BACKEND_URL** apne live backend URL se replace karke phir build lena.

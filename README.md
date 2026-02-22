# FashionMart – E-Commerce Website (MERN Stack)

## What is this project?

**FashionMart** is a **full-stack e-commerce website** with:

1. **Customer** – Frontend (React) to browse products, add to cart, and place orders. (https://fashionmart-frontend.onrender.com/)
2. **Backend** – Node.js + Express API that reads/writes data in MongoDB and handles login, cart, and orders.(https://fashionmart-93as.onrender.com/)
3. **Admin** – Separate React app to add/remove products and manage order status.(https://admin-g8np.onrender.com/)

Everything is built with the **MERN** stack: **M**ongoDB, **E**xpress, **R**eact, **N**ode.js.

---

## Project structure

```
fashionmart/
├── frontend/    → Customer-facing site (home, collection, cart, order, login, etc.)
├── backend/     → API server (users, products, cart, orders)
└── admin/       → Admin panel (add/remove products, view and update orders)
```

- **Frontend** and **admin** are separate React apps (Vite + React).
- **Backend** is a single API used by both frontend and admin.

---

## Prerequisites

- **Node.js** (v18 or higher) – install from [nodejs.org](https://nodejs.org).
- **MongoDB** – Either install and run it locally, or use a free **MongoDB Atlas** (cloud) account.

---

## Setup (step by step)

### Step 1: Clone the repo and install dependencies

```bash
git clone https://github.com/GudiyaVerma16/fashionmart.git
cd fashionmart
```

Then run `npm install` in each folder:

```bash
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd admin && npm install && cd ..
```

### Step 2: Environment variables (.env files)

Each part of the app needs its own **.env** file with the correct URLs, passwords, and keys.

**1) Backend – `backend/.env`**  
(Create this file inside the `backend` folder if it doesn’t exist.)

```env
MONGODB_URI=mongodb://127.0.0.1:27017
PORT=4000
JWT_SECRET=your-long-random-secret-key

# Admin panel login (set your own email/password for admin)
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123

# Optional – for storing product images in the cloud (leave empty to use local uploads)
# CLOUDINARY_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_SECRET_KEY=
```

- **MONGODB_URI**: Use `mongodb://127.0.0.1:27017` if MongoDB runs on your machine. For Atlas, paste your cluster connection string here.
- **JWT_SECRET**: Any strong random string (e.g. generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`).

**2) Frontend – `frontend/.env`**

```env
VITE_BACKEND_URL=http://localhost:4000
```

**3) Admin – `admin/.env`**

```env
VITE_BACKEND_URL=http://localhost:4000
```

Both point to where the API runs (localhost:4000 = backend).

### Step 3: Start MongoDB

- **Local MongoDB**:  
  - Linux: `sudo systemctl start mongod`  
  - Mac: `brew services start mongodb-community`  
- **Atlas**: No need to start anything; just set the connection string in `backend/.env`.

### Step 4: Start the three servers (use 3 separate terminals)

Order matters: start **backend** first, then **frontend**, then **admin**.

**Terminal 1 – Backend (API)**  
```bash
cd backend
npm run server
```
- Runs at **http://localhost:4000**.  
- When you see "Connected to MongoDB" in the terminal, the backend is ready.

**Terminal 2 – Frontend (customer site)**  
```bash
cd frontend
npm run dev
```
- Open **http://localhost:5173** in your browser – this is the customer store.

**Terminal 3 – Admin panel**  
```bash
cd admin
npm run dev
```
- Open **http://localhost:5174** (or the port Vite shows) – use this to log in as admin and manage products/orders.

---

## What runs on which URL?

| URL | Description |
|-----|-------------|
| http://localhost:5173 | **Frontend** – customer store (browse, cart, orders) |
| http://localhost:5174 | **Admin panel** – add products, view and update orders |
| http://localhost:4000 | **Backend API** – used by frontend and admin; rarely opened directly in the browser |

---

## Default admin login

- **Email:** `admin@forever.com`  
- **Password:** `admin123`  

You can change these in `backend/.env` using **ADMIN_EMAIL** and **ADMIN_PASSWORD**.

---

## Product images – Cloudinary (optional)

- If you **don’t set Cloudinary** in `.env`, product images are stored **locally** in `backend/uploads/` and the site still works.
- To **use the cloud**:
  1. Create an account at [cloudinary.com](https://cloudinary.com).
  2. From the dashboard, copy **Cloud name**, **API Key**, and **API Secret**.
  3. Add them to `backend/.env`:  
     `CLOUDINARY_NAME=...`, `CLOUDINARY_API_KEY=...`, `CLOUDINARY_SECRET_KEY=...`  
  4. Restart the backend.

---

## Technologies used

| Part | Tech |
|------|------|
| Frontend & Admin | React, React Router, Axios, Tailwind CSS, Vite |
| Backend | Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Multer |
| Images | Cloudinary (optional) or local uploads |
| Payment | COD by default; Stripe/Razorpay code is present and can be extended |

---

## API overview

The backend exposes these main routes:

- **User:** register, login  
- **Admin:** admin login  
- **Products:** list, add (admin), remove (admin)  
- **Cart:** add, update, get (login required)  
- **Orders:** place (user), list (admin), update status (admin)  

See `backend/routes/` for full details.

---

## Deployment

- **Frontend & Admin:** Run `npm run build`, then deploy the `dist` folder (e.g. Vercel, Netlify).  
- **Backend:** Deploy to any Node host (e.g. Render, Railway); set MongoDB (e.g. Atlas) and env variables there.  
- After deployment, set **VITE_BACKEND_URL** in frontend and admin `.env` to your live backend URL, then build again.

---

## Contributors

- **Divanshi Jain** – [GitHub](https://github.com/DivanshiJain2005)

## License

MIT License.

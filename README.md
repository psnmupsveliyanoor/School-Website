# Springfield School Website — MERN Stack

A complete, responsive school website with a public frontend and a secure Admin CMS backend.

## Tech Stack

| Layer     | Technology                     |
|-----------|-------------------------------|
| Frontend  | React (Vite) + Tailwind CSS   |
| Backend   | Node.js + Express.js          |
| Database  | MongoDB Atlas (Mongoose)      |
| Auth      | JWT + bcryptjs                |

---

## Project Structure

```
school_website/
├── backend/
│   ├── middleware/auth.js       # JWT protect middleware
│   ├── models/                  # Mongoose schemas
│   │   ├── Admin.js
│   │   ├── Announcement.js
│   │   ├── Event.js
│   │   ├── Staff.js
│   │   ├── Gallery.js
│   │   └── Facility.js
│   ├── routes/                  # RESTful API routes
│   │   ├── auth.js
│   │   ├── announcements.js
│   │   ├── events.js
│   │   ├── staff.js
│   │   ├── gallery.js
│   │   └── facilities.js
│   ├── .env                     # Environment variables
│   ├── server.js                # Express app entry point
│   └── seed.js                  # Database seeder
└── frontend/
    ├── src/
    │   ├── components/          # Shared components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── CmsTable.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx  # Global auth state
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── AboutPage.jsx
    │   │   ├── EventsPage.jsx
    │   │   ├── StaffPage.jsx
    │   │   ├── FacilitiesPage.jsx
    │   │   ├── GalleryPage.jsx
    │   │   ├── ContactPage.jsx
    │   │   └── admin/
    │   │       ├── AdminLogin.jsx
    │   │       ├── AdminLayout.jsx
    │   │       ├── AdminDashboard.jsx
    │   │       ├── AdminAnnouncements.jsx
    │   │       ├── AdminEvents.jsx
    │   │       ├── AdminStaff.jsx
    │   │       ├── AdminGallery.jsx
    │   │       └── AdminFacilities.jsx
    │   ├── services/api.js      # Axios API layer
    │   ├── App.jsx              # Router
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## Setup & Installation

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

The `backend/.env` file is pre-configured with the MongoDB Atlas connection string. Verify it contains:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=school_website_jwt_secret_2024_secure_key
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Admin image fields now accept local image files. The backend uploads them to
Cloudinary and stores only the returned URL (and, for gallery items, the
Cloudinary public ID) in MongoDB. Add the three Cloudinary values above before
using image uploads.

### 3. Seed the Database

This creates the admin user and sample data (announcements, events, staff, gallery, facilities):

```bash
cd backend
npm run seed
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### 4. Start the Backend

```bash
cd backend
npm run dev       # Development (nodemon)
# or
npm start         # Production
```

Backend runs on: `http://localhost:5000`

### 5. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 6. Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`

The Vite dev server proxies all `/api` requests to `http://localhost:5000`.

---

## Pages

| Route             | Description                         |
|-------------------|-------------------------------------|
| `/`               | Home — Hero, stats, announcements   |
| `/about`          | School history, mission, values     |
| `/events`         | Split layout — featured + upcoming  |
| `/staff`          | Responsive team grid                |
| `/facilities`     | Alternating image/text layout       |
| `/gallery`        | Masonry/asymmetric gallery          |
| `/contact`        | Contact details + map               |
| `/admin/login`    | Admin login                         |
| `/admin/dashboard`| CMS dashboard                       |
| `/admin/announcements` | Manage announcements           |
| `/admin/events`   | Manage events                       |
| `/admin/staff`    | Manage staff                        |
| `/admin/gallery`  | Manage gallery                      |
| `/admin/facilities`| Manage facilities                  |

---

## API Endpoints

All routes are prefixed with `/api/`. POST, PUT, DELETE endpoints require `Authorization: Bearer <token>`.

| Method | Route                    | Auth | Description            |
|--------|--------------------------|------|------------------------|
| POST   | `/api/auth/login`        | No   | Admin login → JWT      |
| GET    | `/api/announcements`     | No   | List announcements     |
| POST   | `/api/announcements`     | Yes  | Create announcement    |
| PUT    | `/api/announcements/:id` | Yes  | Update announcement    |
| DELETE | `/api/announcements/:id` | Yes  | Delete announcement    |
| GET    | `/api/events`            | No   | List events            |
| POST   | `/api/events`            | Yes  | Create event           |
| PUT    | `/api/events/:id`        | Yes  | Update event           |
| DELETE | `/api/events/:id`        | Yes  | Delete event           |
| GET    | `/api/staff`             | No   | List staff             |
| POST   | `/api/staff`             | Yes  | Create staff member    |
| PUT    | `/api/staff/:id`         | Yes  | Update staff member    |
| DELETE | `/api/staff/:id`         | Yes  | Delete staff member    |
| GET    | `/api/gallery`           | No   | List gallery items     |
| POST   | `/api/gallery`           | Yes  | Create gallery item    |
| PUT    | `/api/gallery/:id`       | Yes  | Update gallery item    |
| DELETE | `/api/gallery/:id`       | Yes  | Delete gallery item    |
| GET    | `/api/facilities`        | No   | List facilities        |
| POST   | `/api/facilities`        | Yes  | Create facility        |
| PUT    | `/api/facilities/:id`    | Yes  | Update facility        |
| DELETE | `/api/facilities/:id`    | Yes  | Delete facility        |

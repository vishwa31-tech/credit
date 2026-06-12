# EventHub - Setup & Installation Guide

## Complete Project Structure

This is a full-featured event registration platform with the following components:

### ✨ Features Implemented

#### Frontend Features
- 🏠 **Home Page**: Hero section, featured events, service overview
- 📅 **Events**: Browse, filter, create, and register for events
- 🏢 **Business Listings**: Catering services, ratings, and reviews
- 💼 **Job Board**: Job listings, filtering by type and location
- 📰 **News Section**: Latest articles and updates
- 👤 **Authentication**: User signup, login, and profile management
- 🔐 **Protected Routes**: JWT-based authentication
- 💻 **Responsive Design**: Mobile-first with Tailwind CSS

#### Backend Features
- 🔌 **RESTful APIs**: Complete CRUD operations for all entities
- 🔐 **JWT Authentication**: Secure user authentication
- 👥 **Role-Based Access**: User, Vendor, Admin roles
- 📊 **Database Models**: Optimized MongoDB schemas
- 🛡️ **Middleware**: Authentication and authorization
- ⚙️ **Error Handling**: Comprehensive error management

## Installation Guide

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn
- Git (optional)

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# OR
cp .env.example .env

# Edit .env with your configuration
# Important: Set your MongoDB URI and JWT secret
```

**Backend .env Configuration:**
```
MONGODB_URI=mongodb://localhost:27017/eventhub
# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventhub

PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

**Start Backend Server:**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 2: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# OR
cp .env.example .env
```

**Frontend .env Configuration:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Start Frontend Server:**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## MongoDB Setup

### Local MongoDB
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Use connection string: `mongodb://localhost:27017/eventhub`

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string and add to `.env`

## API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

### Businesses
- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/:id` - Get business details
- `POST /api/businesses` - Create business (protected, vendor)
- `POST /api/businesses/:id/review` - Add review (protected)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (protected, vendor)

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news details
- `POST /api/news` - Create news (protected, admin)

### Registrations
- `POST /api/registrations` - Register for event (protected)
- `GET /api/registrations/my-registrations` - Get user registrations (protected)
- `PUT /api/registrations/:id/cancel` - Cancel registration (protected)

## Project File Structure

```
EventHub/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── businessController.js
│   │   ├── jobController.js
│   │   ├── newsController.js
│   │   └── registrationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Business.js
│   │   ├── Job.js
│   │   ├── News.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── businessRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── newsRoutes.js
│   │   └── registrationRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ErrorBoundary.js
│   │   │   ├── UIComponents.js
│   │   │   ├── SearchBox.js
│   │   │   ├── Pagination.js
│   │   │   ├── EventCard.js
│   │   │   └── RatingComponent.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Events.js
│   │   │   ├── EventDetail.js
│   │   │   ├── CreateEvent.js
│   │   │   ├── Businesses.js
│   │   │   ├── BusinessDetail.js
│   │   │   ├── CreateBusiness.js
│   │   │   ├── Jobs.js
│   │   │   ├── JobDetail.js
│   │   │   ├── News.js
│   │   │   └── NewsDetail.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
├── README.md
├── API_DOCUMENTATION.md
├── SETUP.md (this file)
└── .gitignore
```

## Running the Project

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Output: Server running on port 5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
# Output: Browser opens on http://localhost:3000
```

## Testing the Application

1. **Visit Home Page**: `http://localhost:3000`
2. **Sign Up**: Create a new account (Role: User or Vendor)
3. **Login**: Use credentials to sign in
4. **Create Event** (if authenticated): Click "+ Event" in navbar
5. **Browse Events**: Filter by category, view details
6. **Register for Event**: Click "Register Now" button
7. **Explore Businesses**: Browse catering and other services
8. **Read News**: Check latest articles

## Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running. Start MongoDB service or use Atlas connection string.

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Backend CORS is already enabled. Ensure both servers are running.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in .env or kill process using the port:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Or use npm cache clean
npm cache clean --force
npm install
```

## Environment Variables Summary

### Backend (.env)
| Variable | Example | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017/eventhub` | MongoDB connection string |
| `PORT` | `5000` | Backend server port |
| `JWT_SECRET` | `your_secret_key` | JWT signing key |
| `NODE_ENV` | `development` | Environment mode |

### Frontend (.env)
| Variable | Example | Description |
| `REACT_APP_API_URL` | `http://localhost:5000/api` | Backend API base URL |

## Development Tips

1. **Use React DevTools**: Browser extension for debugging
2. **Use MongoDB Compass**: GUI for MongoDB management
3. **Check Network Tab**: Browser DevTools > Network for API calls
4. **Inspect Console**: Browser DevTools > Console for errors
5. **Use Postman**: Test API endpoints independently

## Deployment

### Deploy Backend (Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Netlify)
```bash
cd frontend
npm run build
# Drag & drop build folder to Netlify
```

## Features to Implement

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Real-time notifications with Socket.io
- [ ] User ratings and reviews
- [ ] Event analytics dashboard
- [ ] Admin panel
- [ ] Image uploads with AWS S3
- [ ] Two-factor authentication
- [ ] Social media login (OAuth)

## Support & Resources

- React Documentation: https://react.dev
- Express.js Documentation: https://expressjs.com
- MongoDB Documentation: https://docs.mongodb.com
- Tailwind CSS: https://tailwindcss.com
- JWT Documentation: https://jwt.io

---

**Happy coding! 🚀**

For issues or questions, check the API documentation or contact support.

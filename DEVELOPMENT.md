# EventHub - Complete Development Instructions

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB
- Code Editor (VS Code)

### Installation (5 minutes)

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

#### Frontend  
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, React Router |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| API | RESTful with CORS |

## Database Schema

### User
```javascript
{
  name, email, password, phone, city,
  avatar, bio, role (user/vendor/admin),
  timestamps
}
```

### Event
```javascript
{
  title, description, category,
  date, location, price, capacity,
  image, organizer, tags, status,
  timestamps
}
```

### Business
```javascript
{
  name, description, category,
  email, phone, address, city,
  website, image, rating,
  reviews, services, pricing,
  timestamps
}
```

### Job
```javascript
{
  title, description, company,
  salary, jobType, location,
  category, skills, experience,
  postedBy, applications,
  timestamps
}
```

### News
```javascript
{
  title, content, author,
  category, image, views,
  featured, tags, status,
  timestamps
}
```

### Registration
```javascript
{
  user, event, ticketCount,
  totalPrice, paymentStatus,
  registrationStatus, timestamps
}
```

## Frontend Architecture

### Pages (13 total)
- Home, Login, Signup
- Events, EventDetail, CreateEvent
- Businesses, BusinessDetail, CreateBusiness
- Jobs, JobDetail
- News, NewsDetail

### Components
- Navbar, Footer
- ErrorBoundary, UIComponents
- SearchBox, Pagination
- EventCard, RatingComponent

### Services
- API service with axios
- Helper utilities
- Auth context

### Styling
- Tailwind CSS
- Gradient backgrounds
- Responsive design

## Backend Architecture

### Controllers (6 total)
- authController: Registration, login, profile
- eventController: Event CRUD
- businessController: Business CRUD + reviews
- jobController: Job listing
- newsController: News articles
- registrationController: Event registrations

### Middleware
- JWT verification
- Role-based access control

### Routes (6 total)
- /api/auth
- /api/events
- /api/businesses
- /api/jobs
- /api/news
- /api/registrations

## API Quick Reference

### Auth
```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile (protected)
```

### Events
```
GET /api/events
GET /api/events/:id
POST /api/events (protected)
PUT /api/events/:id (protected)
DELETE /api/events/:id (protected)
```

### Businesses
```
GET /api/businesses
GET /api/businesses/:id
POST /api/businesses (protected, vendor)
POST /api/businesses/:id/review (protected)
```

### Jobs
```
GET /api/jobs
GET /api/jobs/:id
POST /api/jobs (protected, vendor)
```

### News
```
GET /api/news
GET /api/news/:id
POST /api/news (protected, admin)
```

## Key Features

✅ User authentication with JWT
✅ Role-based access (user, vendor, admin)
✅ Event registration system
✅ Business listing with reviews
✅ Job board
✅ News management
✅ Search and filtering
✅ Rating system
✅ Responsive UI

## Development Commands

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start server
```

### Frontend
```bash
npm start        # Start dev server
npm build        # Production build
npm test         # Run tests
```

## Project Completion Status

✅ Backend fully functional
✅ Frontend fully functional  
✅ Authentication system
✅ All 4 main modules (Events, Business, Jobs, News)
✅ Responsive design
✅ Error handling
✅ Database models

## Next Steps

1. Start MongoDB
2. Run backend: `npm run dev`
3. Run frontend: `npm start`
4. Create account and test features
5. Deploy (optional)

---

Enjoy building! 🎉

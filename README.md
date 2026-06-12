# EventHub - Event Registration & Business Listing Platform

A creative, modern full-stack web application for event registration, news, job listings, business directories, and catering services. Built with React, Node.js, and MongoDB.

## ✨ Features

### Events
- Browse and filter events by category (weddings, festivals, parties, concerts, etc.)
- Event registration and ticket booking
- Event search by location and date
- Organized event details with descriptions and pricing

### Business Listings & Catering
- Catering service providers and other business vendors
- Rating and review system for services
- Search businesses by category and location
- Service pricing and details

### Job Listings
- Post and browse job opportunities
- Filter by job type (full-time, part-time, contract, freelance)
- Search by location, skills, and salary range
- Company and role information


### News & Updates
- Latest news about events and entertainment
- Featured articles and trending stories
- News search and filtering by category
- View counts and article details

## 🏗️ Project Structure

```
EventHub/
├── backend/              # Node.js/Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   ├── middleware/       # Authentication & authorization
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env.example
├── frontend/            # React frontend
│   ├── public/          # Static files
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running locally or connection string
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/eventhub
   PORT=5000
   JWT_SECRET=your_secret_key_here
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will open on `http://localhost:3000`

## 🔌 API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event (requires auth)
- `PUT /api/events/:id` - Update event (requires auth)
- `DELETE /api/events/:id` - Delete event (requires auth)

### Businesses
- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/:id` - Get business details
- `POST /api/businesses` - Create business (requires vendor role)
- `POST /api/businesses/:id/review` - Add review to business

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Post new job (requires vendor role)

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/:id` - Get news details
- `POST /api/news` - Create news (requires admin role)

## 🎨 Design Features

- **Gradient UI**: Beautiful gradient backgrounds and colors
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Clean, reusable React components
- **Interactive Elements**: Hover effects and smooth transitions
- **Emoji Icons**: Fun and engaging visual elements
- **Card Layout**: Grid-based responsive layouts

## 💻 Tech Stack

### Frontend
- React 18
- React Router DOM (v6)
- Axios for API calls
- Tailwind CSS for styling
- Modern ES6+ JavaScript

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `multer` - File upload handling

### Frontend
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - CSS framework

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Users can register and login
- Tokens are issued upon successful authentication
- Protected routes require valid JWT tokens
- Role-based access control (user, vendor, admin)

## 🧪 Testing the Application

1. Start with the home page to explore featured events
2. Browse events by category (weddings, festivals, parties)
3. Check out available services and catering providers
4. Browse job listings
5. Read the latest news articles

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, AWS, or DigitalOcean
- Update `MONGODB_URI` to your production database
- Set `NODE_ENV=production`
- Use strong JWT secret in production

### Frontend Deployment
- Build: `npm run build`
- Deploy built files to Netlify, Vercel, or GitHub Pages
- Update API endpoints to production backend

## 📝 Future Enhancements

- [ ] User authentication with login/signup
- [ ] Payment integration for event bookings
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] User profiles and dashboards
- [ ] Event recommendations
- [ ] Messaging between users and vendors
- [ ] Analytics dashboard

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📞 Support

For support, please create an issue or contact the development team.

---

**Happy coding! 🎉**

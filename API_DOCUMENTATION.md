# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Events API

### Get All Events
```
GET /events
Query Parameters:
  - category: wedding|festival|party|conference|concert|sports|other
  - city: string
  - search: string
```

### Get Event by ID
```
GET /events/:id
```

### Create Event (Protected)
```
POST /events
Body:
{
  "title": "Wedding Celebration",
  "description": "Grand wedding event",
  "category": "wedding",
  "date": "2024-12-25T18:00:00Z",
  "location": {
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "price": 100,
  "capacity": 500,
  "image": "url_to_image",
  "tags": ["luxury", "outdoor"]
}
```

### Update Event (Protected)
```
PUT /events/:id
Body: Same as POST
```

### Delete Event (Protected)
```
DELETE /events/:id
```

---

## Businesses API

### Get All Businesses
```
GET /businesses
Query Parameters:
  - category: catering|photography|venue|decoration|entertainment|florist|other
  - city: string
  - search: string
```

### Get Business by ID
```
GET /businesses/:id
```

### Create Business (Protected - Vendor)
```
POST /businesses
Body:
{
  "name": "Elegant Catering",
  "description": "Premium catering services",
  "category": "catering",
  "email": "catering@example.com",
  "phone": "555-1234",
  "address": "456 Food St",
  "city": "Los Angeles",
  "website": "www.catering.com",
  "image": "url_to_image",
  "services": ["weddings", "corporate", "birthdays"],
  "pricing": {
    "minBudget": 500,
    "maxBudget": 5000
  }
}
```

### Add Review to Business (Protected)
```
POST /businesses/:id/review
Body:
{
  "comment": "Excellent service!",
  "rating": 5
}
```

---

## Jobs API

### Get All Jobs
```
GET /jobs
Query Parameters:
  - category: string
  - location: string
  - jobType: full-time|part-time|contract|freelance
  - search: string
```

### Get Job by ID
```
GET /jobs/:id
```

### Create Job (Protected - Vendor)
```
POST /jobs
Body:
{
  "title": "Event Manager",
  "description": "Looking for experienced event manager",
  "company": "EventCorp",
  "salary": {
    "min": 40000,
    "max": 60000,
    "currency": "USD"
  },
  "jobType": "full-time",
  "location": "Chicago",
  "category": "management",
  "skills": ["event planning", "leadership", "communication"],
  "experience": "3+ years"
}
```

---

## News API

### Get All News
```
GET /news
Query Parameters:
  - category: events|business|entertainment|lifestyle|other
  - search: string
  - featured: true|false
```

### Get News by ID
```
GET /news/:id
```

### Create News (Protected - Admin)
```
POST /news
Body:
{
  "title": "New Festival Announced",
  "content": "A grand new festival is coming to town...",
  "category": "events",
  "image": "url_to_image",
  "featured": true,
  "tags": ["festival", "entertainment"]
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Only vendors can access this"
}
```

### 404 Not Found
```json
{
  "error": "Event not found"
}
```

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

---

## Success Responses

### 200 OK
Returns the requested resource or list of resources

### 201 Created
Returns the newly created resource

### Example Event Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Wedding Celebration",
  "description": "Grand wedding event",
  "category": "wedding",
  "date": "2024-12-25T18:00:00Z",
  "location": {
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "price": 100,
  "capacity": 500,
  "registrations": 45,
  "organizer": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Organizer",
    "email": "john@example.com"
  },
  "status": "active",
  "createdAt": "2024-01-10T10:30:00Z",
  "updatedAt": "2024-01-10T10:30:00Z"
}
```

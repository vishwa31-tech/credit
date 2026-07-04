# Multi-Role Registration System Implementation Guide

## Overview
Your EventHub application now has a complete multi-role registration system based on your diagram. Users can sign up as customers and then apply for various partner roles that require admin approval.

## System Architecture

### Key Components

#### Backend (Node.js/Express)

**Models:**
- **User.js** - Updated with:
  - `role`: customer or admin
  - `secondaryRoles`: array of approved partner roles
  - `status`: active/pending/rejected
  - Role-specific details (businessDetails, jobDetails, cateringDetails, etc.)
  - `rejectionReason`: stores reason if application is rejected

- **RoleRequest.js** - NEW model tracking:
  - userId, requestedRole, status (pending/approved/rejected)
  - formData: dynamic data based on role
  - documents: uploaded files
  - Admin notes and rejection reasons
  - Timestamps for review process

**API Endpoints:**

User endpoints (protected):
```
POST   /api/auth/submit-role-request      - Submit role application
GET    /api/auth/pending-requests         - Get user's pending requests
GET    /api/auth/request-status/:id       - Check specific request status
```

Admin endpoints (admin-only):
```
GET    /api/admin/role-requests/pending   - Get all pending requests
GET    /api/admin/role-requests           - Get requests with filters
GET    /api/admin/role-requests/:id       - Get request details
POST   /api/admin/role-requests/:id/approve - Approve request
POST   /api/admin/role-requests/:id/reject  - Reject request
```

#### Frontend (React)

**New Pages:**
1. **RoleSelection** (`/role-selection`)
   - 7 role cards with icons and descriptions
   - User selects their desired role
   - Includes: Event Owner, Catering, Decoration, Photography, Job Seeker, Mahal Owner, Others

2. **RoleForm** (`/role-form/:role`)
   - Dynamic form based on selected role
   - Role-specific fields:
     - **Event Owner**: Business name, description, category, experience
     - **Catering**: Cuisine types, capacity, price range, specialities
     - **Decoration**: Theme types, experience, portfolio URL
     - **Photography**: Style, experience, portfolio URL
     - **Job Seeker**: Job title, industry, experience, skills
     - **Mahal Owner**: Venue name, capacity, type, description
     - **Others**: Custom service description
   - File upload for documents

3. **PendingApproval** (`/pending-approval`)
   - Shows application under review
   - Auto-refreshes every 10 seconds
   - Displays timeline of application status
   - Shows estimated review time (24-48 hours)

4. **PartnerDashboard** (`/partner-dashboard`)
   - Shows all active approved roles
   - Displays pending applications
   - "Apply for More Roles" button
   - Quick action buttons

5. **ApplicationRejected** (`/application-rejected`)
   - Shows rejection reason
   - Helpful tips for reapplication
   - "Apply Again" button

**Components:**
- **RoleRequestManagement** - Admin interface with:
  - Filter by status (pending/approved/rejected)
  - Request list with user info
  - Modal for request details
  - Approval/rejection interface
  - Admin notes field

**Updated Pages:**
- **Home.js** - Added "Become a Partner" CTA section
- **AdminPanel.js** - Added "Role Requests" tab
- **App.js** - Added all new routes

## User Flow Diagram

```
┌─────────────────────────────────────┐
│  1. SIGNUP                          │
│  - User creates account as customer │
│  - Role = 'customer'                │
│  - Status = 'active'                │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  2. CUSTOMER DASHBOARD              │
│  - Browse events/jobs/services      │
│  - See "Become a Partner" button    │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  3. ROLE SELECTION PAGE             │
│  - Choose from 7 roles              │
│  - See role descriptions            │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  4. ROLE-SPECIFIC FORM              │
│  - Fill dynamic form                │
│  - Upload documents                 │
│  - Submit application               │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  5. PENDING APPROVAL                │
│  - Status = 'pending'               │
│  - Show 24-48 hour timeline         │
│  - Auto-refresh page                │
└────────────┬────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────┐
│  6. ADMIN REVIEW                            │
│  - Admin logs into /admin                   │
│  - Click "Role Requests" tab                │
│  - View pending requests                    │
│  - See request details & documents          │
└──────┬────────────────────┬─────────────────┘
       │                    │
       ▼                    ▼
┌──────────────────┐  ┌──────────────────────┐
│  7A. APPROVED    │  │  7B. REJECTED       │
│  - Status changed│  │  - Status changed   │
│  - Role added    │  │  - Reason stored    │
│  - User notified │  │  - User notified    │
│  - Access        │  │  - Can reapply      │
│    dashboard     │  │                     │
└──────────────────┘  └──────────────────────┘
```

## Testing the System

### Test Scenario 1: Complete Happy Path
1. Signup new account at `/signup`
   - Enter: name, email, password, phone, city
   - Leave role as default (customer)
   
2. Login with new account
   - Go to `/home`
   - See "Become a Partner" section
   
3. Apply for role
   - Click "Start Your Partnership Journey"
   - Select role (e.g., "Catering Service")
   - Fill form with test data
   - Submit application
   - See pending approval screen
   
4. Admin review
   - Login with admin account (change user role to 'admin' in database)
   - Go to `/admin`
   - Click "Role Requests" tab
   - Find pending request
   - Click on request to see details
   - Click "Approve" button
   - Optionally add admin notes
   
5. User sees approval
   - Go back to pending approval page (auto-refreshes)
   - See approval status
   - See "Access Dashboard" button
   
6. Access partner dashboard
   - Click "Access Dashboard"
   - See active roles
   - See partner dashboard features

### Test Scenario 2: Rejection Path
1. Submit role application (follow steps 1-3 above)

2. Admin review
   - Go to admin role requests
   - Select pending request
   - Enter rejection reason (required)
   - Click "Reject"
   
3. User sees rejection
   - Page auto-refreshes
   - Shows rejection screen with reason
   - See "Apply Again" button
   - Can reapply with improved info

## Database Setup

### Create Test Admin User
```javascript
// In your MongoDB, update a user to be admin:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Check RoleRequests
```javascript
// View all pending requests:
db.rolerequests.find({ status: "pending" })

// View specific user's requests:
db.rolerequests.find({ userId: ObjectId("...") })
```

## API Testing with Postman

### 1. Submit Role Request
```
POST http://localhost:5000/api/auth/submit-role-request
Headers: Authorization: Bearer {token}
Body: {
  "requestedRole": "catering",
  "formData": {
    "businessName": "Delicious Catering",
    "cuisineTypes": ["Indian", "Continental"],
    "capacity": 500,
    "priceRange": "500-2000",
    "specialities": ["Live counters", "Customized menus"]
  },
  "documents": [
    {
      "name": "business_license.pdf",
      "url": "/documents/business_license.pdf"
    }
  ]
}
```

### 2. Get Pending Requests
```
GET http://localhost:5000/api/auth/pending-requests
Headers: Authorization: Bearer {token}
```

### 3. Get Request Status
```
GET http://localhost:5000/api/auth/request-status/{requestId}
Headers: Authorization: Bearer {token}
```

### 4. Admin Approve Request
```
POST http://localhost:5000/api/admin/role-requests/{requestId}/approve
Headers: Authorization: Bearer {adminToken}
Body: {
  "adminNotes": "Application looks good! Welcome aboard."
}
```

### 5. Admin Reject Request
```
POST http://localhost:5000/api/admin/role-requests/{requestId}/reject
Headers: Authorization: Bearer {adminToken}
Body: {
  "rejectionReason": "Your business license has expired. Please renew and reapply."
}
```

## Features Breakdown

### ✅ Role Selection
- 7 different partner role options
- Beautiful card UI with emojis
- Clear descriptions for each role
- One role selected at a time

### ✅ Dynamic Forms
Each role has specific form fields:
- **Event Owner**: Business details, experience
- **Catering**: Cuisine types, capacity, pricing
- **Decoration**: Theme types, portfolio
- **Photography**: Style, portfolio
- **Job Seeker**: Skills, experience
- **Mahal Owner**: Venue details
- **Others**: General service description

### ✅ Document Upload
- Multiple file upload support
- File tracking in application
- Files linked to role request

### ✅ Application Status Tracking
- Timeline view of application
- Auto-refresh every 10 seconds
- Real-time status updates
- Estimated review time shown

### ✅ Admin Dashboard
- Tab for managing role requests
- Filter by status (pending/approved/rejected)
- Detailed request view
- Inline approval/rejection
- Admin notes field
- Rejection reason field

### ✅ User Notifications
- Pending screen with timeline
- Rejection screen with reason
- Approval confirmation
- Automatic page refreshes

## Customization Guide

### Add New Role Type
1. Add role to enum in `RoleRequest.js` model
2. Add role to enum in `User.js` (businessDetails, etc.)
3. Add role card to `RoleSelection.js`
4. Add form fields to `RoleForm.js` switch statement
5. Add role icon and title to helper functions

### Change Approval Timeline
- Update `estimatedTime` in `PendingApproval.js` component
- Update backend auto-refresh interval (default 10 seconds)

### Add Email Notifications
- Install nodemailer: `npm install nodemailer`
- Add email sending to `approveRoleRequest` and `rejectRoleRequest`
- Create email templates for notifications

### Add Document Verification
- Integrate with document validation service
- Store document verification status in `RoleRequest`
- Add verification steps to admin interface

## Troubleshooting

### Issue: "Admin access required" error
**Solution**: Make sure the user's role is set to 'admin' in the database

### Issue: Form not submitting
**Solution**: Check that all required fields are filled. Check browser console for validation errors.

### Issue: Admin can't see requests
**Solution**: Make sure you're logged in as admin and viewing the correct tab in AdminPanel

### Issue: Status not updating
**Solution**: Check that MongoDB is running. Verify RoleRequest documents are being created.

### Issue: File upload not working
**Solution**: In production, set up cloud storage (AWS S3, Cloudinary, etc.) instead of local file paths

## Next Steps

1. **Email Integration**: Add email notifications when applications are approved/rejected
2. **Role-Specific Dashboards**: Create dedicated dashboards for each role type
3. **Document Verification**: Add OCR/automated document verification
4. **Ratings & Reviews**: Allow customers to rate/review partners
5. **Payment Integration**: Enable payments for premium partner features
6. **Analytics**: Track application metrics and conversion rates
7. **Automation**: Auto-approve applications meeting certain criteria

## Support
For issues or questions, refer to the API documentation at `/API_DOCUMENTATION.md`

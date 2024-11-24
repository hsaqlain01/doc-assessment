# Document Approval System - Backend

A Node.js/Express backend API for a document approval system with MongoDB database.

## Features

- 🔐 JWT Authentication
- 🗄️ MongoDB Database
- 📁 File Upload Management
- 🔒 Role-based Authorization
- 📑 Document Workflow
- 🚀 RESTful API

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Multer
- Express Validator

## Prerequisites

- Node.js (version 16 or later)
- MongoDB (version 4.4 or later)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd document-approval-backend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create .env file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/document-approval
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

4. Start the server:

```bash
# Development
npm run dev

# Production
npm start
```

## Project Structure

```
src/
├── config/
│   └── db.ts
├── controllers/
│   ├── auth.controller.ts
│   └── document.controller.ts
├── middleware/
│   ├── auth.ts
│   └── upload.ts
├── models/
│   ├── User.ts
│   └── Document.ts
├── routes/
│   ├── auth.routes.ts
│   └── document.routes.ts
├── services/
├── utils/
└── app.ts
```

## API Endpoints

### Authentication

### MANAGER Credentials

email: manager@gmail.com
password: 123456@aA

**Note:** Any user registered through the front end will automatically be assigned the role of 'user'.

```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
```

### Documents

```
GET    /api/documents     - Get all documents
POST   /api/documents     - Create new document
PUT    /api/documents/:id/approve - Approve document
PUT    /api/documents/:id/reject  - Reject document
```

## Environment Variables

| Variable       | Description               | Required |
| -------------- | ------------------------- | -------- |
| PORT           | Server Port               | Yes      |
| MONGODB_URI    | MongoDB Connection String | Yes      |
| JWT_SECRET     | JWT Secret Key            | Yes      |
| JWT_EXPIRES_IN | JWT Expiration Time       | No       |

## Database Models

### User Model

```typescript
{
  name: string;
  email: string;
  password: string;
  role: enum['USER', 'MANAGER', 'ADMIN'];
  createdAt: Date;
  updatedAt: Date;
}
```

### Document Model

```typescript
{
  title: string;
  description: string;
  submittedBy: ObjectId;
  approver: {
    user: ObjectId;
    status: enum['PENDING', 'APPROVED', 'REJECTED'];
    comment: string;
    timestamp: Date;
  };
  status: enum['PENDING', 'APPROVED', 'REJECTED'];
  attachments: [{
    filename: string;
    originalName: string;
    path: string;
    mimeType: string;
    size: number;
  }];
  createdAt: Date;
  updatedAt: Date;
}
```

## File Upload

Files are handled using Multer middleware:

- Supported formats: PDF, JPEG, PNG
- Max file size: 5MB
- Files are stored in `uploads/` directory

## Error Handling

The API uses a centralized error handling middleware that returns errors in the format:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "details": {} // Optional additional details
  }
}
```

## Development

```bash
# Run in development mode
npm run dev

# Build TypeScript
npm run build
```

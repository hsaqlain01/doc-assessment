# Document Approval System - Frontend

A React-based frontend for a document approval system that allows users to create, view, and manage documents with an approval workflow.

## Features

- 🔐 User Authentication (Login/Register)
- 📑 Document Management
- 👥 Role-based Access Control
- 📁 File Upload & Preview
- ✅ Document Approval Workflow
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Headless UI
- React Hook Form
- Axios
- React Hot Toast

## Prerequisites

- Node.js (version 16 or later)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd document-approval-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create .env file:

```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
├── components/
│   ├── auth/
│   ├── documents/
│   ├── ui/
│   └── common/
├── pages/
│   ├── auth/
│   ├── documents/
│   └── dashboard/
├── store/
│   ├── slices/
│   └── store.ts
├── services/
├── layouts/
├── utils/
├── types/
└── App.tsx
```

## Available Scripts

```bash
# Start development server
npm start
```

## Environment Variables

| Variable          | Description     | Default               |
| ----------------- | --------------- | --------------------- |
| REACT_APP_API_URL | Backend API URL | http://localhost:5000 |

## Features in Detail

### Authentication

- Login with email and password
- Registration for new users
- Protected routes
- Role-based access control

### Document Management

- Create new documents with file attachments
- View list of documents with status
- Document details view with file preview
- Approve/Reject documents (Manager role)

### User Interface

- Clean, modern design with Tailwind CSS
- Responsive layout
- Loading states
- Error handling
- Toast notifications
- Modal dialogs

## API Integration

The frontend communicates with the backend using Axios. API service configuration can be found in `src/services/api.ts`.

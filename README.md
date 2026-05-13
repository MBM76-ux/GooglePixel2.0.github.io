# Student Management System - CRUD Application

A full-stack Single Page Application (SPA) built with React, Firebase Firestore, and React Router DOM.

## Project Overview

This is a comprehensive CRUD (Create, Read, Update, Delete) application for managing student information. The application demonstrates:

- **SPA Routing**: Using React Router DOM for seamless navigation
- **Firebase Firestore**: Cloud database for data persistence
- **Dynamic Routing**: View and edit individual student records
- **Real-time UI Updates**: Immediate feedback after database operations

## Features

✨ **Create**: Add new student records with form validation
📋 **Read**: View all students in a card-based layout
👤 **Read Single**: Dynamic routing to view individual student details
✏️ **Update**: Edit existing student records with pre-filled forms
🗑️ **Delete**: Remove student records with confirmation

## Tech Stack

- **Frontend**: React 19.2.4, React Router DOM 7.15.0
- **Backend**: Firebase Firestore
- **Build Tool**: Vite 8.0.1
- **Styling**: CSS3
- **Deployment**: Firebase Hosting

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-app

# Install dependencies
npm install

# Set up Firebase (already configured)
# Update src/firebase/firebaseConfig.js if needed with your Firebase credentials
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

### Deployment
```bash
firebase deploy
```

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreateItemPage.jsx
│   │   │   ├── ViewAllPage.jsx
│   │   │   ├── ViewSinglePage.jsx
│   │   │   ├── EditItemPage.jsx
│   │   │   └── PageNotFound.jsx
│   │   └── StudentForm.jsx
│   ├── firebase/
│   │   └── firebaseConfig.js
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
├── public/
├── dist/
├── firebase.json
├── vite.config.js
└── package.json
```

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | HomePage | Landing page with action buttons |
| `/create` | CreateItemPage | Form to add new students |
| `/items` | ViewAllPage | Display all students |
| `/items/:id` | ViewSinglePage | View single student details |
| `/edit/:id` | EditItemPage | Edit student record |
| `*` | PageNotFound | 404 error page |

## Firestore Collection

**Collection**: `students`

**Document Structure**:
```json
{
  "name": "Student Name",
  "rollNo": "Roll Number",
  "department": "BSCS",
  "semester": "4",
  "createdAt": "timestamp"
}
```

## Environment Setup

The Firebase configuration is located in `src/firebase/firebaseConfig.js`:
- Project ID: `pixel-eee3d`
- Authentication: Firestore Rules configured
- Hosting: Firebase Hosting enabled

## Features Implemented

✅ Task 1: SPA Routing with React Router DOM
- Multiple routes with dynamic parameters
- Consistent Navbar layout
- No page reloads during navigation

✅ Task 2: CRUD Operations with Firestore
- Create: Form submission to Firestore
- Read: Fetch and display all documents
- Read (Single): Dynamic routing with document fetching
- Update: Pre-filled form with Firestore update
- Delete: With UI confirmation and immediate update

✅ Task 3: Deployment
- Deployed on Firebase Hosting
- Live URL: https://pixel-app-b4761.web.app

✅ Task 4: GitHub Repository
- Complete source code with proper structure
- Comprehensive README documentation

## Live URL

🚀 **Hosted Application**: https://pixel-app-b4761.web.app

## License

ISC

## Author

BSCS Student - University of Lahore (Spring 2026)

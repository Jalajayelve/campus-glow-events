
# Event Management System

This project uses:
- Flask (Python) for the backend API
- Firebase Firestore for data storage
- React for the frontend

## Setup Instructions

### 1. Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore in your project
3. Generate a private key for Firebase Admin SDK:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `serviceAccountKey.json` in the project root

### 2. Backend Setup

1. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Start the Flask server:
   ```
   python app.py
   ```

### 3. Frontend Setup

1. Install Node.js dependencies:
   ```
   npm install
   ```

2. Build the React app:
   ```
   npm run build
   ```

### 4. Initialize Demo Data

Once the app is running, click the "Initialize Demo Data" button on the home page or events page to populate the database with sample events.

## Features

- **Firebase Integration**: All event data is stored in Firestore
- **Search Functionality**: Search for events by title, description, organizer, category, or location
- **Filter Events**: Filter events by category, date range, and sort by various criteria
- **Join Events**: Track event attendance
- **Google Calendar Integration**: Add events to your Google Calendar

## API Endpoints

- `GET /api/events`: Retrieve all events (with optional search and category filters)
- `GET /api/events/<event_id>`: Get a specific event
- `POST /api/events`: Create a new event
- `POST /api/events/<event_id>/join`: Join an event (increase attendee count)
- `POST /api/init-demo-data`: Initialize demo data in Firestore

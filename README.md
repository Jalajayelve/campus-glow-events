
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
   - Replace the placeholder values in the file with your Firebase service account credentials

### 2. Backend Setup

1. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Start the Flask server:
   ```
   python app.py
   ```
   The server will run on http://localhost:5000

### 3. Frontend Setup

1. Install Node.js dependencies:
   ```
   npm install
   ```

2. Build the React app:
   ```
   npm run build
   ```

3. For development, you can run:
   ```
   npm run dev
   ```

### 4. Initialize Demo Data

Once the app is running:
1. Visit the homepage or events page
2. Click the "Initialize Demo Data" button to populate the database with sample events
3. You should see events appear in the application

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

## Troubleshooting

- If you encounter issues with Firebase authentication, make sure your `serviceAccountKey.json` file contains valid credentials
- If the Flask server fails to start, check if port 5000 is available
- If no events appear, try initializing the demo data using the provided button
- For search issues, make sure both the backend and frontend are running

## Search Functionality

The search feature allows you to:
1. Search from the navigation bar at the top of any page
2. Search from the dedicated search bar on the Events page
3. Results will dynamically update as you type (on the Events page)
4. Search covers event titles, descriptions, organizers, locations, and categories

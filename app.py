
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import json
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__, static_folder='dist')
CORS(app)  # Enable CORS for all routes

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# API Routes
@app.route('/api/events', methods=['GET'])
def get_events():
    search = request.args.get('search', '').lower()
    category = request.args.get('category', '').lower()
    
    # Get all events from Firestore
    events_ref = db.collection('events')
    query = events_ref
    
    # Apply category filter in the query if specified
    if category and category != 'all':
        query = query.where('category', '==', category)
    
    # Get all matching documents
    event_docs = query.get()
    events = [doc.to_dict() for doc in event_docs]
    
    # Apply search filter (Firestore doesn't support full text search out of the box)
    if search:
        events = [
            event for event in events
            if search in event.get('title', '').lower() or 
               search in event.get('description', '').lower() or
               search in event.get('organizer', '').lower() or
               search in event.get('category', '').lower() or
               search in event.get('location', '').lower()
        ]
    
    # Ensure all events have an id field
    for event in events:
        if 'id' not in event:
            event['id'] = event.get('_id', 'event-' + str(hash(event.get('title', ''))))
    
    return jsonify(events)

@app.route('/api/events/<event_id>', methods=['GET'])
def get_event(event_id):
    event_doc = db.collection('events').document(event_id).get()
    if event_doc.exists:
        event_data = event_doc.to_dict()
        # Ensure id is set
        if 'id' not in event_data:
            event_data['id'] = event_id
        return jsonify(event_data)
    return jsonify({"error": "Event not found"}), 404

@app.route('/api/events', methods=['POST'])
def create_event():
    if not request.json:
        return jsonify({"error": "Invalid request"}), 400
    
    new_event = request.json
    
    # Generate a new ID
    event_ref = db.collection('events').document()
    new_event['id'] = event_ref.id
    new_event['attendees'] = new_event.get('attendees', 0)
    
    # Save to Firestore
    event_ref.set(new_event)
    
    return jsonify(new_event), 201

@app.route('/api/events/<event_id>/join', methods=['POST'])
def join_event(event_id):
    event_ref = db.collection('events').document(event_id)
    event_doc = event_ref.get()
    
    if not event_doc.exists:
        return jsonify({"error": "Event not found"}), 404
    
    event_data = event_doc.to_dict()
    attendees = event_data.get('attendees', 0) + 1
    
    # Update attendees count
    event_ref.update({'attendees': attendees})
    
    # Get updated document
    updated_event = event_ref.get().to_dict()
    # Ensure id is set
    if 'id' not in updated_event:
        updated_event['id'] = event_id
    
    return jsonify(updated_event)

@app.route('/api/init-demo-data', methods=['POST'])
def init_demo_data():
    """Initialize demo data in Firestore if collection is empty"""
    events_ref = db.collection('events')
    if len(list(events_ref.limit(1).get())) > 0:
        return jsonify({"message": "Data already exists"}), 200
    
    # Sample demo data
    demo_events = [
        {
            "id": "event-1",
            "title": "AI Workshop Series",
            "description": "Learn the fundamentals of AI and machine learning in this hands-on workshop series.",
            "date": "April 22, 2025",
            "time": "2:00 PM - 5:00 PM",
            "location": "Engineering Block, Room 302",
            "organizer": "AI Club",
            "attendees": 54,
            "category": "Workshop",
            "imageUrl": "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        },
        {
            "id": "event-2",
            "title": "Spring Cultural Night",
            "description": "Experience diverse cultures through performances, music, food, and more.",
            "date": "April 25, 2025",
            "time": "6:00 PM - 10:00 PM",
            "location": "Student Center",
            "organizer": "Cultural Committee",
            "attendees": 142,
            "category": "Cultural",
            "imageUrl": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        },
        {
            "id": "featured-1",
            "title": "Annual Tech Fest 2025",
            "description": "Join us for the biggest tech event of the year with workshops, hackathons, and exciting tech talks from industry leaders. Network with professionals and showcase your skills!",
            "date": "May 15, 2025",
            "time": "10:00 AM - 6:00 PM",
            "location": "Central Campus Auditorium",
            "organizer": "Computer Science Department",
            "attendees": 258,
            "category": "Technology",
            "spotlight": True,
            "imageUrl": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        },
        {
            "id": "event-3",
            "title": "Career Fair 2025",
            "description": "Connect with top employers, explore internship and job opportunities, and get your resume reviewed by industry professionals.",
            "date": "May 5, 2025",
            "time": "9:00 AM - 4:00 PM",
            "location": "Business School Atrium",
            "organizer": "Career Services",
            "attendees": 178,
            "category": "Career",
            "imageUrl": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        },
        {
            "id": "event-4",
            "title": "Entrepreneurship Summit",
            "description": "Learn from successful entrepreneurs, pitch your ideas, and network with potential investors and mentors.",
            "date": "April 29, 2025",
            "time": "10:00 AM - 5:00 PM",
            "location": "Innovation Center",
            "organizer": "Business Club",
            "attendees": 92,
            "category": "Business",
            "imageUrl": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        },
        {
            "id": "event-5",
            "title": "Photography Exhibition",
            "description": "View stunning photographs by talented student photographers and participate in photography workshops.",
            "date": "May 10, 2025",
            "time": "11:00 AM - 7:00 PM",
            "location": "Arts Building Gallery",
            "organizer": "Photography Club",
            "attendees": 65,
            "category": "Arts",
            "imageUrl": "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        },
        {
            "id": "event-6",
            "title": "Research Symposium",
            "description": "Explore groundbreaking research projects and presentations by faculty and graduate students.",
            "date": "May 18, 2025",
            "time": "1:00 PM - 6:00 PM",
            "location": "Science Complex, Hall A",
            "organizer": "Research Department",
            "attendees": 125,
            "category": "Academic",
            "imageUrl": "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        }
    ]
    
    # Add each event with its ID as the document ID
    for event in demo_events:
        event_id = event["id"]
        db.collection('events').document(event_id).set(event)
    
    return jsonify({"message": "Demo data initialized successfully"}), 201

# Serve static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)

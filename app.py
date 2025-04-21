
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import json
from datetime import datetime

app = Flask(__name__, static_folder='dist')
CORS(app)  # Enable CORS for all routes

# Sample events data - in a real app, this would come from a database
events = [
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
]

# API Routes
@app.route('/api/events', methods=['GET'])
def get_events():
    search = request.args.get('search', '').lower()
    category = request.args.get('category', '').lower()
    
    filtered_events = events
    
    # Apply search filter
    if search:
        filtered_events = [
            event for event in filtered_events
            if search in event['title'].lower() or 
               search in event['description'].lower() or
               search in event['organizer'].lower() or
               search in event['category'].lower() or
               search in event['location'].lower()
        ]
    
    # Apply category filter
    if category and category != 'all':
        filtered_events = [
            event for event in filtered_events
            if event['category'].lower() == category
        ]
    
    return jsonify(filtered_events)

@app.route('/api/events/<event_id>', methods=['GET'])
def get_event(event_id):
    for event in events:
        if event['id'] == event_id:
            return jsonify(event)
    return jsonify({"error": "Event not found"}), 404

@app.route('/api/events', methods=['POST'])
def create_event():
    if not request.json:
        return jsonify({"error": "Invalid request"}), 400
    
    new_event = request.json
    # Generate a new ID
    new_event['id'] = f"event-{len(events) + 1}"
    new_event['attendees'] = 0
    
    events.append(new_event)
    return jsonify(new_event), 201

@app.route('/api/events/<event_id>/join', methods=['POST'])
def join_event(event_id):
    for event in events:
        if event['id'] == event_id:
            event['attendees'] += 1
            return jsonify(event)
    return jsonify({"error": "Event not found"}), 404

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

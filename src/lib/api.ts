
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api';

// Function to fetch all events with optional search and category filters
export const fetchEvents = async (searchQuery: string = '', categoryFilter: string = 'all') => {
  try {
    const url = `${API_URL}/events?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(categoryFilter)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    toast.error('Failed to load events. Please try again.');
    return [];
  }
};

// Function to fetch a single event by ID
export const fetchEventById = async (eventId: string) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    toast.error('Failed to load event details. Please try again.');
    return null;
  }
};

// Function to join an event (increment attendee count)
export const joinEvent = async (eventId: string) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to join event');
    }
    
    const updatedEvent = await response.json();
    toast.success('Successfully joined the event!');
    return updatedEvent;
  } catch (error) {
    console.error('Error joining event:', error);
    toast.error('Failed to join the event. Please try again.');
    return null;
  }
};

// Function to create a new event
export const createEvent = async (eventData: any) => {
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    
    const newEvent = await response.json();
    toast.success('Event created successfully!');
    return newEvent;
  } catch (error) {
    console.error('Error creating event:', error);
    toast.error('Failed to create the event. Please try again.');
    return null;
  }
};

// Function to initialize demo data
export const initDemoData = async () => {
  try {
    const response = await fetch(`${API_URL}/init-demo-data`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to initialize demo data');
    }
    
    const result = await response.json();
    toast.success('Demo data initialized successfully!');
    return result;
  } catch (error) {
    console.error('Error initializing demo data:', error);
    toast.error('Failed to initialize demo data. Please try again.');
    return null;
  }
};

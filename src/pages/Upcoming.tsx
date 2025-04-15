import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { EventCardProps } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock,
  MapPin,
  User,
  Users,
  Calendar as CalendarIcon,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

// Mock data for upcoming events
const myEvents: EventCardProps[] = [
  {
    id: 'event-1',
    title: 'AI Workshop Series',
    description: 'Learn the fundamentals of AI and machine learning in this hands-on workshop series.',
    date: 'April 22, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Engineering Block, Room 302',
    organizer: 'AI Club',
    attendees: 54,
    category: 'Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'event-3',
    title: 'Career Fair 2025',
    description: 'Connect with top employers from various industries looking to hire fresh talent.',
    date: 'April 27, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'Business School Atrium',
    organizer: 'Career Services',
    attendees: 198,
    category: 'Career',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trending-3',
    title: 'Hackathon 2025',
    description: '24-hour coding marathon to solve real-world problems with technology.',
    date: 'May 5-6, 2025',
    time: 'Starts at 9:00 AM',
    location: 'CS Department Labs',
    organizer: 'Developer Student Club',
    attendees: 176,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
];

// Function to add event to Google Calendar
const addToGoogleCalendar = ({ title, description, location, date, time }: { 
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
}) => {
  try {
    // Parse the date and time (assuming format: "April 22, 2025" and "2:00 PM - 5:00 PM")
    const dateParts = date.split(', ');
    const monthDay = dateParts[0].split(' ');
    const month = getMonthNumber(monthDay[0]);
    const day = parseInt(monthDay[1]);
    const year = parseInt(dateParts[1]);
    
    // Parse time
    const timeParts = time.split(' - ');
    const startTime = convertTo24Hour(timeParts[0]);
    const endTime = timeParts.length > 1 ? convertTo24Hour(timeParts[1]) : '';
    
    // Format dates for Google Calendar
    const startDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}T${startTime.replace(':', '')}00`;
    let endDate = startDate;
    
    if (endTime) {
      endDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}T${endTime.replace(':', '')}00`;
    } else {
      // If no end time, default to 1 hour later
      endDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}T${(parseInt(startTime.split(':')[0]) + 1).toString().padStart(2, '0')}${startTime.split(':')[1]}00`;
    }
    
    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;
    
    // Open in new tab
    window.open(googleCalendarUrl, '_blank');
    
    toast.success("Event added to Google Calendar!");
  } catch (error) {
    console.error("Error adding to calendar:", error);
    toast.error("Failed to add event to calendar. Please try again.");
  }
};

// Helper function to convert month name to number
const getMonthNumber = (monthName: string) => {
  const months: { [key: string]: number } = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
  };
  return months[monthName];
};

// Helper function to convert 12-hour time to 24-hour time
const convertTo24Hour = (time12h: string) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  
  return `${hours.padStart(2, '0')}:${minutes}`;
};

const EventItem = ({ event, isToday }: { event: EventCardProps, isToday: boolean }) => {
  const navigate = useNavigate();
  
  const handleDetailsClick = () => {
    navigate(`/upcoming?event=${event.id}`);
  };
  
  const handleAddToCalendar = () => {
    addToGoogleCalendar({
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time
    });
  };
  
  return (
    <div className={cn(
      "relative pl-8 pr-4 py-5 border-l-2 glass-card rounded-r-lg mb-4",
      isToday ? "border-l-glow-DEFAULT" : "border-l-white/20",
      "animate-fade-in"
    )}>
      {isToday && (
        <Badge className="absolute -left-3 top-5 bg-glow-DEFAULT text-white border-0 px-3 animate-pulse-glow">
          Today
        </Badge>
      )}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-2">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-glow-DEFAULT" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5 text-glow-DEFAULT" />
              <span>{event.location}</span>
            </div>
            <Badge variant="outline" className="border-white/20 bg-white/5">
              {event.category}
            </Badge>
          </div>
          <div className="flex items-center text-xs gap-3">
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1" />
              <span>Organized by {event.organizer}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{event.attendees} attending</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleDetailsClick}>Details</Button>
          <Button 
            variant="default" 
            size="sm" 
            className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90"
            onClick={handleAddToCalendar}
          >
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

const EventDetails = ({ event, onClose }: { event: EventCardProps, onClose: () => void }) => {
  if (!event) return null;
  
  const handleAddToCalendar = () => {
    addToGoogleCalendar({
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time
    });
  };
  
  return (
    <div className="glass-card p-6 rounded-xl animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onClose} className="mr-3">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">{event.title}</h2>
      </div>
      
      <div className="mb-6">
        {event.imageUrl && (
          <div 
            className="w-full h-56 md:h-72 rounded-lg mb-6 bg-cover bg-center" 
            style={{ backgroundImage: `url(${event.imageUrl})` }}
          />
        )}
        
        <p className="text-lg mb-6">{event.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-glow-DEFAULT" />
              <span className="text-white/70">Date</span>
            </div>
            <p className="text-white font-medium">{event.date}</p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2 text-glow-DEFAULT" />
              <span className="text-white/70">Time</span>
            </div>
            <p className="text-white font-medium">{event.time}</p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2 text-glow-DEFAULT" />
              <span className="text-white/70">Location</span>
            </div>
            <p className="text-white font-medium">{event.location}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src="" />
              <AvatarFallback className="bg-glow-DEFAULT/20">{event.organizer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{event.organizer}</p>
              <p className="text-xs text-white/70">Organizer</p>
            </div>
          </div>
          
          <div className="flex items-center text-white/70">
            <Users className="h-5 w-5 mr-2" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline">Share Event</Button>
        <Button 
          className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90"
          onClick={handleAddToCalendar}
        >
          Add to Calendar
        </Button>
      </div>
    </div>
  );
};

const UpcomingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(null);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // Get event ID from URL query parameter
    const searchParams = new URLSearchParams(location.search);
    const eventId = searchParams.get('event');
    
    if (eventId) {
      // Find the event by ID
      const event = myEvents.find(e => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
        setOpen(true);
      }
    } else {
      setSelectedEvent(null);
      setOpen(false);
    }
  }, [location.search]);
  
  const handleCloseEventDetails = () => {
    setOpen(false);
    // Remove the event query parameter
    navigate('/upcoming');
  };

  const handleRegisterNow = () => {
    if (selectedEvent) {
      addToGoogleCalendar({
        title: selectedEvent.title,
        description: selectedEvent.description,
        location: selectedEvent.location,
        date: selectedEvent.date,
        time: selectedEvent.time
      });
    }
    setOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 md:pl-64">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Clock className="h-7 w-7 mr-3 text-glow-DEFAULT" />
              <h1 className="text-3xl font-bold">My Upcoming Events</h1>
            </div>
            
            <Button className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90">
              Calendar View
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {selectedEvent && !open ? (
                <EventDetails event={selectedEvent} onClose={handleCloseEventDetails} />
              ) : (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-glow-DEFAULT" />
                    <span>Upcoming Schedule</span>
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-md font-medium text-white/70 mb-4">April 22, 2025</h3>
                      <EventItem event={myEvents[0]} isToday={true} />
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-white/70 mb-4">April 27, 2025</h3>
                      <EventItem event={myEvents[1]} isToday={false} />
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-white/70 mb-4">May 5-6, 2025</h3>
                      <EventItem event={myEvents[2]} isToday={false} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="glass-card p-6 rounded-xl h-fit">
              <h2 className="text-xl font-semibold mb-6">Your Statistics</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70">Events attending</span>
                    <span className="text-xl font-semibold">3</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-glow-DEFAULT to-glow-secondary w-[30%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70">Events organized</span>
                    <span className="text-xl font-semibold">1</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-glow-DEFAULT to-glow-secondary w-[10%]"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-md font-medium mb-4">Communities</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-glow-DEFAULT/20">TS</AvatarFallback>
                        </Avatar>
                        <span>Tech Society</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-glow-DEFAULT/20">DS</AvatarFallback>
                        </Avatar>
                        <span>Design Club</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-6">
                    View All Communities
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Event Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 mr-2 text-glow-DEFAULT" />
                    <span className="text-white/70">Date</span>
                  </div>
                  <p className="text-white font-medium">{selectedEvent.date}</p>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 mr-2 text-glow-DEFAULT" />
                    <span className="text-white/70">Time</span>
                  </div>
                  <p className="text-white font-medium">{selectedEvent.time}</p>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 mr-2 text-glow-DEFAULT" />
                    <span className="text-white/70">Location</span>
                  </div>
                  <p className="text-white font-medium">{selectedEvent.location}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                <Button 
                  className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90"
                  onClick={handleRegisterNow}
                >
                  Add to Calendar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpcomingPage;

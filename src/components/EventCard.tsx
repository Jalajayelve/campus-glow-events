
import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  category: string;
  imageUrl?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  time,
  location,
  organizer,
  attendees,
  category,
  imageUrl,
}) => {
  const navigate = useNavigate();

  // Function to handle viewing event details
  const handleViewDetails = () => {
    navigate(`/upcoming?event=${id}`);
  };

  // Function to handle joining an event
  const handleJoinEvent = () => {
    // Create Google Calendar event
    addToGoogleCalendar({
      title,
      description,
      location,
      date,
      time
    });
    
    // Navigate to upcoming events
    navigate('/upcoming');
  };

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

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <div 
        className="h-48 bg-gradient-to-br from-glow-DEFAULT/20 to-glow-secondary/20 relative"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <Badge className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white border-0">
          {category}
        </Badge>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-glow-DEFAULT" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-glow-DEFAULT" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-glow-DEFAULT" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src="" />
              <AvatarFallback className="bg-glow-DEFAULT/20 text-xs">{organizer.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{organizer}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{attendees} attending</span>
          </div>
        </div>
        
        <div className="flex justify-between gap-2">
          <Button variant="secondary" className="w-1/2" onClick={handleViewDetails}>Details</Button>
          <Button variant="default" className="w-1/2 bg-glow-DEFAULT hover:bg-glow-DEFAULT/90" onClick={handleJoinEvent}>Join</Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;


import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventCardProps } from './EventCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FeaturedEventProps extends EventCardProps {
  spotlight?: boolean;
}

const FeaturedEvent: React.FC<FeaturedEventProps> = ({
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
  spotlight = false,
}) => {
  const navigate = useNavigate();
  
  const handleRegisterClick = () => {
    addToGoogleCalendar({
      title,
      description,
      location,
      date,
      time
    });
    navigate(`/upcoming?event=${id}`);
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
    <div className="relative h-[500px] rounded-xl overflow-hidden glass-card animate-fade-in">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black/70"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(217, 70, 239, 0.2))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>
      
      <div className="relative h-full flex flex-col justify-end p-8 z-10">
        {spotlight && (
          <Badge className="mb-4 bg-glow-DEFAULT text-white border-0 px-4 py-1.5 animate-pulse-glow">
            Spotlight Event
          </Badge>
        )}
        
        <Badge className="mb-4 bg-black/60 backdrop-blur-sm text-white border-0">
          {category}
        </Badge>
        
        <h2 className="text-4xl font-bold mb-3 text-glow">{title}</h2>
        <p className="text-lg text-white/80 mb-6 max-w-2xl">{description}</p>
        
        <div className="grid grid-cols-3 gap-6 mb-8 max-w-2xl">
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-glow-DEFAULT" />
              <span className="text-white/70">Date</span>
            </div>
            <p className="text-white font-medium">{date}</p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2 text-glow-DEFAULT" />
              <span className="text-white/70">Time</span>
            </div>
            <p className="text-white font-medium">{time}</p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2 text-glow-DEFAULT" />
              <span className="text-white/70">Location</span>
            </div>
            <p className="text-white font-medium">{location}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between max-w-2xl">
          <div className="flex items-center">
            <span className="text-white/70 mr-2">Organized by</span>
            <span className="text-white font-medium">{organizer}</span>
            <span className="mx-4 text-white/30">|</span>
            <div className="flex items-center text-white/70">
              <Users className="h-5 w-5 mr-2" />
              <span>{attendees} attending</span>
            </div>
          </div>
          
          <Button 
            className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90 button-glow"
            onClick={handleRegisterClick}
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;

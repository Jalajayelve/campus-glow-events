
import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

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
    // In a real app, this would add the user to event participants
    // For now, just navigate to upcoming events
    navigate('/upcoming');
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


import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventCardProps } from './EventCard';

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
          
          <Button className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90 button-glow">
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;

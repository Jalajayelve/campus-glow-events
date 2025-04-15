
import React from 'react';
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
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
  },
];

const EventItem = ({ event, isToday }: { event: EventCardProps, isToday: boolean }) => {
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
          <Button variant="outline" size="sm">Details</Button>
          <Button variant="default" size="sm" className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90">
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

const UpcomingPage = () => {
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
    </div>
  );
};

export default UpcomingPage;

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import EventCard, { EventCardProps } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Filter, 
  ListFilter,
  Search,
  Sliders,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import EventFormDialog from '@/components/EventFormDialog';

// Mock data for events
const allEvents: EventCardProps[] = [
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
    id: 'event-2',
    title: 'Spring Cultural Night',
    description: 'Experience diverse cultures through performances, music, food, and more.',
    date: 'April 25, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Student Center',
    organizer: 'Cultural Committee',
    attendees: 142,
    category: 'Cultural',
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
    id: 'event-4',
    title: 'Startup Pitch Competition',
    description: 'Pitch your innovative business ideas to a panel of investors and entrepreneurs.',
    date: 'May 2, 2025',
    time: '1:00 PM - 5:00 PM',
    location: 'Innovation Hub',
    organizer: 'Entrepreneurship Club',
    attendees: 76,
    category: 'Business',
  },
  {
    id: 'trending-1',
    title: 'Photography Exhibition',
    description: 'An exhibition showcasing the best photographs taken by students around campus.',
    date: 'April 23, 2025',
    time: '11:00 AM - 7:00 PM',
    location: 'Art Gallery',
    organizer: 'Photography Club',
    attendees: 89,
    category: 'Arts',
  },
  {
    id: 'trending-2',
    title: 'Debate Championship',
    description: 'Annual inter-college debate competition on contemporary social and political issues.',
    date: 'April 29, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Main Auditorium',
    organizer: 'Debate Society',
    attendees: 112,
    category: 'Academic',
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
  {
    id: 'featured-1',
    title: 'Annual Tech Fest 2025',
    description: 'Join us for the biggest tech event of the year with workshops, hackathons, and exciting tech talks from industry leaders.',
    date: 'May 15, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Central Campus Auditorium',
    organizer: 'Computer Science Department',
    attendees: 258,
    category: 'Technology',
  },
];

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 md:pl-64">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <Calendar className="h-7 w-7 mr-3 text-glow-DEFAULT" />
              <h1 className="text-3xl font-bold">Events</h1>
            </div>
            
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search events..." 
                  className="pl-10 bg-secondary/50 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Sliders className="h-4 w-4" />
              </Button>
              
              <EventFormDialog className="flex-shrink-0" />
            </div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full lg:w-40 bg-secondary/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-full lg:w-40 bg-secondary/50">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mx-auto">
              Load More Events
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;


import React, { useState, useEffect } from 'react';
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
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1529651737248-dad5e287768e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
];

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState<EventCardProps[]>(allEvents);
  
  // Apply filters whenever search, tab, sort, or category changes
  useEffect(() => {
    let result = [...allEvents];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter (time-based)
    if (currentTab !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      
      result = result.filter(event => {
        const eventDate = new Date(event.date).getTime();
        const weekLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).getTime();
        const monthLater = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).getTime();
        
        if (currentTab === 'today') {
          return eventDate === today;
        } else if (currentTab === 'week') {
          return eventDate >= today && eventDate <= weekLater;
        } else if (currentTab === 'month') {
          return eventDate >= today && eventDate <= monthLater;
        }
        return true;
      });
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(event => 
        event.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Apply sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.attendees - a.attendees);
    }
    
    setFilteredEvents(result);
  }, [searchQuery, currentTab, sortBy, categoryFilter]);
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };
  
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
              <Tabs defaultValue="all" className="w-full" value={currentTab} onValueChange={handleTabChange}>
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <Select defaultValue={sortBy} value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full lg:w-40 bg-secondary/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue={categoryFilter} value={categoryFilter} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full lg:w-40 bg-secondary/50">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 mt-8 text-center">
              <div className="mb-4 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-2" />
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
              </div>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setCurrentTab('all');
                setSortBy('newest');
                setCategoryFilter('all');
              }}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          )}
          
          {filteredEvents.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mx-auto">
                Load More Events
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EventsPage;

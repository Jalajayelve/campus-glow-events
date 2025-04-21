
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
import { toast } from 'sonner';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch events from Flask API
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/events?search=${searchQuery}&category=${categoryFilter}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch events when search or category changes
  useEffect(() => {
    fetchEvents();
  }, [searchQuery, categoryFilter]);
  
  // Apply client-side filters (tab and sort)
  useEffect(() => {
    let result = [...events];
    
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
    
    // Apply sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.attendees - a.attendees);
    }
    
    setFilteredEvents(result);
  }, [events, currentTab, sortBy]);
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };
  
  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Initialize demo data
  const initDemoData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/init-demo-data', {
        method: 'POST',
      });
      if (response.ok) {
        toast.success('Demo data initialized. Refreshing events...');
        fetchEvents();
      }
    } catch (error) {
      console.error('Error initializing demo data:', error);
      toast.error('Failed to initialize demo data');
    }
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
                  onChange={handleSearchChange}
                />
              </div>
              
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Sliders className="h-4 w-4" />
              </Button>
              
              <EventFormDialog className="flex-shrink-0" />
              
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={initDemoData}
                className="flex-shrink-0"
              >
                Init Demo Data
              </Button>
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
          
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glow-DEFAULT"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
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
              <Button variant="outline" className="mx-auto" onClick={fetchEvents}>
                Refresh Events
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EventsPage;

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
import { fetchEvents, initDemoData as initDemoDataApi } from '@/lib/api';
import { useLocation, useNavigate } from 'react-router-dom';
import EventSearchBar from "@/components/events/EventSearchBar";
import EventFilters from "@/components/events/EventFilters";
import EventList from "@/components/events/EventList";

// Helper function to get URL parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EventsPage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const initialSearch = query.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentTab, setCurrentTab] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch events from API
  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await fetchEvents(searchQuery, categoryFilter);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch events when component mounts or when search/category changes
  useEffect(() => {
    loadEvents();
    // Update URL with search query if it exists
    if (searchQuery) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`, { replace: true });
    }
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
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadEvents();
  };
  
  // Initialize demo data
  const initDemoData = async () => {
    try {
      const result = await initDemoDataApi();
      if (result) {
        toast.success('Demo data initialized. Refreshing events...');
        loadEvents();
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
              <EventSearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearchSubmit}
              />
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
            <EventFilters
              currentTab={currentTab}
              onTabChange={handleTabChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              categoryFilter={categoryFilter}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <EventList
            isLoading={isLoading}
            filteredEvents={filteredEvents}
            onClearFilters={() => {
              setSearchQuery("");
              setCurrentTab("all");
              setSortBy("newest");
              setCategoryFilter("all");
              navigate("/events", { replace: true });
            }}
            onRefresh={loadEvents}
            currentTab={currentTab}
            setSearchQuery={setSearchQuery}
            setCurrentTab={setCurrentTab}
            setSortBy={setSortBy}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
      </main>
    </div>
  );
};

export default EventsPage;


import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import EventCard, { EventCardProps } from '@/components/EventCard';
import FeaturedEvent from '@/components/FeaturedEvent';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchEvents, initDemoData as initDemoDataApi } from '@/lib/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredEvent, setFeaturedEvent] = useState<any>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventCardProps[]>([]);
  const [trendingEvents, setTrendingEvents] = useState<EventCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Fetch all events from the API
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const events = await fetchEvents();
        
        if (events.length === 0) {
          setIsLoading(false);
          return;
        }
        
        // Find featured event
        const featured = events.find((event: any) => event.spotlight === true);
        if (featured) {
          setFeaturedEvent(featured);
        }
        
        // Get upcoming events (exclude featured)
        const upcoming = events
          .filter((event: any) => !event.spotlight)
          .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 4);
        setUpcomingEvents(upcoming);
        
        // Get trending events (by attendees)
        const trending = [...events]
          .filter((event: any) => !event.spotlight)
          .sort((a: any, b: any) => b.attendees - a.attendees)
          .slice(0, 3);
        setTrendingEvents(trending);
      } catch (error) {
        console.error('Error loading events:', error);
        setLoadError('Unable to connect to the backend server. Please ensure your Flask server is running on http://localhost:5000.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, []);
  
  // Function to handle the "View All" button click for upcoming events
  const handleViewAllUpcoming = () => {
    navigate('/upcoming');
  };

  // Initialize demo data if needed
  const initDemoData = async () => {
    try {
      setIsLoading(true);
      const result = await initDemoDataApi();
      if (result) {
        toast.success('Demo data initialized. Refreshing page...');
        setTimeout(() => window.location.reload(), 1500); // Reload the page after a delay
      }
    } catch (error) {
      console.error('Error initializing demo data:', error);
      toast.error('Failed to initialize demo data. Please ensure your Flask server is running on http://localhost:5000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 md:pl-64">
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center p-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glow-DEFAULT"></div>
            </div>
          ) : (
            <>
              {loadError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
                  <h3 className="text-lg font-medium text-red-500 mb-2">Connection Error</h3>
                  <p className="text-muted-foreground">{loadError}</p>
                </div>
              )}
              
              {(!featuredEvent && !upcomingEvents.length) || loadError ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                  <h2 className="text-2xl font-bold mb-4">No events found</h2>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Do you want to initialize demo data? Make sure your Flask backend is running on http://localhost:5000.
                  </p>
                  <Button 
                    onClick={initDemoData} 
                    className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Initializing...' : 'Initialize Demo Events'}
                  </Button>
                </div>
              ) : (
                <>
                  {featuredEvent && (
                    <section className="mb-12">
                      <FeaturedEvent {...featuredEvent} spotlight={true} />
                    </section>
                  )}
                  
                  {upcomingEvents.length > 0 && (
                    <section className="mb-12">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-6 w-6 mr-3 text-glow-DEFAULT" />
                          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <span>Filter</span>
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90"
                            onClick={handleViewAllUpcoming}
                          >
                            View All
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {upcomingEvents.map(event => (
                          <EventCard key={event.id} {...event} />
                        ))}
                      </div>
                    </section>
                  )}
                  
                  {trendingEvents.length > 0 && (
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <TrendingUp className="h-6 w-6 mr-3 text-glow-secondary" />
                          <h2 className="text-2xl font-semibold">Trending Now</h2>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate('/events')}
                        >
                          View All
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingEvents.map(event => (
                          <EventCard key={event.id} {...event} />
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

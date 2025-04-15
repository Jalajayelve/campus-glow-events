
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import EventCard, { EventCardProps } from '@/components/EventCard';
import FeaturedEvent from '@/components/FeaturedEvent';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, TrendingUp } from 'lucide-react';

// Mock data for events
const featuredEvent = {
  id: 'featured-1',
  title: 'Annual Tech Fest 2025',
  description: 'Join us for the biggest tech event of the year with workshops, hackathons, and exciting tech talks from industry leaders. Network with professionals and showcase your skills!',
  date: 'May 15, 2025',
  time: '10:00 AM - 6:00 PM',
  location: 'Central Campus Auditorium',
  organizer: 'Computer Science Department',
  attendees: 258,
  category: 'Technology',
  spotlight: true,
};

const upcomingEvents: EventCardProps[] = [
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
];

const trendingEvents: EventCardProps[] = [
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
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 md:pl-64">
        <div className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <FeaturedEvent {...featuredEvent} spotlight={true} />
          </section>
          
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
                <Button variant="default" size="sm" className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90">
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
          
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-glow-secondary" />
                <h2 className="text-2xl font-semibold">Trending Now</h2>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingEvents.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

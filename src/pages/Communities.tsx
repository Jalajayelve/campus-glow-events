
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Search, Users, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for communities
const communities = [
  {
    id: 'comm-1',
    name: 'Tech Society',
    description: 'A community for tech enthusiasts to collaborate, learn, and share knowledge.',
    members: 348,
    events: 12,
    image: '',
  },
  {
    id: 'comm-2',
    name: 'Design Club',
    description: 'For all design enthusiasts to showcase their creativity and collaborate on projects.',
    members: 215,
    events: 8,
    image: '',
  },
  {
    id: 'comm-3',
    name: 'Entrepreneurship Club',
    description: 'Connecting aspiring entrepreneurs and providing resources for startups.',
    members: 278,
    events: 10,
    image: '',
  },
  {
    id: 'comm-4',
    name: 'Photography Club',
    description: 'Capture moments, share techniques, and participate in photography contests.',
    members: 194,
    events: 7,
    image: '',
  },
  {
    id: 'comm-5',
    name: 'Debate Society',
    description: 'Enhance your public speaking and critical thinking skills through debates.',
    members: 165,
    events: 6,
    image: '',
  },
  {
    id: 'comm-6',
    name: 'Sports Club',
    description: 'For sports enthusiasts to participate in various inter and intra college events.',
    members: 312,
    events: 15,
    image: '',
  },
];

const myCommunities = communities.slice(0, 3);

const CommunityCard = ({ community }: { community: typeof communities[0] }) => {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 border-2 border-glow-DEFAULT/30">
          <AvatarImage src={community.image} />
          <AvatarFallback className="text-xl bg-glow-DEFAULT/20">{community.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{community.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{community.description}</p>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1.5 text-glow-DEFAULT" />
              <span>{community.members} members</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-glow-DEFAULT" />
              <span>{community.events} events</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Join Community
        </Button>
      </div>
    </div>
  );
};

const CommunitiesPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 md:pl-64">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <Users className="h-7 w-7 mr-3 text-glow-DEFAULT" />
              <h1 className="text-3xl font-bold">Communities</h1>
            </div>
            
            <div className="w-full md:w-auto flex items-center gap-4">
              <div className="relative flex-1 w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search communities..." 
                  className="pl-10 bg-secondary/50 w-full"
                />
              </div>
              
              <Button className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90 whitespace-nowrap">
                Create Community
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-secondary/50 mb-8">
              <TabsTrigger value="all">All Communities</TabsTrigger>
              <TabsTrigger value="my">My Communities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map(community => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </TabsContent>
            
            <TabsContent value="my">
              <div className="mb-8 glass-card rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Community Insights</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-black/30 rounded-lg p-4 text-center">
                    <p className="text-muted-foreground text-sm mb-1">Communities Joined</p>
                    <p className="text-3xl font-bold text-glow">{myCommunities.length}</p>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4 text-center">
                    <p className="text-muted-foreground text-sm mb-1">Total Events</p>
                    <p className="text-3xl font-bold text-glow">{myCommunities.reduce((sum, c) => sum + c.events, 0)}</p>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4 text-center">
                    <p className="text-muted-foreground text-sm mb-1">Active Discussions</p>
                    <p className="text-3xl font-bold text-glow">9</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCommunities.map(community => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">Discover more communities to join</p>
                <Button variant="outline">Browse Communities</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CommunitiesPage;

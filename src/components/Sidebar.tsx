
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Clock, Home, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import EventFormDialog from './EventFormDialog';

const sidebarItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: Clock, label: 'Upcoming', path: '/upcoming' },
  { icon: Users, label: 'Communities', path: '/communities' },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 pt-20 bg-black/60 backdrop-blur-lg border-r border-white/10 animate-slide-in">
      <div className="flex-1 px-4 py-6">
        <EventFormDialog 
          buttonClassName="w-full flex items-center justify-center gap-2 bg-glow-DEFAULT hover:bg-glow-DEFAULT/90 button-glow"
          size="lg"
        />
        
        <nav className="mt-8 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                  isActive 
                    ? "bg-secondary text-white" 
                    : "text-muted-foreground hover:text-white hover:bg-secondary/50"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-glow-DEFAULT")} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="px-4 py-5 border-t border-white/10">
        <div className="text-xs text-muted-foreground">
          <p>© 2025 CampusGlow</p>
          <p className="mt-1">Making campus events shine</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

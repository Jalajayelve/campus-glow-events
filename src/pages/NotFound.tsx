
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md mx-auto glass-card p-8 rounded-xl animate-fade-in">
        <Calendar className="h-16 w-16 mx-auto mb-6 text-glow-DEFAULT" />
        
        <h1 className="text-4xl font-bold mb-2 text-glow">404</h1>
        <p className="text-xl mb-6">Page not found</p>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="bg-glow-DEFAULT hover:bg-glow-DEFAULT/90 button-glow">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

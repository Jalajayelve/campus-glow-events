
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface EventSearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EventSearchBar: React.FC<EventSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmit
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync with parent component when searchQuery changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    onSubmit(e);
  };

  const handleClear = () => {
    setLocalQuery("");
    setSearchQuery("");
    // Submit the form with empty search to refresh results
    onSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        type="search" 
        placeholder="Search events..." 
        className="pl-10 bg-secondary/50 w-full pr-16"
        value={localQuery}
        onChange={handleChange}
      />
      {localQuery && (
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="absolute right-10 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default EventSearchBar;

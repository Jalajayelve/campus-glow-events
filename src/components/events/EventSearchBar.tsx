
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface EventSearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EventSearchBar: React.FC<EventSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmit
}) => (
  <form onSubmit={onSubmit} className="relative flex-1">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <Input 
      type="search" 
      placeholder="Search events..." 
      className="pl-10 bg-secondary/50 w-full"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
      <Search className="h-4 w-4" />
    </Button>
  </form>
);

export default EventSearchBar;

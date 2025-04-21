
import React from "react";
import EventCard, { EventCardProps } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventListProps {
  isLoading: boolean;
  filteredEvents: EventCardProps[];
  onClearFilters: () => void;
  onRefresh: () => void;
  currentTab: string;
  setSearchQuery: (s: string) => void;
  setCurrentTab: (s: string) => void;
  setSortBy: (s: string) => void;
  setCategoryFilter: (s: string) => void;
}

const EventList: React.FC<EventListProps> = ({
  isLoading,
  filteredEvents,
  onClearFilters,
  onRefresh,
}) => {
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glow-DEFAULT"></div>
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-8 text-center">
        <div className="mb-4 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
        <Button variant="outline" onClick={onClearFilters}>
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mx-auto" onClick={onRefresh}>
          Refresh Events
        </Button>
      </div>
    </>
  );
};

export default EventList;


import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventFiltersProps {
  currentTab: string;
  onTabChange: (val: string) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({
  currentTab,
  onTabChange,
  sortBy,
  onSortChange,
  categoryFilter,
  onCategoryChange
}) => (
  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
    <Tabs defaultValue="all" className="w-full" value={currentTab} onValueChange={onTabChange}>
      <TabsList className="bg-secondary/50">
        <TabsTrigger value="all">All Events</TabsTrigger>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="week">This Week</TabsTrigger>
        <TabsTrigger value="month">This Month</TabsTrigger>
      </TabsList>
    </Tabs>

    <div className="flex items-center gap-3 w-full lg:w-auto">
      <Select defaultValue={sortBy} value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full lg:w-40 bg-secondary/50">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue={categoryFilter} value={categoryFilter} onValueChange={onCategoryChange}>
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
);

export default EventFilters;

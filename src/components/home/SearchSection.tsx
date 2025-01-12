import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchSection = ({ searchTerm, onSearchChange, onSearchSubmit }: SearchSectionProps) => {
  return (
    <div className="relative h-[600px] -mt-24 mb-16 flex items-center justify-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
          Find Local Services in Geneva
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12">
          Connect with trusted local professionals for all your home service needs
        </p>

        {/* Search form */}
        <form onSubmit={onSearchSubmit} className="flex gap-2 max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="What service are you looking for?"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-14 text-lg bg-white/95 border-0 focus-visible:ring-2 focus-visible:ring-primary"
          />
          <Button type="submit" size="lg" className="h-14 px-8">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;
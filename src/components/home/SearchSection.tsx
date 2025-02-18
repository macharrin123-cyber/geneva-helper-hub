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
    <div className="relative h-[600px] -mt-24 w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage: 'url("/lovable-uploads/526ec159-afb3-4e91-ba4b-7aae426407d1.png")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
          Find Local Services in Geneva
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12">
          Connect with trusted local professionals for all your home service needs
        </p>

        {/* Search form - Updated for mobile responsiveness */}
        <form onSubmit={onSearchSubmit} className="flex flex-col md:flex-row gap-2 max-w-3xl mx-auto w-full">
          <Input
            type="text"
            placeholder="What service are you looking for?"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-14 text-lg bg-white/95 border-0 focus-visible:ring-2 focus-visible:ring-primary w-full"
          />
          <Button 
            type="submit" 
            size="lg" 
            className="h-14 px-8 mx-auto w-[200px] md:w-auto"
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;
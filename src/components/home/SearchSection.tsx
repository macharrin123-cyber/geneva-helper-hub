import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchSection = ({ searchTerm, onSearchChange, onSearchSubmit }: SearchSectionProps) => {
  const images = [
    "/lovable-uploads/f31f1b42-d528-48c6-b2e5-c0fc34ef5ccc.png",
    "/lovable-uploads/40b5fb57-dc21-41d9-9c43-e52b1471f8fb.png",
    "/lovable-uploads/c6d84094-8544-4ec0-a070-4ab3f541071a.png"
  ];

  return (
    <div className="relative h-[600px] -mt-24 w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
      {/* Carousel with background images */}
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                style={{ backgroundImage: `url("${image}")` }}
              >
                <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

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
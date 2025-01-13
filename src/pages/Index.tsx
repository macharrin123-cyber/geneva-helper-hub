import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import ServiceGrid from "@/components/ServiceGrid";
import SearchResults from "@/components/SearchResults";
import SearchSection from "@/components/home/SearchSection";
import FreelanceSection from "@/components/home/FreelanceSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import { HelpingHand } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Refs for sections we want to animate
  const servicesRef = useRef<HTMLDivElement>(null);
  const freelanceRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Marie Dubois",
      rating: 5,
      text: "Found an amazing electrician through this platform. Very reliable service!",
      service: "Electrical"
    },
    {
      name: "Thomas Weber",
      rating: 5,
      text: "As a part-time handyman, this platform helps me find clients easily. Great for flexible work!",
      service: "Carpentry"
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "The platform made it easy to find cleaning jobs that fit my schedule. Excellent for freelancers!",
      service: "Cleaning"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Outstanding platform for finding skilled professionals. The booking process was seamless!",
      service: "Plumbing"
    },
    {
      name: "Emma Rodriguez",
      rating: 5,
      text: "I've been using this service for both my home and office. The quality of work is consistently high.",
      service: "Painting"
    },
    {
      name: "David Kim",
      rating: 5,
      text: "As a service provider, I appreciate how easy it is to manage my schedule and connect with clients.",
      service: "Moving"
    },
    {
      name: "Sophie Martin",
      rating: 5,
      text: "The verification process gives me confidence in hiring professionals. Haven't been disappointed yet!",
      service: "Electrical"
    },
    {
      name: "James Wilson",
      rating: 5,
      text: "Great platform for finding reliable help. The rating system really helps in choosing the right person.",
      service: "Carpentry"
    }
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted with term:", searchTerm);
    // Scroll to search results after a small delay to ensure results are rendered
    setTimeout(() => {
      searchResultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <SearchSection 
            searchTerm={searchTerm}
            onSearchChange={(value) => setSearchTerm(value)}
            onSearchSubmit={handleSearch}
          />

          <div ref={searchResultsRef}>
            {searchTerm ? (
              <SearchResults searchTerm={searchTerm} />
            ) : (
              <>
                <div ref={servicesRef} className="transition-opacity duration-1000 ease-out">
                  <ServiceGrid />
                </div>
                
                <div ref={freelanceRef} className="transition-opacity duration-1000 ease-out">
                  <FreelanceSection />
                </div>

                <div ref={reviewsRef} className="transition-opacity duration-1000 ease-out">
                  <ReviewsSection reviews={reviews} />
                </div>

                <div className="flex items-center justify-center gap-2 py-12">
                  <HelpingHand className="h-12 w-12 text-primary" />
                  <h2 className="text-4xl font-bold text-primary font-poppins">
                    Helpify
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
import { FC, useState } from "react";
import SearchSection from "@/components/home/SearchSection";
import FreelanceSection from "@/components/home/FreelanceSection";
import ReviewsSection from "@/components/home/ReviewsSection";

const Home: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
    }
  ];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted:", searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <SearchSection 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <FreelanceSection />
      <ReviewsSection reviews={reviews} />
    </div>
  );
};

export default Home;
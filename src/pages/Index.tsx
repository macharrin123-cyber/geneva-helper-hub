import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServiceGrid from "@/components/ServiceGrid";
import SearchResults from "@/components/SearchResults";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSearched(true);
    console.log("Search submitted with term:", searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Local Services in Geneva
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with trusted local professionals for all your home service needs
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg w-full"
                />
              </div>
            </form>
          </div>

          {hasSearched ? (
            <SearchResults searchTerm={searchTerm} />
          ) : (
            <ServiceGrid />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
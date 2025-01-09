import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import ServiceGrid from "@/components/ServiceGrid";
import SearchResults from "@/components/SearchResults";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { t } = useLanguage();

  // Refs for sections we want to animate
  const servicesRef = useRef<HTMLDivElement>(null);
  const freelanceRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in', 'opacity-100');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    [servicesRef, freelanceRef, reviewsRef].forEach(ref => {
      if (ref.current) {
        ref.current.classList.add('opacity-0');
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSearched(true);
    console.log("Search submitted with term:", searchTerm);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('home.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('home.subtitle')}
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t('home.searchPlaceholder')}
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
            <>
              <div ref={servicesRef} className="transition-opacity duration-1000 ease-out">
                <ServiceGrid />
              </div>
              
              {/* Freelance Section */}
              <div ref={freelanceRef} className="mt-20 mb-16 bg-white rounded-lg shadow-lg p-8 transition-opacity duration-1000 ease-out">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Make Extra Income as a Service Provider
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Whether you're a professional or skilled individual, join our platform to offer your services. 
                      Set your own schedule, choose your services, and earn on your terms.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="p-6 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Flexible Schedule</h3>
                        <p className="text-gray-600">Work when it suits you - full-time, part-time, or weekends only</p>
                      </div>
                      <div className="p-6 bg-green-50 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Set Your Rates</h3>
                        <p className="text-gray-600">Choose your own hourly rate and the services you want to offer</p>
                      </div>
                      <div className="p-6 bg-purple-50 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Easy to Start</h3>
                        <p className="text-gray-600">Simple signup process - start earning as soon as you're verified</p>
                      </div>
                    </div>
                    <Link to="/signup">
                      <Button className="text-lg px-8 py-6">Join as a Service Provider</Button>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
                      alt="Happy person helping with moving service"
                      className="rounded-lg shadow-md w-full h-[500px] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div ref={reviewsRef} className="mb-20 transition-opacity duration-1000 ease-out">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                  What Our Community Says
                </h2>
                <Carousel className="w-full max-w-5xl mx-auto">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {reviews.map((review, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="bg-white p-6 rounded-lg shadow-md h-full">
                          <div className="flex items-center mb-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{review.name}</h3>
                              <p className="text-sm text-gray-500">{review.service}</p>
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-5 h-5 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.text}</p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
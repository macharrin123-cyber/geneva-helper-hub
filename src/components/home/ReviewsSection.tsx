import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";

interface Review {
  name: string;
  rating: number;
  text: string;
  service: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const isMobile = useIsMobile();
  
  const plugin = Autoplay({ delay: 3000, stopOnInteraction: true });

  return (
    <div className="mb-20 px-4 md:px-0">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
        What Our Community Says
      </h2>
      <Carousel 
        className="w-full max-w-5xl mx-auto"
        plugins={[plugin]}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review, index) => (
            <CarouselItem 
              key={index} 
              className={`pl-2 md:pl-4 ${
                isMobile ? 'basis-full' : 'md:basis-1/2 lg:basis-1/3'
              }`}
            >
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md h-full">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base md:text-lg">{review.name}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{review.service}</p>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-600">{review.text}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default ReviewsSection;
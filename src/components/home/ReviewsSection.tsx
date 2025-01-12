import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import AutoplayPlugin from "embla-carousel-autoplay";

interface Review {
  name: string;
  rating: number;
  comment: string;
  service: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const isMobile = useIsMobile();
  
  // Create a new instance of the plugin
  const autoplayPlugin = AutoplayPlugin({
    delay: 3000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  return (
    <div className="mb-20 px-4 md:px-0">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
        What Our Community Says
      </h2>
      <Carousel 
        className="w-full max-w-5xl mx-auto"
        plugins={[autoplayPlugin]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review, index) => (
            <CarouselItem 
              key={index}
              className={`pl-2 md:pl-4 ${isMobile ? 'basis-full' : 'basis-1/2 lg:basis-1/3'}`}
            >
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.service}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {!isMobile && (
          <>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ReviewsSection;
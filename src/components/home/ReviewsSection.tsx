import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="py-20 px-4 md:px-0" style={{
      background: "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)"
    }}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center"
      >
        What Our Community Says
      </motion.h2>
      
      <Carousel 
        className="w-full max-w-6xl mx-auto"
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
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg md:text-xl text-gray-900">{review.name}</h3>
                      <p className="text-sm md:text-base text-primary/80 font-medium mt-1">{review.service}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="bg-white/90 hover:bg-white border-gray-200 -left-12" />
          <CarouselNext className="bg-white/90 hover:bg-white border-gray-200 -right-12" />
        </div>
      </Carousel>
    </div>
  );
};

export default ReviewsSection;
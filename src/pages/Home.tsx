import { FC } from "react";
import SearchSection from "@/components/home/SearchSection";
import FreelanceSection from "@/components/home/FreelanceSection";
import ReviewsSection from "@/components/home/ReviewsSection";

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <SearchSection />
      <FreelanceSection />
      <ReviewsSection />
    </div>
  );
};

export default Home;
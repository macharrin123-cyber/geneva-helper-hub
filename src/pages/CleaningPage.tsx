import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 10, 
    name: "Sophie Martin", 
    rating: 4.8, 
    hourlyRate: 45, 
    yearsExperience: 8,
    phone: "+41 76 234 56 78",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  { 
    id: 11, 
    name: "Marc Dubois", 
    rating: 4.7, 
    hourlyRate: 40, 
    yearsExperience: 5,
    phone: "+41 76 345 67 89",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
];

const CleaningPage = () => {
  return <ServicePage serviceType="cleaning" providers={providers} />;
};

export default CleaningPage;
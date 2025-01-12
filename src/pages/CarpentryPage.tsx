import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 8, 
    name: "Antoine Richard", 
    rating: 4.9, 
    hourlyRate: 85, 
    yearsExperience: 18,
    phone: "+41 76 890 12 34",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
  { 
    id: 9, 
    name: "Claire Simon", 
    rating: 4.7, 
    hourlyRate: 75, 
    yearsExperience: 9,
    phone: "+41 76 901 23 45",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
];

const CarpentryPage = () => {
  return <ServicePage serviceType="carpentry" providers={providers} />;
};

export default CarpentryPage;
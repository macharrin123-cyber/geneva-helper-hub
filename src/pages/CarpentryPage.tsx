import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 8, 
    name: "Antoine Richard", 
    rating: 4.9, 
    hourlyRate: 85, 
    yearsExperience: 18,
    phone: "+41 76 890 12 34",
    image: "/photo-1581092795360-fd1ca04f0952"
  },
  { 
    id: 9, 
    name: "Claire Simon", 
    rating: 4.7, 
    hourlyRate: 75, 
    yearsExperience: 9,
    phone: "+41 76 901 23 45",
    image: "/photo-1649972904349-6e44c42644a7"
  },
];

const CarpentryPage = () => {
  return <ServicePage serviceType="carpentry" providers={providers} />;
};

export default CarpentryPage;
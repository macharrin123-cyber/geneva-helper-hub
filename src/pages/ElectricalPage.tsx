import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 4, 
    name: "Sophie Laurent", 
    rating: 4.7, 
    hourlyRate: 80, 
    yearsExperience: 12,
    phone: "+41 76 456 78 90",
    image: "/photo-1649972904349-6e44c42644a7"
  },
  { 
    id: 5, 
    name: "Lucas Moreau", 
    rating: 4.5, 
    hourlyRate: 70, 
    yearsExperience: 6,
    phone: "+41 76 567 89 01",
    image: "/photo-1581091226825-a6a2a5aee158"
  },
];

const ElectricalPage = () => {
  return <ServicePage serviceType="electrical" providers={providers} />;
};

export default ElectricalPage;
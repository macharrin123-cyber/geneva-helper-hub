import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 4, 
    name: "Sophie Laurent", 
    rating: 4.7, 
    hourlyRate: 80, 
    yearsExperience: 12,
    phone: "+41 76 456 78 90",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  { 
    id: 5, 
    name: "Lucas Moreau", 
    rating: 4.5, 
    hourlyRate: 70, 
    yearsExperience: 6,
    phone: "+41 76 567 89 01",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
];

const ElectricalPage = () => {
  return <ServicePage serviceType="electrical" providers={providers} />;
};

export default ElectricalPage;
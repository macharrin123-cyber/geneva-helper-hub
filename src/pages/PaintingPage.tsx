import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 6, 
    name: "Emma Petit", 
    rating: 4.8, 
    hourlyRate: 65, 
    yearsExperience: 10,
    phone: "+41 76 678 90 12",
    image: "/photo-1649972904349-6e44c42644a7"
  },
  { 
    id: 7, 
    name: "Thomas Dubois", 
    rating: 4.6, 
    hourlyRate: 60, 
    yearsExperience: 7,
    phone: "+41 76 789 01 23",
    image: "/photo-1581092795360-fd1ca04f0952"
  },
];

const PaintingPage = () => {
  return <ServicePage serviceType="painting" providers={providers} />;
};

export default PaintingPage;
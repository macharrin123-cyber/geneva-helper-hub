import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 1, 
    name: "Marc Dubois", 
    rating: 4.9, 
    hourlyRate: 95, 
    yearsExperience: 12,
    phone: "+41 76 567 89 01",
    image: "/photo-1581092795360-fd1ca04f0952"
  },
  { 
    id: 2, 
    name: "Sophie Laurent", 
    rating: 4.7, 
    hourlyRate: 85, 
    yearsExperience: 8,
    phone: "+41 76 678 90 12",
    image: "/photo-1649972904349-6e44c42644a7"
  },
  { 
    id: 3, 
    name: "Thomas Müller", 
    rating: 4.8, 
    hourlyRate: 90, 
    yearsExperience: 15,
    phone: "+41 76 789 01 23",
    image: "/photo-1486312338219-ce68d2c6f44d"
  },
];

const MovingPage = () => {
  return <ServicePage serviceType="moving" providers={providers} />;
};

export default MovingPage;
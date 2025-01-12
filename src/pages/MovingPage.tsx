import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 1, 
    name: "Marc Dubois", 
    rating: 4.9, 
    hourlyRate: 95, 
    yearsExperience: 12,
    phone: "+41 76 567 89 01",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  { 
    id: 2, 
    name: "Sophie Laurent", 
    rating: 4.7, 
    hourlyRate: 85, 
    yearsExperience: 8,
    phone: "+41 76 678 90 12",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  { 
    id: 3, 
    name: "Thomas Müller", 
    rating: 4.8, 
    hourlyRate: 90, 
    yearsExperience: 15,
    phone: "+41 76 789 01 23",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
];

const MovingPage = () => {
  return <ServicePage serviceType="moving" providers={providers} />;
};

export default MovingPage;
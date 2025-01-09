import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 1, 
    name: "Jean Dupont", 
    rating: 4.8, 
    hourlyRate: 85, 
    yearsExperience: 15,
    phone: "+41 76 123 45 67",
    image: "/photo-1581092795360-fd1ca04f0952"
  },
  { 
    id: 2, 
    name: "Marie Martin", 
    rating: 4.6, 
    hourlyRate: 75, 
    yearsExperience: 8,
    phone: "+41 76 234 56 78",
    image: "/photo-1649972904349-6e44c42644a7"
  },
  { 
    id: 3, 
    name: "Pierre Bernard", 
    rating: 4.9, 
    hourlyRate: 90, 
    yearsExperience: 20,
    phone: "+41 76 345 67 89",
    image: "/photo-1486312338219-ce68d2c6f44d"
  },
];

const PlumbingPage = () => {
  return <ServicePage serviceType="plumbing" providers={providers} />;
};

export default PlumbingPage;
import ServicePage from "@/components/ServicePage";

const providers = [
  { 
    id: 1, 
    name: "Jean Dupont", 
    rating: 4.8, 
    hourlyRate: 85, 
    yearsExperience: 15,
    phone: "+41 76 123 45 67",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
  { 
    id: 2, 
    name: "Marie Martin", 
    rating: 4.6, 
    hourlyRate: 75, 
    yearsExperience: 8,
    phone: "+41 76 234 56 78",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  { 
    id: 3, 
    name: "Pierre Bernard", 
    rating: 4.9, 
    hourlyRate: 90, 
    yearsExperience: 20,
    phone: "+41 76 345 67 89",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
];

const PlumbingPage = () => {
  return <ServicePage serviceType="plumbing" providers={providers} />;
};

export default PlumbingPage;
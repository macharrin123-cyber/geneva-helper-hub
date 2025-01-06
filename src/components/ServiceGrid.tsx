import { Link } from "react-router-dom";
import { Wrench, Zap, Paintbrush, Hammer, Trash2 } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Plumbing",
    icon: Wrench,
    description: "Professional plumbing services for your home",
    color: "bg-blue-100",
  },
  {
    id: 2,
    name: "Electrical",
    icon: Zap,
    description: "Licensed electricians for all your needs",
    color: "bg-yellow-100",
  },
  {
    id: 3,
    name: "Painting",
    icon: Paintbrush,
    description: "Transform your space with our painting services",
    color: "bg-red-100",
  },
  {
    id: 4,
    name: "Carpentry",
    icon: Hammer,
    description: "Expert carpentry and woodworking",
    color: "bg-orange-100",
  },
  {
    id: 5,
    name: "Cleaning",
    icon: Trash2,
    description: "Professional cleaning services",
    color: "bg-green-100",
  },
];

const ServiceGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {services.map((service) => (
        <Link
          key={service.id}
          to={`/service/${service.id}`}
          className="block group"
        >
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className={`${service.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
              <service.icon className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
              {service.name}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ServiceGrid;
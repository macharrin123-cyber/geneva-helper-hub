import { Link } from "react-router-dom";
import { Wrench, Zap, Paintbrush, Hammer, Brush, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServiceGrid = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      name: t('service.plumbing'),
      icon: Wrench,
      description: t('service.plumbingDesc'),
      color: "bg-blue-100",
      path: "/plumbing"
    },
    {
      id: 2,
      name: t('service.electrical'),
      icon: Zap,
      description: t('service.electricalDesc'),
      color: "bg-yellow-100",
      path: "/electrical"
    },
    {
      id: 3,
      name: t('service.painting'),
      icon: Paintbrush,
      description: t('service.paintingDesc'),
      color: "bg-red-100",
      path: "/painting"
    },
    {
      id: 4,
      name: t('service.carpentry'),
      icon: Hammer,
      description: t('service.carpentryDesc'),
      color: "bg-orange-100",
      path: "/carpentry"
    },
    {
      id: 5,
      name: t('service.cleaning'),
      icon: Brush,
      description: t('service.cleaningDesc'),
      color: "bg-green-100",
      path: "/cleaning"
    },
    {
      id: 6,
      name: t('service.moving'),
      icon: Truck,
      description: t('service.movingDesc'),
      color: "bg-purple-100",
      path: "/moving"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {services.map((service) => (
        <Link
          key={service.id}
          to={service.path}
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
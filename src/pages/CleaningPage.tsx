import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CleaningPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Cleaning & Moving Services
            </h1>
            <p className="text-xl text-gray-600">
              Expert cleaning and moving solutions for your home and office
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Home & Office Cleaning</CardTitle>
                <CardDescription>Professional cleaning services for any space</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                    alt="Professional cleaning service"
                    className="object-cover w-full h-full"
                  />
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Regular cleaning maintenance
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Deep cleaning services
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Window and carpet cleaning
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/book/cleaning">Book Cleaning Service</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moving Services</CardTitle>
                <CardDescription>Full-service moving solutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                    alt="Moving service"
                    className="object-cover w-full h-full"
                  />
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Professional packing services
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Loading and unloading
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Furniture assembly/disassembly
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Post-move cleaning
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/book/moving">Book Moving Service</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Our Services?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Professional Staff</h3>
                <p className="text-gray-600">Experienced and vetted professionals</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">Book services at your convenience</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Satisfaction Guaranteed</h3>
                <p className="text-gray-600">100% satisfaction or money back</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CleaningPage;
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SignupForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    experience: "",
    description: "",
    hourlyRate: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please upload a profile image",
        variant: "destructive",
      });
      return;
    }

    try {
      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from('provider-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('provider-images')
        .getPublicUrl(fileName);

      // Create provider record in the database
      const { error: dbError } = await supabase
        .from('service_providers')
        .insert({
          image_url: publicUrl,
          hourly_rate: parseFloat(formData.hourlyRate),
          service_type: formData.service,
        });

      if (dbError) throw dbError;

      toast({
        title: "Application submitted!",
        description: "We'll review your information and get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        experience: "",
        description: "",
        hourlyRate: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Profile Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="image"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Upload Image
          </label>
          {imagePreview && (
            <div className="relative w-20 h-20">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Existing form fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
          Service Type
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        >
          <option value="">Select a service</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="cleaning">Cleaning</option>
          <option value="carpentry">Carpentry</option>
          <option value="painting">Painting</option>
        </select>
      </div>

      <div>
        <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
          Hourly Rate (CHF)
        </label>
        <input
          type="number"
          id="hourlyRate"
          value={formData.hourlyRate}
          onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <input
          type="number"
          id="experience"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
          min="0"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description of Services
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
};

export default SignupForm;

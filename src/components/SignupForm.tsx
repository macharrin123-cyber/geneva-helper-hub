import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "./signup/ImageUpload";
import FormInput from "./signup/FormInput";
import ServiceSelect from "./signup/ServiceSelect";

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

  const handleImageChange = (file: File | null, preview: string | null) => {
    setImageFile(file);
    setImagePreview(preview);
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

      // Send application email
      const response = await fetch('/functions/v1/send-provider-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: publicUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send application email');
      }

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
      <ImageUpload onImageChange={handleImageChange} imagePreview={imagePreview} />

      <FormInput
        id="name"
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
      />

      <FormInput
        id="phone"
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
      />

      <ServiceSelect
        value={formData.service}
        onChange={(value) => setFormData({ ...formData, service: value })}
      />

      <FormInput
        id="hourlyRate"
        label="Hourly Rate (CHF)"
        type="number"
        value={formData.hourlyRate}
        onChange={(value) => setFormData({ ...formData, hourlyRate: value })}
        min="0"
        step="0.01"
      />

      <FormInput
        id="experience"
        label="Years of Experience"
        type="number"
        value={formData.experience}
        onChange={(value) => setFormData({ ...formData, experience: value })}
        min="0"
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description of Services *
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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (file: File | null, preview: string | null) => {
    setImageFile(file);
    setImagePreview(preview);
  };

  const isFormValid = () => {
    return (
      imageFile !== null &&
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.service !== "" &&
      formData.experience.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.hourlyRate.trim() !== ""
    );
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

    setIsSubmitting(true);

    try {
      console.log('Starting form submission...');
      
      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      console.log('Uploading image to storage...');
      const { error: uploadError, data } = await supabase.storage
        .from('provider-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      // Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('provider-images')
        .getPublicUrl(fileName);

      console.log('Image uploaded successfully, URL:', publicUrl);

      // Create provider record in the database
      console.log('Creating provider record...');
      const { error: dbError } = await supabase
        .from('service_providers')
        .insert({
          image_url: publicUrl,
          hourly_rate: parseFloat(formData.hourlyRate),
          service_type: formData.service,
        });

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw dbError;
      }

      console.log('Provider record created successfully');

      // Send application email
      console.log('Sending application email...');
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
        const errorData = await response.json();
        console.error('Email sending error:', errorData);
        throw new Error(errorData.details || 'Failed to send application email');
      }

      console.log('Application email sent successfully');

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
        description: error.message || "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
        disabled={!isFormValid() || isSubmitting}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
};

export default SignupForm;
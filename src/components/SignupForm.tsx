import { useState } from "react";
import ImageUpload from "./signup/ImageUpload";
import FormInput from "./signup/FormInput";
import ServiceSelect from "./signup/ServiceSelect";
import { useProviderSignup, ProviderFormData } from "@/hooks/useProviderSignup";

const SignupForm = () => {
  const { handleSubmit, isSubmitting } = useProviderSignup();
  const [formData, setFormData] = useState<ProviderFormData>({
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

  const isFormValid = () => {
    const valid = (
      imageFile !== null &&
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.service !== "" &&
      formData.experience.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.hourlyRate.trim() !== ""
    );
    console.log('Form validation result:', valid, { formData, imageFile });
    return valid;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', { formData, imageFile });
    
    try {
      const success = await handleSubmit(formData, imageFile);
      console.log('Form submission result:', success);
      
      if (success) {
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
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-6">
        <ImageUpload onImageChange={handleImageChange} imagePreview={imagePreview} />

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            id="name"
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            hint="Enter your legal full name as it should appear on official documents"
          />

          <FormInput
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            hint="Use a professional email address you check regularly"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            id="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            hint="Enter a phone number where clients can reach you"
          />

          <FormInput
            id="hourlyRate"
            label="Hourly Rate (CHF)"
            type="number"
            value={formData.hourlyRate}
            onChange={(value) => setFormData({ ...formData, hourlyRate: value })}
            min="0"
            step="0.01"
            hint="Set your competitive hourly rate in CHF"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ServiceSelect
            value={formData.service}
            onChange={(value) => setFormData({ ...formData, service: value })}
          />

          <FormInput
            id="experience"
            label="Years of Experience"
            type="number"
            value={formData.experience}
            onChange={(value) => setFormData({ ...formData, experience: value })}
            min="0"
            hint="Total years of professional experience"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description of Services *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors duration-200"
            rows={4}
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Describe your services, specializations, and what makes you stand out
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid() || isSubmitting}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
};

export default SignupForm;
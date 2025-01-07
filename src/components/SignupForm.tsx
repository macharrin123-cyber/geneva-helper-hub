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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit(formData, imageFile);
    
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
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-xl mx-auto">
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
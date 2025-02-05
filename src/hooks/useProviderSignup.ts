import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export interface ProviderFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  experience: string;
  description: string;
  hourlyRate: string;
  linkedinProfile: string;
}

export const useProviderSignup = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: ProviderFormData, imageFile: File | null, cvFile: File | null) => {
    console.log('Starting form submission with data:', { 
      ...formData, 
      imageFile: imageFile ? { name: imageFile.name, size: imageFile.size } : null,
      cvFile: cvFile ? { name: cvFile.name, size: cvFile.size } : null
    });

    if (!imageFile) {
      console.error('Missing required profile image');
      toast({
        title: "Error",
        description: "Please upload a profile image",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);

    try {
      // Upload profile image
      console.log('Starting profile image upload...');
      const imageExt = imageFile.name.split('.').pop();
      const imageFileName = `${Math.random()}.${imageExt}`;
      const imagePath = `${imageFileName}`;

      const { error: imageUploadError } = await supabase.storage
        .from('provider-images')
        .upload(imagePath, imageFile);

      if (imageUploadError) {
        console.error('Error uploading image:', imageUploadError);
        throw new Error('Failed to upload profile image: ' + imageUploadError.message);
      }

      // Get image URL
      const { data: { publicUrl: imageUrl } } = supabase.storage
        .from('provider-images')
        .getPublicUrl(imagePath);

      let cvUrl = null;
      // Upload CV if provided
      if (cvFile) {
        console.log('Starting CV upload...');
        const cvExt = cvFile.name.split('.').pop();
        const cvFileName = `${Math.random()}.${cvExt}`;
        const cvPath = `${cvFileName}`;

        const { error: cvUploadError } = await supabase.storage
          .from('provider-images')
          .upload(cvPath, cvFile);

        if (cvUploadError) {
          console.error('Error uploading CV:', cvUploadError);
          throw new Error('Failed to upload CV: ' + cvUploadError.message);
        }

        // Get CV URL
        const { data: { publicUrl: uploadedCvUrl } } = supabase.storage
          .from('provider-images')
          .getPublicUrl(cvPath);
        
        cvUrl = uploadedCvUrl;
      }

      // Submit application
      console.log('Submitting application with URLs:', { imageUrl, cvUrl });
      const { error: applicationError } = await supabase
        .from('service_provider_applications')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            service: formData.service,
            experience: formData.experience,
            description: formData.description.trim(),
            hourly_rate: parseFloat(formData.hourlyRate),
            image_url: imageUrl,
            cv_url: cvUrl,
            linkedin_profile: formData.linkedinProfile.trim() || null
          }
        ]);

      if (applicationError) {
        console.error('Application submission error:', applicationError);
        throw new Error('Failed to submit application: ' + applicationError.message);
      }

      console.log('Application submitted successfully');
      toast({
        title: "Success!",
        description: "Your application has been submitted successfully. We'll review it and get back to you soon.",
      });

      navigate('/thank-you');
      return true;

    } catch (error: any) {
      console.error('Error in provider signup:', error);
      toast({
        title: "Error",
        description: error.message || "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
  };
};
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadProviderImage, createProviderRecord } from "@/utils/providerUtils";
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
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useProviderSignup = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: ProviderFormData,
    imageFile: File | null
  ) => {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please upload a profile image",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);
    console.log('Starting form submission process...');

    try {
      // First, upload the image
      console.log('Uploading provider image...');
      const publicUrl = await uploadProviderImage(imageFile);
      console.log('Image uploaded successfully:', publicUrl);

      // Create service provider application first
      console.log('Creating service provider application...');
      const { error: applicationError } = await supabase
        .from('service_provider_applications')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            experience: formData.experience,
            description: formData.description,
            hourly_rate: parseFloat(formData.hourlyRate),
            image_url: publicUrl,
            status: 'pending'
          }
        ]);

      if (applicationError) {
        console.error('Application submission error:', applicationError);
        throw new Error('Failed to submit application: ' + applicationError.message);
      }

      console.log('Application submitted successfully');

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
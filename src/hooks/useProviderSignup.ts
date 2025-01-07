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

    try {
      console.log('Starting form submission with data:', formData);
      
      // First check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If not authenticated, sign up the user
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: "temporary-password", // You might want to add a password field to your form
        });

        if (signUpError) {
          console.error('Signup error:', signUpError);
          throw new Error('Failed to create user account');
        }
      }

      // Upload image
      const publicUrl = await uploadProviderImage(imageFile);

      // Create provider record
      await createProviderRecord(
        publicUrl,
        parseFloat(formData.hourlyRate),
        formData.service
      );

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

      // Redirect to provider dashboard after successful signup
      navigate('/provider-dashboard');

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
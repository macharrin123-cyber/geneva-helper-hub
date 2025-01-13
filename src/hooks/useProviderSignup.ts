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

  const waitForSession = async (maxAttempts = 15): Promise<boolean> => {
    for (let i = 0; i < maxAttempts; i++) {
      console.log(`Attempt ${i + 1} of ${maxAttempts} to get session...`);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log('Session found:', session.user.id);
        return true;
      }
      
      console.log('No session found, waiting 3 seconds before next attempt...');
      await delay(3000);
    }
    return false;
  };

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
      // First check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('No session found, creating new user...');
        // Generate a random password for the user
        const password = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
        
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: password,
          options: {
            data: {
              name: formData.name,
              phone: formData.phone,
            }
          }
        });

        if (signUpError) {
          console.error('Signup error:', signUpError);
          throw new Error(signUpError.message);
        }

        if (!signUpData.user) {
          throw new Error('Failed to create user account');
        }

        console.log('User created successfully:', signUpData.user.id);
        
        // Wait for session to be established with increased timeout
        console.log('Waiting for session to be established...');
        const sessionEstablished = await waitForSession();
        if (!sessionEstablished) {
          throw new Error('Failed to establish session after multiple attempts. Please try signing in manually.');
        }
      }

      // Get the current session after signup
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (!currentSession?.user) {
        throw new Error('No user session found after signup');
      }

      // Upload image
      console.log('Uploading provider image...');
      const publicUrl = await uploadProviderImage(imageFile);
      console.log('Image uploaded successfully:', publicUrl);

      // Create provider record
      console.log('Creating provider record...');
      await createProviderRecord(
        publicUrl,
        parseFloat(formData.hourlyRate),
        formData.service,
        currentSession.user.id
      );
      console.log('Provider record created successfully');

      // Create service provider application
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
            image_url: publicUrl
          }
        ]);

      if (applicationError) {
        console.error('Application submission error:', applicationError);
        throw new Error('Failed to submit application');
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
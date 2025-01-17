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
}

export const useProviderSignup = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const uploadProviderImage = async (file: File): Promise<string> => {
    console.log('Starting image upload process...', { fileName: file.name, fileSize: file.size });
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Preparing to upload file to Supabase storage...', { filePath });
      const { error: uploadError, data } = await supabase.storage
        .from('provider-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw new Error('Failed to upload profile image: ' + uploadError.message);
      }

      console.log('Image uploaded successfully, getting public URL...');
      const { data: { publicUrl } } = supabase.storage
        .from('provider-images')
        .getPublicUrl(filePath);

      console.log('Public URL generated:', publicUrl);
      return publicUrl;
    } catch (error: any) {
      console.error('Error in uploadProviderImage:', error);
      throw new Error('Failed to upload image: ' + error.message);
    }
  };

  const notifyAdmin = async (applicationData: any) => {
    try {
      const { error } = await supabase.functions.invoke('notify-new-application', {
        body: applicationData
      });
      
      if (error) {
        console.error('Error notifying admin:', error);
      }
    } catch (error) {
      console.error('Error in notifyAdmin:', error);
    }
  };

  const handleSubmit = async (
    formData: ProviderFormData,
    imageFile: File | null
  ) => {
    console.log('Starting form submission with data:', { 
      ...formData, 
      imageFile: imageFile ? { name: imageFile.name, size: imageFile.size } : null 
    });

    if (!imageFile) {
      console.error('No image file provided');
      toast({
        title: "Error",
        description: "Please upload a profile image",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);

    try {
      // Upload image first
      console.log('Starting image upload...');
      const publicUrl = await uploadProviderImage(imageFile);
      console.log('Image uploaded successfully:', publicUrl);

      // Prepare application data
      const applicationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        experience: formData.experience,
        description: formData.description.trim(),
        hourly_rate: parseFloat(formData.hourlyRate),
        image_url: publicUrl,
        status: 'pending'
      };

      console.log('Submitting application with data:', applicationData);

      // Create service provider application
      const { error: applicationError, data: submittedApplication } = await supabase
        .from('service_provider_applications')
        .insert([applicationData])
        .select()
        .single();

      if (applicationError) {
        console.error('Application submission error:', applicationError);
        throw new Error('Failed to submit application: ' + applicationError.message);
      }

      console.log('Application submitted successfully:', submittedApplication);

      // Notify admin about the new application
      await notifyAdmin({
        ...applicationData,
        imageUrl: publicUrl,
        hourlyRate: formData.hourlyRate
      });

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
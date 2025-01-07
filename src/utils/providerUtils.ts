import { supabase } from "@/integrations/supabase/client";

export const uploadProviderImage = async (imageFile: File) => {
  console.log('Starting image upload...');
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  
  const { error: uploadError, data } = await supabase.storage
    .from('provider-images')
    .upload(fileName, imageFile);

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('provider-images')
    .getPublicUrl(fileName);

  console.log('Image uploaded successfully, URL:', publicUrl);
  return publicUrl;
};

export const createProviderRecord = async (publicUrl: string, hourlyRate: number, serviceType: string) => {
  console.log('Creating provider record with data:', { publicUrl, hourlyRate, serviceType });
  
  // Get the current user's ID
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('No authenticated user found');
    throw new Error('You must be logged in to create a provider profile');
  }

  console.log('Current user ID:', user.id);

  const { error: dbError, data } = await supabase
    .from('service_providers')
    .insert({
      image_url: publicUrl,
      hourly_rate: hourlyRate,
      service_type: serviceType,
      user_id: user.id // Add the user_id to the record
    })
    .select()
    .single();

  if (dbError) {
    console.error('Database insert error:', dbError);
    throw dbError;
  }

  console.log('Provider record created successfully:', data);
  return data;
};
import { supabase } from "@/integrations/supabase/client";

export const uploadProviderImage = async (file: File): Promise<string> => {
  console.log('Starting image upload process...');
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

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
};

export const createProviderRecord = async (
  imageUrl: string,
  hourlyRate: number,
  serviceType: string,
  userId: string
) => {
  console.log('Creating provider record with:', { imageUrl, hourlyRate, serviceType, userId });
  
  const { error } = await supabase
    .from('service_providers')
    .insert([
      {
        image_url: imageUrl,
        hourly_rate: hourlyRate,
        service_type: serviceType,
        user_id: userId
      }
    ]);

  if (error) {
    console.error('Error creating provider record:', error);
    throw new Error('Failed to create provider record: ' + error.message);
  }

  console.log('Provider record created successfully');
};
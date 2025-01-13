import { supabase } from "@/integrations/supabase/client";

export const uploadProviderImage = async (file: File): Promise<string> => {
  console.log('Starting image upload process...');
  
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log('Uploading file to storage...');
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
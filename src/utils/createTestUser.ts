import { supabase } from "@/integrations/supabase/client";

export const createTestUser = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: 'test@helpify.ch',
    password: 'test123!',
  });

  if (error) {
    console.error('Error creating test user:', error);
    return null;
  }

  console.log('Test user created successfully:', data);
  return data;
};
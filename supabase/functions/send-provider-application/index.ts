import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from 'npm:resend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    if (!Deno.env.get('RESEND_API_KEY')) {
      console.error('RESEND_API_KEY is not set');
      throw new Error('Email service configuration error');
    }

    const { name, email, phone, service, experience, description, hourlyRate, imageUrl } = await req.json();

    console.log('Received application data:', { name, email, phone, service, experience, description, hourlyRate });

    const { data, error } = await resend.emails.send({
      from: 'Geneva Services <onboarding@resend.dev>',
      to: 'maxharding99@gmail.com',
      subject: 'New Service Provider Application',
      html: `
        <h2>New Provider Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Type:</strong> ${service}</p>
        <p><strong>Experience:</strong> ${experience} years</p>
        <p><strong>Hourly Rate:</strong> CHF ${hourlyRate}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Profile Image:</strong> <a href="${imageUrl}">View Image</a></p>
      `
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);

    return new Response(
      JSON.stringify({ message: 'Application email sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in send-provider-application:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send application email', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
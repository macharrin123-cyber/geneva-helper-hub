import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "maxharding99@gmail.com";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const application = await req.json();
    console.log("Received application data:", application);

    // Create HTML content for the email
    const htmlContent = `
      <h2>New Service Provider Application</h2>
      <p>A new service provider has submitted an application:</p>
      <ul>
        <li><strong>Name:</strong> ${application.name}</li>
        <li><strong>Email:</strong> ${application.email}</li>
        <li><strong>Phone:</strong> ${application.phone}</li>
        <li><strong>Service:</strong> ${application.service}</li>
        <li><strong>Experience:</strong> ${application.experience} years</li>
        <li><strong>Hourly Rate:</strong> CHF ${application.hourlyRate}</li>
      </ul>
      <p><strong>Description:</strong></p>
      <p>${application.description}</p>
      <p>Profile Image: <a href="${application.imageUrl}">View Image</a></p>
    `;

    // Send email using Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Helpify <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: "New Service Provider Application - " + application.name,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in notify-new-application function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
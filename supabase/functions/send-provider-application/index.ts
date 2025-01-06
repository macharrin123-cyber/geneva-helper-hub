import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  service: string;
  experience: string;
  description: string;
  hourlyRate: string;
  imageUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const applicationData: ApplicationData = await req.json();
    
    const emailHtml = `
      <h2>New Service Provider Application</h2>
      <p><strong>Name:</strong> ${applicationData.name}</p>
      <p><strong>Email:</strong> ${applicationData.email}</p>
      <p><strong>Phone:</strong> ${applicationData.phone}</p>
      <p><strong>Service Type:</strong> ${applicationData.service}</p>
      <p><strong>Years of Experience:</strong> ${applicationData.experience}</p>
      <p><strong>Hourly Rate:</strong> CHF ${applicationData.hourlyRate}</p>
      <p><strong>Description:</strong> ${applicationData.description}</p>
      <p><strong>Profile Image:</strong> <a href="${applicationData.imageUrl}">View Image</a></p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>",
        to: ["maxharding99@gmail.com"],
        subject: "New Service Provider Application",
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
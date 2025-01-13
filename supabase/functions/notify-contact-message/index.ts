import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "maxharding99@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactMessage = await req.json();
    console.log("Received contact message:", contactMessage);

    // Create HTML content for the email
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p>A new message has been submitted through the contact form:</p>
      <ul>
        <li><strong>Name:</strong> ${contactMessage.name}</li>
        <li><strong>Email:</strong> ${contactMessage.email}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p>${contactMessage.message}</p>
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
        subject: "New Contact Form Submission - " + contactMessage.name,
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
    console.error("Error in notify-contact-message function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
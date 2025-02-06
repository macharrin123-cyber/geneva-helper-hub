import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  providerEmail: string;
  providerName: string;
  clientMessage: string;
  serviceType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { providerEmail, providerName, clientMessage, serviceType }: EmailRequest = await req.json();

    console.log(`Sending email to provider ${providerName} at ${providerEmail}`);

    const emailResponse = await resend.emails.send({
      from: "Helpify <onboarding@resend.dev>",
      to: [providerEmail],
      subject: `New Service Request - ${serviceType}`,
      html: `
        <h1>Hello ${providerName},</h1>
        <p>You have received a new service request for ${serviceType}.</p>
        <p><strong>Client Message:</strong></p>
        <p>${clientMessage}</p>
        <p>Please log in to your dashboard to respond to this request.</p>
        <p>Best regards,<br>The Helpify Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-provider function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
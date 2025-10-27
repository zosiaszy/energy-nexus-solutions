import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  honeypot?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, honeypot }: ContactEmailRequest = await req.json();

    console.log("Contact form submission received:", { name, email, phone: phone || "N/A" });

    // Honeypot anti-spam check
    if (honeypot && honeypot.trim() !== "") {
      console.log("Honeypot detected, possible spam submission");
      return new Response(
        JSON.stringify({ success: false, error: "Invalid submission" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validation
    if (!name || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Imię i nazwisko jest wymagane" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!email || email.trim().length === 0 || !email.includes("@")) {
      return new Response(
        JSON.stringify({ success: false, error: "Podaj poprawny adres e-mail" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!message || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: "Wiadomość musi mieć minimum 10 znaków" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to kontakt@nexuss.pl
    const emailResponse = await resend.emails.send({
      from: "Nexuss <kontakt@nexuss.pl>",
      to: ["kontakt@nexuss.pl"],
      subject: "Nowa wiadomość z formularza Nexuss",
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Nie podano"}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Email sent successfully to kontakt@nexuss.pl:", emailResponse);

    // Send autoresponder to the user
    try {
      await resend.emails.send({
        from: "Nexuss <kontakt@nexuss.pl>",
        to: [email],
        subject: "Dziękujemy za kontakt - Nexuss",
        html: `
          <h2>Dziękujemy za kontakt!</h2>
          <p>Witaj ${name},</p>
          <p>Otrzymaliśmy Twoją wiadomość i odpowiemy tak szybko jak to możliwe.</p>
          <p>Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin.</p>
          <br>
          <p>Pozdrawiamy,<br>Zespół Nexuss</p>
        `,
      });
      console.log("Autoresponder sent successfully to:", email);
    } catch (autoresponderError) {
      console.error("Failed to send autoresponder:", autoresponderError);
      // Don't fail the whole request if autoresponder fails
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

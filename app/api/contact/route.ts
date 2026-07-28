import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTEREST_LABELS: Record<string, string> = {
  scan: "Book a Body Scan",
  supplements: "Ask about Green World packages",
  other: "Something else",
};

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const interest = String(body.interest ?? "other").trim();
  const message = String(body.message ?? "").trim();
  const company = String(body.company ?? "").trim(); // honeypot field

  if (company) {
    // Bot filled the hidden field — pretend success, do nothing.
    return NextResponse.json({ ok: true });
  }

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Name, phone, and email are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Dew of Hermon <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please call or email us directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const interestLabel = INTEREST_LABELS[interest] ?? interest;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name} — ${interestLabel}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Looking for: ${interestLabel}`,
        "",
        "Message:",
        message || "(no message provided)",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again or call us." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again or call us." },
      { status: 500 }
    );
  }
}

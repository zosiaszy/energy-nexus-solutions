import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
  message?: string;
  hp?: string; // honeypot
};

const sanitize = (s?: string, max = 5000) => (s || "").toString().trim().slice(0, max);
const asList = (v?: string) => (v || "").split(",").map(s => s.trim()).filter(Boolean);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const b: Payload = (req.body || {}) as Payload;

  // prosty anty-spam
  if ((b.hp || "").trim() !== "") return res.status(200).json({ ok: true });

  const name = sanitize(b.name, 200);
  const email = sanitize(b.email, 320);
  const phone = sanitize(b.phone, 50);
  const propertyType = sanitize(b.propertyType, 100);
  const message = sanitize(b.message, 5000);

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Brak wymaganych pól (name, email, message)" });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS; // już ustawione w Vercel
  const from = process.env.CONTACT_FROM;
  const to = asList(process.env.CONTACT_TO);
  const bcc = asList(process.env.CONTACT_BCC);

  if (!host || !port || !user || !from || to.length === 0) {
    return res.status(500).json({ message: "Brak konfiguracji SMTP lub CONTACT_* w ENV" });
  }
  if (!pass) {
    return res.status(503).json({ message: "Mail service not configured" });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user, pass },
  });

  const subject = `Formularz: ${name} (${propertyType || "nie podano"})`;
  const html = `
    <h2>Nowa wiadomość z formularza</h2>
    <p><b>Imię i nazwisko:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Telefon:</b> ${phone || "nie podano"}</p>
    <p><b>Typ nieruchomości:</b> ${propertyType || "nie podano"}</p>
    <p><b>Wiadomość:</b></p>
    <pre style="white-space:pre-wrap;line-height:1.6;">${message}</pre>
  `;
  const text =
    `Nowa wiadomość z formularza\n` +
    `Imię i nazwisko: ${name}\n` +
    `Email: ${email}\n` +
    `Telefon: ${phone || "nie podano"}\n` +
    `Typ nieruchomości: ${propertyType || "nie podano"}\n\n` +
    `Wiadomość:\n${message}\n`;

  try {
    await transporter.sendMail({
      from,
      to,
      bcc: bcc.length ? bcc : undefined,
      replyTo: email,
      subject,
      html,
      text,
    });
    return res.status(200).json({ ok: true, provider: "smtp" });
  } catch (e: any) {
    console.error("SMTP send error:", e);
    return res.status(500).json({ message: e?.message || "Nie udało się wysłać wiadomości" });
  }
}

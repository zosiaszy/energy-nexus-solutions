import nodemailer from "nodemailer";
import type { IncomingMessage } from "http";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
  message?: string;
  hp?: string; // honeypot
};

const sanitize = (s?: string, max = 5000) => (s || "").toString().trim().slice(0, max);
const asList = (v?: string) => (v || "").split(",").map((s) => s.trim()).filter(Boolean);
const trim = (v?: string) => (v ?? "").trim();

async function readBody(req: IncomingMessage): Promise<string> {
  return await new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data));
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  // Parsowanie body (Vercel zwykle daje req.body, ale na wszelki wypadek mamy fallback):
  let b: any = req.body;
  if (!b || typeof b === "string") {
    try {
      const raw = typeof b === "string" ? b : await readBody(req);
      b = raw ? JSON.parse(raw) : {};
    } catch {
      b = {};
    }
  }

  // honeypot
  if (trim(b.hp) !== "") return res.status(200).json({ ok: true });

  const name = sanitize(b.name, 200);
  const email = sanitize(b.email, 320);
  const phone = sanitize(b.phone, 50);
  const propertyType = sanitize(b.propertyType, 100);
  const message = sanitize(b.message, 5000);

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Brak wymaganych pól (name, email, message)" });
  }

  // ENV
  const host = trim(process.env.SMTP_HOST);
  const port = Number(trim(process.env.SMTP_PORT) || 587);
  const user = trim(process.env.SMTP_USER);
  const pass = trim(process.env.SMTP_PASS);
  const from = trim(process.env.CONTACT_FROM);
  const to = asList(process.env.CONTACT_TO);
  const bcc = asList(process.env.CONTACT_BCC);

  if (!host || !port || !user || !from || to.length === 0) {
    return res.status(500).json({ message: "Brak konfiguracji SMTP lub CONTACT_* w ENV" });
  }

  // CONTACT_FROM musi być tą samą skrzynką co SMTP_USER (DMARC/anti-spoofing)
  const fromAddr = (from.match(/<(.*)>/)?.[1] || from).trim().toLowerCase();
  if (fromAddr !== user.toLowerCase()) {
    return res.status(400).json({ message: "CONTACT_FROM musi być identyczny jak SMTP_USER" });
  }

  if (!pass) return res.status(503).json({ message: "Mail service not configured" });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user, pass },
    requireTLS: port === 587,
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
    "Nowa wiadomość z formularza\n" +
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
    const code = e?.code || e?.responseCode;
    if (code === "EAUTH" || code === 535 || code === 534) {
      return res.status(401).json({ message: "SMTP auth failed" });
    }
    return res.status(500).json({ message: "Nie udało się wysłać wiadomości" });
  }
}

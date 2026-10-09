import nodemailer from 'nodemailer';
import type { Attachment } from 'nodemailer/lib/mailer';

export function isMailerConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let cachedTransport: nodemailer.Transporter | null = null;

function transporter() {
  if (cachedTransport) return cachedTransport;
  const port = Number(process.env.SMTP_PORT || 465);
  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // Zoho: 465 = SSL (recommended), 587 = STARTTLS
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return cachedTransport;
}

export const defaultFrom = () => {
  const addr = process.env.SMTP_FROM || process.env.SMTP_USER || '';
  // Zoho only sends as an address the account owns: always show the shop name, never an arbitrary sender
  return addr ? `"e bikes for sale" <${addr.replace(/^.*<|>.*$/g, '')}>` : undefined;
};

export interface MailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}

/** Never throws. Logs only the failure reason, never credentials. */
export async function sendMail(input: MailInput): Promise<{ sent: boolean; reason?: string }> {
  if (!isMailerConfigured()) return { sent: false, reason: 'not-configured' };
  try {
    await transporter().sendMail({ from: defaultFrom(), ...input });
    return { sent: true };
  } catch (err) {
    const code = (err as { code?: string; responseCode?: number })?.code || (err as { responseCode?: number })?.responseCode || 'send-failed';
    console.error('[mailer] send failed:', String(code));
    cachedTransport = null; // rebuild the connection next time
    return { sent: false, reason: `smtp-error:${String(code)}` };
  }
}

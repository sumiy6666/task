// Sends the member emails through the SMTP server in these settings:
//   SMTP_HOST, SMTP_PORT (587 or 465), SMTP_USER, SMTP_PASS,
//   MAIL_FROM   e.g. "Asset Vantage Community <community@assetvantage.com>"
//   MAIL_REPLY_TO (optional), SITE_URL (optional, for the email images and links).
// Without them nothing is sent and approving or declining still works.
import nodemailer from 'nodemailer';
import { regretEmail, welcomeEmail } from './templates';

const SITE_URL = (process.env.SITE_URL || 'https://av-community.vercel.app').replace(/\/$/, '');

let transport;
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !MAIL_FROM) return null;
  if (!transport) {
    const port = Number(SMTP_PORT) || 587;
    transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
  }
  return transport;
}

export const firstNameOf = (name = '', username = '') => (String(name).trim().split(/\s+/)[0] || username || '').trim();

// Returns true when the email went out, false when it could not (or mail isn't set up).
async function send(to, { subject, html, text }) {
  const mailer = getTransport();
  if (!mailer || !to) return false;
  try {
    await mailer.sendMail({ from: process.env.MAIL_FROM, replyTo: process.env.MAIL_REPLY_TO || undefined, to, subject, html, text });
    return true;
  } catch (error) {
    console.error('Could not send the member email', error);
    return false;
  }
}

export const sendWelcomeEmail = (to, firstName) => send(to, welcomeEmail({ firstName, siteUrl: SITE_URL }));
export const sendRegretEmail = (to, firstName) => send(to, regretEmail({ firstName, siteUrl: SITE_URL }));

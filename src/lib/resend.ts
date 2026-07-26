import { createTransport } from "nodemailer";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export const isProduction = process.env.NODE_ENV === "production";

export function getEmailConfig() {
  if (isProduction) {
    return {
      from: "noreply@onlyhorse.com",
      to: "",
    };
  }
  return {
    from: process.env.GMAIL_USER || "",
    to: process.env.RESEND_TEST_EMAIL || "",
  };
}

export function getGmailTransport() {
  return createTransport({
    auth: {
      pass: process.env.GMAIL_APP_PASSWORD,
      user: process.env.GMAIL_USER,
    },
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
  });
}

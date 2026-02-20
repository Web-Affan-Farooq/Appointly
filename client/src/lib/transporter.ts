import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or configure host/port manually
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string, // App password
  },
});

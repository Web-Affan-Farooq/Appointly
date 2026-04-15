// src/lib/email/sendEmail.ts

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or configure host/port manually
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string, // App password
  },
});


// src/lib/email/types.ts
export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const sendEmail = async (
  options: SendEmailOptions,
): Promise<SendEmailResponse> => {
  try {
    const info = await transporter.sendMail({
      from: `"Appointly" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

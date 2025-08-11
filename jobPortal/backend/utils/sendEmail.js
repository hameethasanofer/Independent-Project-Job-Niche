import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs (optional)
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: `"Job Portal" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log("📨 Email sent: ", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

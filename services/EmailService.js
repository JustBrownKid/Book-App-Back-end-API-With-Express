const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }, 
});

async function sendEmail({ to, subject, message, value }) {
  const mailOptions = {
    from: `"POztLite Verification" <${process.env.EMAIL_USER}>`,
    to,
    subject: subject || 'Your OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f9f9f9; color: #333;">
        <div style="max-width: 400px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 20px; text-align: center;">
          <h2 style="color: #1D4ED8; margin-bottom: 20px;">POztLite Verification</h2>
          <p style="font-size: 16px; margin-bottom: 10px;">${message}</p>
          <div style="font-size: 36px; letter-spacing: 6px; font-weight: 700; color: #111; margin: 20px 0; user-select: all;">
            ${value}
          </div>
          <p style="font-size: 14px; color: #555; margin-bottom: 0;">
            This code is valid for <strong>5 minutes</strong>. Please do not share it with anyone.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">
            If you didn't request this code, please ignore this email or contact support.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;

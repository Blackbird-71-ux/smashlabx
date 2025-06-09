const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendBookingConfirmation = async (to, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: 'SmashLabs Booking Confirmation',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${bookingDetails.companyName},</p>
      <p>Your SmashLabs session has been successfully booked!</p>
      <p><strong>Booking Details:</strong></p>
      <ul>
        <li>Date: ${bookingDetails.date}</li>
        <li>Time: ${bookingDetails.timeSlot}</li>
        <li>Package: ${bookingDetails.packageType}</li>
        <li>Participants: ${bookingDetails.participants}</li>
      </ul>
      <p>We look forward to seeing you!</p>
      <p>Best regards,<br/>The SmashLabs Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent to', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendBookingConfirmation }; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendBookingConfirmation = async (bookingDetails) => {
  const { bookingId, date, timeSlot, packageType, participants, totalAmount } = bookingDetails;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER, // For testing, send to yourself
    subject: `Booking Confirmation - Booking #${bookingId}`,
    html: `
      <h1>Booking Confirmation</h1>
      <p>Your booking has been confirmed!</p>
      <h2>Booking Details:</h2>
      <ul>
        <li>Booking ID: ${bookingId}</li>
        <li>Date: ${date}</li>
        <li>Time: ${timeSlot}</li>
        <li>Package: ${packageType}</li>
        <li>Participants: ${participants}</li>
        <li>Total Amount: $${totalAmount}</li>
      </ul>
      <p>Thank you for choosing SmashLabs!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
}; 
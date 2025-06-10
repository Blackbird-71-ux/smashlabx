import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../config/logger.js';

dotenv.config();

interface BookingDetails {
  date: string;
  timeSlot: string;
  packageType: string;
  participants: number;
  companyName: string;
  totalAmount: number;
}

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Contact form email interface
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  package?: string;
  participants?: number;
}

// Send contact form notification
export const sendContactEmail = async (data: ContactFormData): Promise<void> => {
  try {
    const mailOptions: SendMailOptions = {
      from: `"SmashLabs Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        ${data.package ? `<p><strong>Package:</strong> ${data.package}</p>` : ''}
        ${data.participants ? `<p><strong>Participants:</strong> ${data.participants}</p>` : ''}
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info('Contact form email sent successfully');
  } catch (error) {
    logger.error('Failed to send contact form email:', error);
    throw new Error('Failed to send contact form email');
  }
};

export const sendBookingConfirmation = async (email: string, details: BookingDetails): Promise<void> => {
  const { date, timeSlot, packageType, participants, companyName, totalAmount } = details;

  const mailOptions: SendMailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'SmashLabs Booking Confirmation',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${companyName},</p>
      <p>Your booking has been confirmed with the following details:</p>
      <ul>
        <li>Date: ${date}</li>
        <li>Time: ${timeSlot}</li>
        <li>Package: ${packageType}</li>
        <li>Number of Participants: ${participants}</li>
        <li>Total Amount: $${totalAmount.toFixed(2)}</li>
      </ul>
      <p>We look forward to seeing you at SmashLabs!</p>
      <p>Best regards,<br>SmashLabs Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Booking confirmation email sent to ${email}`);
  } catch (error) {
    logger.error('Error sending booking confirmation email:', error);
    throw new Error(`Failed to send booking confirmation email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const mailOptions: SendMailOptions = {
      from: `"SmashLabs Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info('Password reset email sent successfully');
  } catch (error) {
    logger.error('Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

// Send email verification
export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const mailOptions: SendMailOptions = {
      from: `"SmashLabs Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verify Your Email',
      html: `
        <h2>Email Verification</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <p><a href="${verificationUrl}">Verify Email</a></p>
        <p>If you didn't create an account, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info('Verification email sent successfully');
  } catch (error) {
    logger.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
}; 
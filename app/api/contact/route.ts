import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email configuration using Nodemailer
    const nodemailer = require('nodemailer');
    
    // Check if email credentials are properly configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    
    if (!emailUser || !emailPass || 
        emailUser.includes('your-actual-gmail') || 
        emailPass.includes('your-gmail-app-password')) {
      
      console.error('❌ Email credentials not configured properly');
      console.log('📧 Form submission received but email not sent:');
      console.log('==========================================');
      console.log(`Name: ${firstName} ${lastName}`);
      console.log(`Email: ${email}`);
      console.log(`Phone: ${phone || 'Not provided'}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log(`Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
      console.log('==========================================');
      console.log('Please configure EMAIL_USER and EMAIL_PASS in .env.local');
      
      return NextResponse.json(
        { error: 'Email configuration incomplete. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Create transporter based on configuration
    let transporter;
    
    if (smtpHost && smtpPort) {
      // Custom SMTP configuration
      transporter = nodemailer.createTransporter({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: smtpPort === '465', // true for 465, false for other ports
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });
    } else {
      // Gmail configuration
      transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });
    }

    // Email content
    const mailOptions = {
      from: emailUser,
      to: 'ecell@ustu.edu.in',
      replyTo: email, // Allow direct reply to the user
      subject: `🚀 New Contact Form: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">
              📧 New Contact Form Submission
            </h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
              E-CELL USTU Website
            </p>
          </div>
          
          <!-- Contact Information -->
          <div style="padding: 30px;">
            <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #3b82f6;">
              <h2 style="color: #1e3a8a; margin-top: 0; margin-bottom: 20px; font-size: 20px;">
                👤 Contact Information
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; color: #111827;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 8px 0; color: #111827;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
                  <td style="padding: 8px 0; color: #111827;"><strong>${subject}</strong></td>
                </tr>
              </table>
            </div>
            
            <!-- Message -->
            <div style="background-color: #f1f5f9; padding: 25px; border-radius: 12px; border-left: 4px solid #10b981;">
              <h2 style="color: #065f46; margin-top: 0; margin-bottom: 15px; font-size: 20px;">
                💬 Message
              </h2>
              <div style="background-color: white; padding: 20px; border-radius: 8px; line-height: 1.6; color: #374151; white-space: pre-wrap; font-size: 15px;">${message}</div>
            </div>
            
            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Re: ${subject}" 
                 style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">
                📧 Reply to ${firstName}
              </a>
              <a href="tel:${phone || ''}" 
                 style="display: inline-block; background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">
                📞 Call ${firstName}
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              <strong>📅 Submitted:</strong> ${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} IST
            </p>
            <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px;">
              This email was automatically generated from the E-CELL USTU contact form.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);
    console.log('📧 Form submission details:');
    console.log(`   Name: ${firstName} ${lastName}`);
    console.log(`   Email: ${email}`);
    console.log(`   Subject: ${subject}`);

    return NextResponse.json(
      { 
        message: 'Message sent successfully! We will get back to you soon.',
        messageId: info.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again or contact us directly at ecell@ustu.edu.in' },
      { status: 500 }
    );
  }
}

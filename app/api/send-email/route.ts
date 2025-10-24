import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Thanh Duc Photo <noreply@thanhducphoto.com>', // Verified domain
      to: [process.env.CONTACT_EMAIL || 'thanhduckrb767@gmail.com'], // Your email
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f4f4f4 0%, #e4e4e7 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: #1a1a1a; margin-bottom: 10px; font-size: 24px;">📸 New Photography Inquiry</h1>
            <p style="font-size: 16px; color: #374151;">You've received a new message from your portfolio website!</p>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 20px;">Client Information</h2>

            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Name:</strong>
              <span style="margin-left: 10px;">${name}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Email:</strong>
              <span style="margin-left: 10px;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Service Interested In:</strong>
              <span style="margin-left: 10px; background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${service || 'Not specified'}</span>
            </div>
          </div>

          <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px;">Message</h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #d4af37;">
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>

          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              💌 <strong>Quick Action:</strong> Click "Reply" in your email client to respond directly to ${name}.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This message was sent from Thanh Duc Photo portfolio website.</p>
            <p>Built with ❤️ using Next.js & Resend</p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully! Thank you for your message.',
      data
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

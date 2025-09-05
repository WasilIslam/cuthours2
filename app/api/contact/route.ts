import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateAdminEmail, generateRequesterEmail } from '@/lib/emailGen';

const resend = new Resend(process.env.EMAIL_RESEND_API_KEY);

interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  projectDetails: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.company || !body.projectDetails) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Get admin email from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('ADMIN_EMAIL environment variable not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Generate email content
    const adminEmailHtml = generateAdminEmail(body);
    const requesterEmailHtml = generateRequesterEmail(body);

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'notify@cuthours.com',
      to: adminEmail,
      subject: `New Contact Form Submission from ${body.fullName}`,
      html: adminEmailHtml,
    });

    // Send confirmation email to requester
    const requesterEmailResult = await resend.emails.send({
      from: 'notify@cuthours.com',
      to: body.email,
      subject: `Thank you for contacting Cuthours - ${body.fullName}`,
      html: requesterEmailHtml,
    });

    // Check if emails were sent successfully
    if (adminEmailResult.error || requesterEmailResult.error) {
      console.error('Email sending failed:', { adminEmailResult, requesterEmailResult });
      return NextResponse.json(
        { error: 'Failed to send emails' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

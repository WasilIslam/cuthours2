import { siteConfig } from './config';

interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  projectDetails: string;
}

export function generateAdminEmail(contactData: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #000000; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; border-bottom: 2px solid #000000; padding-bottom: 20px; margin-bottom: 30px; }
    .brand { font-size: 28px; font-weight: bold; margin: 0; }
    .tagline { font-size: 14px; color: #666666; margin: 5px 0 0 0; }
    .content { line-height: 1.6; }
    .section { margin-bottom: 25px; }
    .label { font-weight: bold; margin-bottom: 5px; }
    .value { background-color: #f8f8f8; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="brand">${siteConfig.name}</h1>
      <p class="tagline">${siteConfig.tagline}</p>
    </div>

    <div class="content">
      <div class="section">
        <h2 style="margin: 0 0 20px 0; font-size: 20px;">New Contact Form Submission</h2>

        <div class="section">
          <div class="label">Contact Details:</div>
          <div class="value">
            <strong>${contactData.fullName}</strong><br>
            ${contactData.email}<br>
            ${contactData.company}
          </div>
        </div>

        <div class="section">
          <div class="label">Project Details:</div>
          <div class="value">
            ${contactData.projectDetails.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div class="section">
          <p>Please review this inquiry and follow up within 24 hours as promised.</p>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>${siteConfig.description}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function generateRequesterEmail(contactData: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting ${siteConfig.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #000000; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; border-bottom: 2px solid #000000; padding-bottom: 20px; margin-bottom: 30px; }
    .brand { font-size: 28px; font-weight: bold; margin: 0; }
    .tagline { font-size: 14px; color: #666666; margin: 5px 0 0 0; }
    .content { line-height: 1.6; }
    .section { margin-bottom: 25px; }
    .welcome { font-size: 18px; margin-bottom: 20px; }
    .stats { background-color: #f8f8f8; padding: 20px; border-radius: 4px; margin: 20px 0; }
    .stat-item { margin-bottom: 10px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="brand">${siteConfig.name}</h1>
      <p class="tagline">${siteConfig.tagline}</p>
    </div>

    <div class="content">
      <div class="welcome">
        Hi ${contactData.fullName},
      </div>

      <div class="section">
        <p>Thank you for reaching out to ${siteConfig.name}. We've received your inquiry about:</p>

        <div style="background-color: #f8f8f8; padding: 15px; border-radius: 4px; margin: 15px 0;">
          <strong>${contactData.company}</strong><br>
          ${contactData.projectDetails.replace(/\n/g, '<br>')}
        </div>

        <p>We'll review your project requirements and get back to you within 24 hours with next steps.</p>
      </div>

      <div class="section">
        <h3 style="margin: 25px 0 15px 0;">What happens next?</h3>
        <ol style="padding-left: 20px;">
          <li style="margin-bottom: 8px;">We'll review your project requirements</li>
          <li style="margin-bottom: 8px;">Schedule a 30-minute discovery call</li>
          <li>Provide a detailed proposal with timeline</li>
        </ol>
      </div>

      <div class="stats">
        <h3 style="margin: 0 0 15px 0;">Why choose ${siteConfig.name}?</h3>
        ${siteConfig.stats.map(stat => `<div class="stat-item"><strong>${stat.value}</strong> ${stat.label}</div>`).join('')}
      </div>

      <div class="section">
        <p>Questions? Reply to this email or contact us at hi@cuthours.com</p>
      </div>
    </div>

    <div class="footer">
      <p>${siteConfig.description}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

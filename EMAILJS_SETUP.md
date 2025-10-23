# EmailJS Setup Instructions

This guide will help you configure EmailJS to send consultation emails from your website to `rirelevategroup@gmail.com`.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Select Gmail and connect your `rirelevategroup@gmail.com` account
   - **Outlook**: Select Outlook if you prefer
   - **Custom SMTP**: For other providers

4. Follow the authentication steps for your chosen provider
5. Note down your **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template configuration:

### Template Settings:
- **Template Name**: `consultation_form`
- **Subject**: `New Consultation Request from {{from_name}}`

### Template Content:
```
Hello Rafael,

You have received a new consultation request:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Service Type: {{service_type}}
Message: {{message}}

Please respond within 24 hours.

Best regards,
Your Website
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** and copy it

## Step 5: Update Your Website Code

Replace the placeholder values in `script.js`:

```javascript
// Replace these values in script.js:
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

// And in the emailjs.send() call:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### Example with real values:
```javascript
emailjs.init("user_abc123def456"); // Your actual public key

emailjs.send('service_gmail', 'template_consultation', templateParams)
```

## Step 6: Test the Form

1. Open your website
2. Fill out the consultation form
3. Submit the form
4. Check if you receive the email at `rirelevategroup@gmail.com`

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined" error**:
   - Make sure the EmailJS script is loaded before your custom script
   - Check that the CDN link is correct in your HTML

2. **"Service not found" error**:
   - Verify your Service ID is correct
   - Make sure the service is active in your EmailJS dashboard

3. **"Template not found" error**:
   - Verify your Template ID is correct
   - Make sure the template is published (not in draft)

4. **Emails not being sent**:
   - Check your email service connection
   - Verify the recipient email address
   - Check browser console for error messages

### Testing Steps:

1. Open browser developer tools (F12)
2. Go to Console tab
3. Submit the form
4. Look for success/error messages in the console

## Security Notes

- Never expose your private keys in client-side code
- The public key is safe to use in frontend code
- Consider implementing rate limiting for production use
- Monitor your EmailJS usage to stay within free tier limits

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 2 email templates

For higher volume, consider upgrading to a paid plan.

## Support

If you encounter issues:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Contact EmailJS support
3. Check browser console for error messages

---

**Important**: After completing this setup, test thoroughly to ensure emails are being sent correctly to `rirelevategroup@gmail.com`.

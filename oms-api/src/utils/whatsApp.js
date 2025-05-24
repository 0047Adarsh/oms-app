import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sender = process.env.TWILIO_WHATSAPP_SENDER;

export async function sendWhatsAppMessage(to, messageBody) {
  try {
    const message = await client.messages.create({
      body: messageBody,
      from: sender,
      to: `whatsapp:${to}`
    });

    console.log('WhatsApp message sent:', message.sid);
    return message;
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error.message);
    return null;
  }
}
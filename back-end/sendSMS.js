const twilio = require('twilio');
const config = require('./config.js');

const sendNotification = async (phoneNumber) => {
  try {
    let client;
    if (process.env.NODE_ENV === 'production') {
        console.log('in production')
      // Use environment variables in production
      client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    } else {
      // Use credentials from config.js in other environments
      console.log('in dev')
      client = twilio(
        config.TWILIO_ACCOUNT_SID,
        config.TWILIO_AUTH_TOKEN
      );
    }

    await client.messages.create({
      body: 'The specified text was not found on the website.',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendNotification };
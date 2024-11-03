const Twilio = require("twilio");

// Replace with your actual Twilio credentials
const twilioAccountSid = "ACe74e321e8584cc313cf3242158d6ed05"; // Your Twilio Account SID
const twilioAuthToken = "7589e1f65cc982531e092346b4f8d866"; // Your Twilio Auth Token
const twilioPhoneNumber = "+16504450875"; // Your Twilio phone number in E.164 format
const recipientPhoneNumber = "+917395929034"; // Replace with a valid recipient phone number in E.164 format

const client = new Twilio(twilioAccountSid, twilioAuthToken);

// Send SMS
client.messages
  .create({
    body: "Hello from Twilio!",
    from: twilioPhoneNumber,
    to: recipientPhoneNumber,
  })
  .then((message) => console.log(`Message sent: ${message.sid}`))
  .catch((error) => console.error(`Error: ${error.message}`));

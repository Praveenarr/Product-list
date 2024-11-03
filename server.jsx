const express = require("express");
const bodyParser = require("body-parser");
const Twilio = require("twilio");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3502;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Twilio configuration
const twilioAccountSid = "ACe74e321e8584cc313cf3242158d6ed05"; // Replace with your Twilio Account SID
const twilioAuthToken = "7589e1f65cc982531e092346b4f8d866"; // Replace with your Twilio Auth Token
const twilioPhoneNumber = "+16504450875"; // Replace with your Twilio phone number
const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' with body:`, req.body);
  next();
});

// Endpoint to confirm product order
app.post("/confirm-product", (req, res) => {
  console.log("Received order request:", req.body); // Log incoming request

  const { name, address, phone, items } = req.body; // Include phone number

  // Validate incoming data
  if (!name || !address || !phone || !items || items.length === 0) {
    console.error("Invalid data: ", req.body); // Log the incoming data
    return res.status(400).json({ message: "All fields are required." });
  }

  console.log("Order Details:", { name, address, phone, items }); // Log the order details

  // Prepare SMS data
  const smsMessage = `Hello ${name},\n\nYour order has been confirmed.\n\nDelivery Address: ${address}\n\nItems Ordered:\n${items
    .map((item) => `- ${item.title}: ₹${item.price}`)
    .join("\n")}\n\nThank you for your order!`;

  // Send SMS
  twilioClient.messages
    .create({
      body: smsMessage,
      from: twilioPhoneNumber,
      to: phone,
    })
    .then((message) => {
      console.log("SMS sent: ", message.sid);
      return res.status(200).json({ message: "Order confirmation SMS sent!" });
    })
    .catch((error) => {
      console.error("Error sending SMS: ", error); // Log the error
      return res
        .status(500)
        .json({ message: "Error sending SMS", error: error.message });
    });
});

// GET endpoint to fetch data from db.json
app.get("/endpoint", (req, res) => {
  const filePath = path.join(__dirname, "data", "db.json"); // Adjust the path as necessary

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading db.json: ", err);
      return res.status(500).json({ message: "Error reading database" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON: ", parseError);
      res.status(500).json({ message: "Error parsing database" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

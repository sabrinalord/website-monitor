const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const scrape = require('./scrape');
const sendSMS = require('./sendSMS');

// allow cross-origin requests
app.use(cors());

// parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());


// Route for checking website
app.post('/api/checkWebsite', async (req, res) => {
  console.log('posted')
  const { websiteUrl, textToLookFor, phoneNumber } = req.body;
  console.log(websiteUrl)
  // Perform web scraping to check for text on website
  const isTextFound = await scrape.checkWebsite(websiteUrl, textToLookFor);

  if (isTextFound) {
    // If text is found, send success response
    res.json({ message: 'Text found' });
  } else {
    // If text is not found, send notification and success response
    sendSMS.sendNotification(phoneNumber);
    res.json({ message: 'Text not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
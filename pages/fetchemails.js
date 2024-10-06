const { google } = require('googleapis');
const fs = require('fs');

// Add your credentials here later
const CLIENT_ID = '998151195957-ria17lsdg2er7f4j3m6meitpsof9gbqm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://fexa.vercel.app/api/callback';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

export default async function handler(req, res) {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'has:attachment',
    });

    const messages = response.data.messages;

    if (messages) {
      for (let message of messages) {
        const emailData = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });

        const emailContent = emailData.data.snippet;

        // Process emailContent and extract information
        // Pass emailContent to sentiment analysis function
        const sentimentScore = analyzeSentiment(emailContent);

        // Here you can insert data into Google Forms
        await insertToGoogleForm({
          feedback: emailContent,
          sentiment: sentimentScore,
        });
      }

      res.status(200).json({ success: true, message: 'Emails processed' });
    } else {
      res.status(404).json({ success: false, message: 'No emails found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// You will insert the real API key and logic later
async function insertToGoogleForm(data) {
  // Placeholder for your Google Form submission logic
  console.log('Inserting data into Google Form:', data);
}

function analyzeSentiment(text) {
  // Placeholder for your sentiment analysis logic
  const positiveWords = ['good', 'great', 'awesome'];
  const negativeWords = ['bad', 'poor', 'terrible'];
  
  let score = 0;

  positiveWords.forEach((word) => {
    if (text.includes(word)) score++;
  });
  
  negativeWords.forEach((word) => {
    if (text.includes(word)) score--;
  });

  return score;
}

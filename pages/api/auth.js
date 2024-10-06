const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  '998151195957-65s2khsrr16mqlta7ddau30up4bf30hb.apps.googleusercontent.com',
  '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',
  'https://fexa.vercle.app'
);

// Endpoint to redirect the user for Google login

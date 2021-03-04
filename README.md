# notifweather
Get weather notifications daily using this app.

How to run project:

npm run serve for client
npm start for server (API)

# Environment variables to set in heroku settings

## For the client

  * VUE_APP_API_BASE_URL=/api

## For the server

  * TWILIO_API_KEY
  * TWILIO_ACC_SID
  * TWILIO_AUTH_TOKEN
  * TWILIO_FROM_NUMBER
  * GMAIL_USER
  * GMAIL_PASSWORD
  * MONGO_URI
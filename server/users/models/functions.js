const request = require("request"); 
require('dotenv').config()
const nodemailer = require('nodemailer');
const cron = require("node-cron"); 

function sendNotification(msg, number) { 
  const accountSid = process.env.ACC_SID; 
  const authToken = process.env.AUTH_TOKEN; 
  const fromNumber = process.env.FROM_NUMBER;
  const client = require('twilio')(accountSid, authToken); 

  client.messages 
      .create({ 
         body: msg,       
         to: number,
         from: fromNumber 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
}
function getData(city) {
  const request = require("request"); 
  require('dotenv').config();
  let apiKey = process.env.API_KEY;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  return new Promise((resolve, reject) => {
    request(url, function (err, response, body) {
      if(err){
        reject(err);
      } else {
        resolve(JSON.parse(body).main.temp);
      }
    });
  })
}
  
function getDataAndMessage(city, number) {
  const request = require("request"); 
  require('dotenv').config();
  let apiKey = process.env.API_KEY;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  return new Promise((resolve, reject) => {
    request(url, function (err, response, body) {
      if(err){
        reject(err);
      } else {
        let msg = `It is ${JSON.parse(body).main.temp} degrees in ${city.charAt(0).toUpperCase() + city.slice(1)}!`; 
        sendNotification(msg, number);
        resolve(JSON.parse(body).main.temp);
      }
    });
  })
}

function getEmailData(city) {
  const request = require("request"); 
  require('dotenv').config();
  let apiKey = process.env.API_KEY;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  return new Promise((resolve, reject) => {
    request(url, function (err, response, body) {
      if(err){
        reject(err);
      } else {
        return(JSON.parse(body).main.temp);
      }
    });
  })
}

function subscribeTextNotifs(city, number, time){
  cron.schedule(`0 ${time} * * *`, () => { 
    getDataAndMessage(city, number);  
  }); 
}

function subscribeEmailNotifs(city, email, time) {
  const password = process.env.PASSWORD;
  let temp = getEmailData(city);

  // Create mail transporter.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'notifweather@gmail.com',
      pass: password
    }
    });
  
  cron.schedule(`0 ${time} * * *`, function() {
    let messageOptions = {
      from: 'notifweather@gmail.com',
      to: email,
      subject: 'Daily Weather Update',
      text: `It is ${temp} degrees in ${city.charAt(0).toUpperCase() + city.slice(1)}!`
    };

    transporter.sendMail(messageOptions, function(error, info) {
      if (error) {
        throw error;
      } else {
        console.log('Email successfully sent!');
      }
    });
  });
}
module.exports = { getData, subscribeTextNotifs, subscribeEmailNotifs };
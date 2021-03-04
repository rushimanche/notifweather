/*
These are all the functions for user.model.js. It makes code cleaner by separating in newfile.
*/

const request = require("request"); 
require('dotenv').config()
const nodemailer = require('nodemailer');
const cron = require("node-cron"); 

//Sends SMS message with body to a number.
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

//Gets temperature for a city.
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

//Gets city weather that can be sent through email.
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

//Subscribes a user to text message updates.
let task = {};
function subscribeTextNotifs(city, number, time, state){
  if (!task.hasOwnProperty(number)) {
    task[number] = cron.schedule(`0 ${time} * * *`, () => { 
      getData(city, number);  
      }); 
  }

  if (state) {
    task[number].start();
  }
  else {
	  task[number].stop();
  }
}

function subscribeEmailNotifs(city, email, time, state) {
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
  
  const task = cron.schedule(`0 ${time} * * *`, function() {
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

  if (state) {
    task.start();
  }
  else {
    task.stop();
  }
}

//Verifies if a city is truly a city or not.
function verifyCity(city) {
  const request = require("request"); 
  let url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=cities-and-towns-of-the-united-states&q=${city}`;
  return new Promise((resolve, reject) => {
    request(url, function (err, response, body) {
      if(err){
        reject(err);
      } else {
        resolve(JSON.parse(body).nhits);
      }
    });
  })
}

//Exports out functions.
module.exports = { getData, subscribeTextNotifs, subscribeEmailNotifs, verifyCity };
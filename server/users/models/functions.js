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

let task;

function subscribeTextNotifs(city, number, time, state){
  if (!task) {
    task = cron.schedule(`0 ${time} * * *`, () => { 
	  getData(city, number);  
    }); 
  }

  if (state) {
    task.start();
  }
  else {
	  task.stop();
  }
}

function subscribeEmailNotifs(city, email, time, state) {
  const password = process.env.PASSWORD;
  //let temp = getEmailData(city);
  let temp = '12';
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
module.exports = { getData, subscribeTextNotifs, subscribeEmailNotifs, verifyCity };
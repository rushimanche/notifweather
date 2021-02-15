const request = require("request"); 
require('dotenv').config()

function sendNotification(msg) { 
    client.messages 
      .create({ 
        body: msg, 
        to: process.env.TO, 
        from: process.env.FROM 
      }) 
      .then(message => console.log(message.sid)); 
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
  
function getDataAndMessage(city) {
    let apiKey = process.env.API_KEY;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    request(url, function (err, response, body) {
      if(err){
        console.log('error:', error);
      } else {
        let weather = JSON.parse(body)
        let msg = `The weather in ${weather.name} today is ${weather.main.temp}!`;
        return [weather.main.temp, weather.name]
      }
  
      sendNotification(msg);
    });
}

module.exports = { getData };
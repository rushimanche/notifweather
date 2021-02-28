<template>
  <div class="alerts-form">
    <div v-if="!submitted">
        <h2>subscribe to notifweather</h2>
      <p class="hint-text">we will email and text you every day with weather updates in your area</p>
      <div class="form-group">
        <label for="email">email</label>
        <input
              type="text"
              class="form-control"
              id="email"
              required
              v-model="weather.email"
              name="email"
            />
      </div>
      <div class="form-group">
        <label for="password">password</label>
        <input
              type="text"
              class="form-control"
              id="password"
              required
              v-model="weather.password"
              name="password"
            />  
      </div>
          <div class="form-group">
        <label for="number">phone number</label>
            <input
              type="text"
              class="form-control"
              id="number"
              required
              v-model="weather.number"
              name="number"
            />
      </div>
          <div class="form-group">
        <label for="number">what city would you like to receive notifications for?</label>
            <input
              type="text"
              class="form-control"
              id="city"
              required
              v-model="weather.city"
              name="city"
            />
      </div>
          <div class="form-group">
        <label for="time">what time would you like to be notified?</label>
            <select
              type="text"
              class="form-control"
              id="time"
              required
              v-model="weather.time"
              name="time"
            >
            <option value="1">1 AM</option>
            <option value="2">2 AM</option>
            <option value="3">3 AM</option>
            <option value="4">4 AM</option>
            <option value="5">5 AM</option>
            <option value="6">6 AM</option>
            <option value="7">7 AM</option>
            <option value="8">8 AM</option>
            <option value="9">9 AM</option>
            <option value="10">10 AM</option>
            <option value="1q">11 AM</option>
            <option value="12">12 AM</option>
            <option value="13">1 PM</option>
            <option value="14">2 PM</option>
            <option value="15">3 PM</option>
            <option value="16">4 PM</option>
            <option value="17">5 PM</option>
            <option value="18">6 PM</option>
            <option value="19">7 PM</option>
            <option value="20">8 PM</option>
            <option value="21">9 PM</option>
            <option value="22">10 PM</option>
            <option value="23">11 PM</option>
            <option value="24">12 PM</option>
            </select>
      </div>
      <center>
      <button @click="saveInput" class="btn-notif btn btn-success">Submit</button>
      </center>
    </div>
    <div class="btn-notif" v-else>
      <h4>Account Created!</h4>
      <button class="btn btn-success" @click="redirect">Login</button>
    </div>
  </div>
</template>

<script>
import Data from "../services/Data";
import router from "../router";

function verifyEmail(email){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
}
function verifyNumber(number){
      const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
      return re.test(String(number));
}

export default {
  name: "weather-alerts",
  data() {
    return {
      weather: {
        id: null,
        email: "",
        password: "",
        number: "",
        city: "",
        time: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    async saveInput() {
      var data = {
        email: this.weather.email,
        password: this.weather.password,
        number: this.weather.number,
        time: this.weather.time,
        city: this.weather.city,
        state: true
      };
      
      var notifdata = {
        email: this.weather.email,
        state: true
      }
      var authemail = {
        email: this.weather.email
      };
      const authcheck = await Data.loginRedirect(authemail);
      if ((authcheck.data) != '') {
        alert('Email already used!');
      }
      else {
        if (verifyEmail(this.weather.email) == false) {
          alert('Email not valid! Please try again.');
        }
        else{
          if (verifyNumber(this.weather.number) == false) {
            alert('Phone Number not valid! Please try again.');
          }
          else {
            if (Data.verifyCity(this.weather.city) == '0') {
              alert('City does not exist! Please try again.');
            }
            else{
              Data.createUser(data)
              .then(response => {
                this.weather.id = response.data.id;
                this.submitted = true;
                Data.subscribeNotifications(notifdata);
              })
              .catch(e => {
                console.log(e);
              });
            }
          }
        }
      }    
    },
    newData() {
      this.submitted = false;
      this.email = {};
      this.password = {};
      this.number = {};
      
    },
    redirect(){
      router.push({name: 'login'});
    }
  }
};
</script>

<style>
.alerts {
  border:10px solid #003366;
  width: 800px;
  margin: 0 auto;
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
html, body {
	min-height: 100%;
}
h2 { 
  text-align: center 
}
body {
  background: #ff5e63;
  font-family: 'Montserrat', sans-serif;
	background: linear-gradient(#99ffbb, #ffff80) no-repeat;
}
.form-control {
	border-color: #d7d7d7;
	box-shadow: none;
}
.form-control:focus, .btn:focus {
  border-color: #a177ff;
  box-shadow: 0 0 10px #c2a8ff;
}
.alerts-form {
	width: 500px;   
  margin: 0 auto;
  padding: 40px 0;
  background: #fff;
  padding: 40px;
  border-radius: 45px;
  margin: 0 auto;
}
.alerts-form h1 {
	text-align: center;
	font-size: 50px;
  margin: 0 0 15px;
}
.alerts-form .form-group {
	margin-bottom: 20px;
}
.alerts-form .form-control, .alerts-form .btn  {        
  border-radius: 5px;
	min-height: 40px;
	transition: all 0.5s;
	outline: none;
}
.alerts-form .btn {
  background: #a177ff;
	font-size: 18px;
	min-height: 50px;
  min-width: 150px;
	border: none;
}
.alerts-form .btn:hover, .alerts-form .btn:focus {
  background: #8048ff;
	outline: none;
}
.alerts-form .btn i {
	margin-right: 5px;
}
.alerts-form label {
  color: rgb(172, 168, 168);
	font-weight: normal;
}
.alerts-form textarea {
  resize: vertical;
}
.hint-text {
  font-size: 15px;
	text-align: center;
  padding-bottom: 25px;
  opacity: 0.8;
}
.btn-notif {
  text-align: center;
}
</style>
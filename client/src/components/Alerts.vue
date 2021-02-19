<template>
  <div class="jumbotron alerts text-center">
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <h6><label for="email">Email</label></h6>
          <input
            type="text"
            class="form-control"
            id="email"
            required
            v-model="weather.email"
            name="email"
          />
          <h6><label for="password">Password:</label></h6>
          <input
            type="text"
            class="form-control"
            id="password"
            required
            v-model="weather.password"
            name="password"
          />          
          <h6><label for="number">What is your phone number to receive push notifications?</label></h6>
          <input
            type="text"
            class="form-control"
            id="number"
            required
            v-model="weather.number"
            name="number"
          />
          <h6><label for="time">What time would you like to be notified?</label></h6>
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

        <button @click="saveInput" class="btn btn-success">Submit</button>
      </div>
      <div v-else>
        <h4>Account Created!</h4>
        <button class="btn btn-success" @click="redirect">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "../services/Data";
import router from "../router";

export default {
  name: "weather-alerts",
  data() {
    return {
      weather: {
        id: null,
        email: "",
        password: "",
        number: "",
        time: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveInput() {
      var data = {
        email: this.weather.email,
        password: this.weather.password,
        number: this.weather.number,
        time: this.weather.time,
        state: this.weather.st
      };
      var authemail = {
        email: this.weather.email
      };
      Data.loginRedirect(authemail)
        .then(response => {
        this.var = response.data;
        })
      if ((this.var[0]) != undefined) {
        alert('Email already used!');
      }
      else {
        Data.createUser(data)
          .then(response => {
            this.weather.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            Data.subscribeNotifications(data);
          })
          .catch(e => {
            console.log(e);
          });
        }    
    },
    newData() {
      this.submitted = false;
      this.email = {};
      this.password = {};
      this.number = {};
      
    },
    redirect(){
      console.log('hello');
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
</style>
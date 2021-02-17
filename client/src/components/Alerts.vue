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
        </div>

        <button @click="saveInput" class="btn btn-success">Submit</button>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newData">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "../services/Data";

export default {
  name: "weather-alerts",
  data() {
    return {
      weather: {
        id: null,
        email: "",
        password: "",
        number: "",
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
        state: true
      };
      var authemail = {
        email: this.weather.email
      };
      console.log(Data.loginRedirect(data.email));
      if (Data.loginRedirect(data.email) == '') {
        alert('Email already used!');
      }
      else {
        alert('lol');
        /*
        Data.createUser(data)
          .then(response => {
            this.weather.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
          */
        }    
    },
    
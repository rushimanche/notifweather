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
<template>
  <div class="jumbotron mycustom-jumbotron text-center">
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
          <h6><label for="password">Password</label></h6>
          <input
            type="text"
            class="form-control"
            id="password"
            required
            v-model="weather.password"
            name="password"
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
import router from "../router";

export default {
  name: "weather-login",
  data() {
    return {
      weather: {
        id: null,
        number: "",
        email: "",
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
      };
      var redirectdata = {
        email: this.weather.email
      };
      Data.userLogin(data)
        .then(response => {
          this.accessToken = response.data.accessToken;
          this.submitted = true;
        })
      if (this.accessToken != ''){
        Data.loginRedirect(redirectdata)
          .then(response => {
          this.var = response.data;
          console.log(this.var);
          router.push({name: 'home', params: {data: this.var}});
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
    }
  }
};
</script>

<style>
.mycustom-jumbotron {
  border:10px solid #003366;
  width: 300px;
  margin: 0 auto
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
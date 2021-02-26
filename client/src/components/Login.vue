<template>
  <div class="jumbotron mycustom-jumbotron text-center">
    <div class="submit-form">
      <div>
        <div class="form-group">
          <h3 class="login">login</h3> <br>
          <h6 class="labels"><label for="email">email</label></h6>
          <input
            type="text"
            class="form-control"
            id="email"
            required
            v-model="weather.email"
            name="email"
          />
          <br>
          <br>
          
          <h6 class="labels"><label for="password">password</label></h6>
          <input
            type="text"
            class="form-control"
            id="password"
            required
            v-model="weather.password"
            name="password"
          />          
        </div>
        <br>

        <button @click="saveInput" class="btn">submit</button>
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
      console.log(this.accessToken);
      if (this.accessToken != undefined){
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
      else {
        alert('Wrong credentials! Please try again.')
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
  font-family: 'Montserrat', sans-serif;
  width: 600px;
  height: 500px;
  margin: 0 auto;
  border-radius: 45px;
}
.submit-form {
  max-width: 1000px;
  margin: auto;
}
.labels {
  font-size: 22px;
}
.login {
  font-size: 30px;
}
.btn {
  background-color: #A177FF; 
  color: white;
  height: 50px;
  width: 150px;
  font-size: 19.5px;
  text-align: center;
}
</style>
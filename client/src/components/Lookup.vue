<template>
  <div>
    <br>
    <div class="jumbotron lookup text-center lookup-form">
      <div v-if="!submitted">
        <div class="form-group">
          <h4><label class="lookupfont" for="city">what city do you want to see the weather in?</label></h4>
          <input
            type="text"
            class="form-control"
            id="city"
            required
            v-model="weather.city"
            name="city"
          />
        </div>

        <button @click="saveInput" class="btn btn-success">Submit</button>
      </div>

      <div v-else>
        <span v-html="HTMLoutput"></span>
      </div>
    </div>
    <br>
    <br>
    <lookup>
    </lookup>
  </div>
</template>

<script>
import Data from "../services/Data";
import lookup from '../components/Alerts.vue';
let temp = 0;

export default {
  components: { lookup },
  name: "weather-lookup",
  data() {
    return {
      weather: {
        id: null,
        city: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    async saveInput() {
      var data = {
        city: this.weather.city,
      };
      try {
        const response = await Data.getWeather(data);
        this.weather.id = response.data.id;
        temp = parseInt(response.data);
        this.submitted = true;
        this.HTMLoutput = `<h4>It is ${temp} degrees in ${this.weather.city}!</h4>`;
      } catch (e) {
        console.log(e)
      }
    },
    newCity() {
      this.submitted = false;
      this.city = {};
    }
  }
};
</script>

<style>
.lookup {
  width: 800px;
  margin: 0 auto;
  background-color: #ffffe6;
  border-radius: 45px;
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
.lookup-form .form-control, .lookup-form .btn  {        
  border-radius: 5px;
	min-height: 40px;
	transition: all 0.5s;
	outline: none;
}
.lookup-form .btn {
  background: #a177ff;
	font-size: 18px;
	min-height: 50px;
  min-width: 150px;
	border: none;
}
.lookup-form .btn:hover, .lookup-form .btn:focus {
  background: #8048ff;
	outline: none;
}
.lookup-form .btn i {
	margin-right: 5px;
}
</style>
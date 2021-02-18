<template>
  <div>
    <div class="jumbotron lookup text-center">
      <div v-if="!submitted">
        <div class="form-group">
          <h4><label class="lookupfont" for="city">What city do you want to see the weather in?</label></h4>
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
    <alerts>
    </alerts>
  </div>
</template>

<script>
import Data from "../services/Data";
import alerts from '../components/Alerts.vue';
let temp = 0;

export default {
  components: { alerts },
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
  created() {
  	this.HTMLoutput = '<h4> It is ' + temp + 'degrees in ' + this.weather.city + ' </h4>';
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
  border:10px solid #003366;
  width: 800px;
  margin: 0 auto
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
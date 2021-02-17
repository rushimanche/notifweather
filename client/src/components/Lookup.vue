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
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newCity">Add</button>
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
  methods: {
    async saveInput() {

      var data = {
        city: this.weather.city,
      };
      try {
        const response = await Data.getWeather(data);
        this.weather.id = response.data.id;
        console.log(parseInt(response.data));
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
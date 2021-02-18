<template>
  <div class="jumbotron alerts text-center">
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <h6>Change State</h6>
          <label class="switch" for="state">
            <input 
                type="checkbox" 
                class="form-control" 
                v-model="weather.state" 
                id="state"
                :checked="notifstate"
                @click="changeState()"
            />
            <div class="slider round">
                <span class="on">ON</span>
                <span class="off">OFF</span>
            </div>
          </label>
          <h6><label for="number">Change Phone Number</label></h6>
          <input
            type="text"
            class="form-control"
            id="number"
            v-model="weather.number"
            name="number"
          />
          <h6><label for="password">Change Password</label></h6>
          <input
            type="text"
            class="form-control"
            id="password"
            v-model="weather.password"
            name="password"
          />     
        </div>

        <button @click="saveInput" class="btn btn-success">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "../services/Data";

export default {
  name: "weather-home",

  created() {
      this.notifstate = this.$route.params.data[0].state;
      this.weather.state = this.notifstate;
  },
  data() {
    return {
      weather: {
        state: true,
        number: "",
        email: false
      },
      submitted: false
    };
  },
  methods: {
    saveInput() {
      var data = {};
      if ((this.weather.password != '') && (this.weather.number != '')) {
        data = {
          email: this.$route.params.data[0].email,
          password: this.weather.password,
          number: this.weather.number,
          state: this.weather.state
        }
      }
      else if (this.weather.number != '') {
        data = {
          email: this.$route.params.data[0].email,
          password: this.$route.params.data[0].password,
          number: this.weather.number,
          state: this.weather.state
        }
      }
      else if (this.weather.password != '') {
        data = {
          email: this.$route.params.data[0].email,
          password: this.weather.password,
          number: this.$route.params.data[0].number,
          state: this.weather.state
        }
      }
      else {
        data = {
          email: this.$route.params.data[0].email,
          password: this.$route.params.data[0].number,
          number: this.$route.params.data[0].number,
          state: this.weather.state
        }
      }
      Data.updateUser(data)
        .then(response => {
          this.weather.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeState() {
        if(this.weather.state == true) {
          this.weather.state = false;
        }
        else {
          this.weather.state = true;
        }
    },
    newData() {
      this.submitted = false;
      this.email = {};
      this.password = {};
      this.number = {};
      
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

.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ca2222;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2ab934;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.on
{
  display: none;
}

.on, .off
{
  color: white;
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

input:checked+ .slider .on
{display: block;}

input:checked + .slider .off
{display: none;}

/*--------- END --------*/

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;}
</style>
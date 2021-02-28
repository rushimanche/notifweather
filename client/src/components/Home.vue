<template>
  <div class="jumbotron alerts text-center">
    <div class="submit-form" v-if="!submitted">
      <div>
        <div class="form-group">
          <h6>Change State</h6>
          <label class="switch" for="state">
            <input 
                type="checkbox" 
                class="form-control" 
                v-model="weather.state" 
                id="state"
                :checked="notifstate"
                @click="changeState"
            />
            <div class="slider round">
                <span class="on">ON</span>
                <span class="off">OFF</span>
            </div>
          </label>
          <br>
          <h6><label for="number">Change Phone Number</label></h6>
          <input
            type="text"
            class="form-control"
            id="number"
            v-model="weather.number"
            name="number"
          />
          <br>
          <h6><label for="password">Change Password</label></h6>
          <input
            type="text"
            class="form-control"
            id="password"
            v-model="weather.password"
            name="password"
          />   
          <br>
          <h6><label for="city">Change City</label></h6>
          <input
            type="text"
            class="form-control"
            id="city"
            v-model="weather.city"
            name="city"
          />   
          <br>
          <h6><label for="time">Change Time</label></h6>
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

        <button @click="saveInput" class="btn">Submit</button>
      </div>
    </div>
    <div class="btn-notif" v-else>
      <h4>Account Updated!</h4>
      <button class="btn btn-success" @click="redirecthome">Home Page</button>
      <button class="btn btn-success" @click="redirectlogin">Login Again</button>
    </div>
  </div>
</template>

<script>
import Data from "../services/Data";
import router from "../router";

var data = {};

function verifyNumber(number){
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return re.test(String(number));
}

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
        city: "",
        time: "",
        email: false
      },
      submitted: false
    };
  },
  methods: {
    saveInput() {
      data = {
          email: this.$route.params.data[0].email,
          number: this.weather.number || this.$route.params.data[0].number,
          city: this.weather.city || this.$route.params.data[0].city,
          time: this.weather.time || this.$route.params.data[0].time,
          state: this.weather.state
      }
      
      let verifyData = {
        city: data.city
      }
      if (this.weather.password) {
        data.password = this.weather.password;
      }

      if (verifyNumber(data.number) == false) {
        alert('Phone Number not valid! Please try again.');
      }
      else {
        if (Data.verifyCity(verifyData) == '0') {
          alert('City does not exist! Please try again.');
        }
        else{
          Data.updateUser(data)
            .then(response => {
            console.log(response.data);
            this.submitted = true;
          })
            .catch(e => {
              console.log(e);
            });
          }
      }  

      this.$forceUpdate();
    },
    changeState() {
        if(this.weather.state == true) {
          this.weather.state = false;
          Data.subscribeNotifications(data);
        }
        else {
          this.weather.state = true;
          Data.subscribeNotifications(data);
        }
    },
    newData() {
      this.submitted = false;
      this.email = {};
      this.password = {};
      this.number = {};
      
    },
    redirectlogin(){
      router.push({name: 'login'});
    },
    redirecthome(){
      router.push({name: ''});
    }
  }
};
</script>

<style>
.alerts {
  width: 800px;
  margin: 0 auto;
  font-family: 'Montserrat', sans-serif;
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

.btn {
  background-color: #A177FF; 
  color: white;
  height: 50px;
  width: 150px;
  font-size: 19.5px;
  text-align: center;
}
</style>
<template>
    <div class="row">
        <div class="container">
           
            <h4 style="text-align:center">Weather</h4>
            <div class="row">
            <div class="medium-6 medium" id="weatherApp">
                <router-link to="/local" ><h6 v-show="city" v-on:click="show('local')">{{currentcity}}</h6></router-link>
                <span class="text-caption" v-show="currentTempDisplay">
                    {{weatherMain}}:{{weatherDesc}}
                </span>
                 <!-- <moon-loader class="custom-class" :color="red" :loading='this.$store.state.loading' :size="40"></moon-loader>  -->
                <h3 v-show="currentTempDisplay">
                    <i class="wi" :class="[classWI]"></i>{{curTempDisplay}}
                    <span class="btn btn-deg Cels" :class="{ 'btn-deactivate': displayMode }" @click="getTemp(0)">°C</span>
                    <span class="btn btn-deg Faren" :class="{ 'btn-deactivate': !displayMode }" @click="getTemp(1)">°F</span>
                </h3>
                <span class="">
                    <i class="wi wi-refresh" title="click for refresh result" @click="getLocation"></i>
                </span>
            </div>
        </div>
        </div>
        
        
    </div>
</template>

<script>
var CELSIUS = 0, FAHRENHEIT = 1;
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'weatherforecast',
  components: {
  },
  data: ()=>({
    latitude: 0.0,
    longitude: 0.0,
    city: 'Hello from Qexon',
    curTemp: null,
    displayMode: CELSIUS,
    dataObj: null,
    weatherMain: 'Fine',
    weatherDesc: 'Clear day',
    errorMsg: '',
    currentTempDisplay: true,
    red: 'cadetblue',

  }),
  computed: {
      ...mapState([
               'currentcity'
            ]),
      classWI: function() { 
        if (this.dataObj != null){
          var weatherID = this.dataObj.weather[0].id;
          if (weatherID >= 200 && weatherID <= 232) {
            return 'wi-thunderstorm';
          } else if (weatherID >= 300 && weatherID <= 321) {
            return 'wi-sprinkle';
          } else if (weatherID >= 500 && weatherID <= 531) {
            return 'wi-rain';
          } else if (weatherID >= 600 && weatherID <= 622) {
            return 'wi-snow';
          } else if (weatherID >= 701 && weatherID <= 781) {
            return 'wi-train';
          } else if(weatherID == 800) {
            return 'wi-moon-alt-new';
          } else if (weatherID >= 801 && weatherID <= 804) {
            return 'wi-cloud';
          } else if (weatherID >= 900 && weatherID <= 962) {
            return 'wi-small-craft-advisory';
          }
        }
        return '';
    },
     curTempDisplay: function(){ 
        if(this.curTemp != null){
            if(this.displayMode == CELSIUS){
                return (this.curTemp - 273.15).toFixed(1);
            }
            else{
                return (this.curTemp * 9/5 - 459.67).toFixed(1);
            }
        }
        else{
            return null;
        }
     }
  },
  created() { 
    this.getLocation();
    console.log('app ready')
  },
  methods: {
      getTemp: function(option){ 
      this.displayMode = option
      },
      getLocation: function(){ 
        if (!navigator.geolocation) {
            this.errorMsg = "Geolocation is not supported by your browser";
            this.city = this.errorMsg;
            console.warn(this.errorMsg);
            return;
        }
        console.log('Getting current position..');
        var options = {timeout:60000};
        navigator.geolocation.getCurrentPosition(this.success, this.error, options);
      },
      success:function(position){ 
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.latitude = parseFloat(this.latitude).toFixed(2);
        this.longitude = parseFloat(this.longitude).toFixed(2);
        this.getWeather();
      },
      error: function(err){ 
        this.errorMsg = "UNable to retrieve your location";
        this.city = this.errorMsg;
      },
      getWeather: function() { 
      this.$store.state.loading = true
        var reqURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + this.latitude + '&lon=' + this.longitude + '&APPID=69d3cf86b46f19cf3e049339355533aa';
      
        this.$http.get(reqURL).then(function(response) { 
        this.$store.state.loading = false
            this.dataObj = response.data;
            this.curTemp = this.dataObj.main.temp;
             localStorage.setItem('currentcity', this.dataObj.name);
            // this.$store.state.currentcity = this.dataObj.name;
            this.$store.state.currentcity = localStorage.currentcity
            this.weatherMain = this.dataObj.weather[0].main;
            this.weatherDesc = this.dataObj.weather[0].description;
           
        }, function(response) {
            console.log(response);
            });
      },
      show(params){ 
        if(params === 'local'){
          localStorage.setItem('param', params)
          this.$store.state.homeclickevent = false
          this.$store.state.nationalclickevent = false
          this.$store.state.businessclickevent = false
          this.$store.state.technologyclickevent = false
          this.$store.state.entertainmentclickevent = false
          this.$store.state.sportsclickevent = false
          this.$store.state.scienceclickevent = false
          this.$store.state.healthclickevent = false
          this.$store.state.localclickevent = true
          this.$store.state.dateclickevent = false
        }
      }
  },
};
</script>
<style scoped>

#weatherApp{
    margin-left: 20%
}
.container{
    background: #d6dadd24 !important;
        margin-top: 10%;
        border: 1px solid #dadce0;
        border-radius: 8px;
        margin-left: 3%;
}refresh{
    cursor: pointer;
}
.Cels, .Faren{
    padding: 8px 15px 8px 15px
}
.Faren{
    float: right;
}
.btn-deactivate{
  color: cadetblue;
  cursor: pointer;
    }

</style>


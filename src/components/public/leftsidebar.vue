<template>
    <div class="leftsidebar">
        <weather-forecast></weather-forecast>
        <div class="container">
            <h4>categories</h4>
            <div class="cats">
                <router-link to="/national" ><div class="categories" v-on:click="show('national')">National</div></router-link>
                <!-- <br> -->
                <router-link to="/" ><div class="categories" v-on:click="show('home')">World</div></router-link>
                <router-link to="/local" ><div class="categories" v-on:click="show('local')">Local</div></router-link>
                <router-link to="/business" ><div class="categories" v-on:click="show('business')">Business</div></router-link>
                <router-link to="/technology" ><div class="categories" v-on:click="show('technology')">Technology</div></router-link>
                <router-link to="/entertainment" ><div class="categories" v-on:click="show('entertainment')">Entertainment</div></router-link>
                <router-link to="/sports" ><div class="categories" v-on:click="show('sports')">Sports</div></router-link>
                <router-link to="/science" ><div class="categories" v-on:click="show('science')">Science</div></router-link>
                <router-link to="/health" ><div class="categories" v-on:click="show('health')">Health</div></router-link>
            </div>
            
        </div>

        <div class="container">
          <h4>Sort By Date</h4>
              <date-picker v-model="time3" :lang="lang" @confirm="fetchDate" range   confirm clearable editable class="datepicker"></date-picker>
              <!-- <p>{{fromDate}}-{{toDate}}</p> -->
        </div>
        
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import {mapState, mapMutations} from 'vuex'
import weatherForecast from '@/components/public/weatherforecast';
import datepicker from 'vue-date-picker'
    export default {
        name: 'leftsidebar',
        components: {
            weatherForecast, DatePicker
        },
        data: ()=>({
          time3: '',
          lang: 'en',
          lang: {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            pickers: ['next 1 week', 'next 1 month', 'previous 1 week', 'previous 1 month'],
            placeholder: {
              dateRange: 'Select Date Range'
            },
            
          },
        }),
        computed: {
            ...mapState([
               'fromDate',
               'toDate'
            ])
         },
        methods: {
           ...mapMutations([
            'SORTING_QUERY',
          ]),
          fetchDate(){
              let yearF = this.time3[0].getFullYear()
              let monthF = this.time3[0].getMonth() + 1
              let dayF = this.time3[0].getDate()

              let yearT = this.time3[1].getFullYear()
              let monthT = this.time3[1].getMonth() + 1
              let dayT = this.time3[1].getDate()

            this.$store.state.fromDate = yearF + '-' + monthF + '-' + dayF
            this.$store.state.toDate = yearT + '-' + monthT + '-' + dayT

            localStorage.setItem('fromDate', this.$store.state.fromDate)
            localStorage.setItem('toDate', this.$store.state.toDate)
            this.show('date')

            this.SORTING_QUERY({'this': this, query: '', check: 'check'})
            
            this.$router.push('/date') 

          },
            show(params){ 
              if(params === 'home'){
                localStorage.setItem('param', params)
                this.$store.state.homeclickevent = true
                this.$store.state.nationalclickevent = false
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = false
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
              }else if(params === 'national'){
                localStorage.setItem('param', params)
                this.$store.state.homeclickevent = false
                this.$store.state.nationalclickevent = true
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = false
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
              }else if(params === 'business'){
                localStorage.setItem('param', params)
                this.$store.state.homeclickevent = false
                this.$store.state.nationalclickevent = false
                this.$store.state.businessclickevent = true
                this.$store.state.technologyclickevent = false
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
         
              }else if(params === 'technology'){
                localStorage.setItem('param', params)
                this.$store.state.homeclickevent = false
                this.$store.state.nationalclickevent = false
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = true
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
         
              }else if(params === 'entertainment'){
                localStorage.setItem('param', params)
                this.$store.state.homeclickevent = false
                this.$store.state.nationalclickevent = false
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = false
                this.$store.state.entertainmentclickevent = true
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
         
              }else if(params === 'sports'){
                this.$store.state.homeclickevent = false
                this.$store.state.nationalclickevent = false
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = false
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = true
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
         
              }else if(params === 'science'){
                localStorage.setItem('param', params)
                this.$store.state.homeclickevent = false
                this.$store.state.nationalclickevent = false
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = false
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = true
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
         
              }else if(params === 'health'){
                localStorage.setItem('param', params)
                this.$store.state.homeclickevent = false
                this.$store.state.nationalclickevent = false
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = false
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = true
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
         
              }
              else if(params === 'local'){
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
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = false
         
              }
              else if(params === 'date'){
                localStorage.setItem('param', params)
                this.$store.state.homeclickevent = false
                this.$store.state.nationalclickevent = false
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = false
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.searchclickevent = false
                this.$store.state.dateclickevent = true
         
              }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.categories{
    text-decoration: none;
    font-family: Oswald,sans-serif;
    font-size: 0.8em;
    color: #000;
    font-weight: inherit;
    opacity: 0.8;
    text-align: center;
    line-height: 30px
}
.container{
    background:#d6dadd24 !important;
    margin-top: 10%;
    border: 1px solid #dadce0;
    border-radius: 8px;
    margin-left: 3%;
}
.datepicker{
  padding-bottom: 10%;
}
</style>
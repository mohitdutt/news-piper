<template>
  <!--Navbar-->
<div>
  <!-- <mdb-container>  -->
    <modal-func v-if="this.$store.state.modalFunc"></modal-func>
       <mdb-navbar dark class="navbar fixed-top navbar-expand-lg navbar-dark lighten-3" id="navbar">
    <!-- Navbar brand -->
    <mdb-navbar-brand>
      <img src="../../assets/logosmall.png" height="30" alt="">
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
        <mdb-navbar-nav>
          
          <router-link to="/" ><mdb-nav-item href="" active><p v-on:click="show('home')">Home</p></mdb-nav-item></router-link>
          <router-link to="/national"><mdb-nav-item href=""><p v-on:click="show('national')">National</p></mdb-nav-item></router-link>
          <router-link to="/business"><mdb-nav-item href=""><p v-on:click="show('business')">Business</p></mdb-nav-item></router-link>
          <router-link to="/technology"><mdb-nav-item href=""><p v-on:click="show('technology')">Technology</p></mdb-nav-item></router-link>
          <router-link to="/entertainment"><mdb-nav-item href=""><p v-on:click="show('entertainment')">Entertainment</p></mdb-nav-item></router-link>
          <router-link to="/sports"><mdb-nav-item href=""><p v-on:click="show('sports')">Sports</p></mdb-nav-item></router-link>
          <router-link to="/science"><mdb-nav-item href=""><p v-on:click="show('science')">Science</p></mdb-nav-item></router-link>
          <router-link to="/health"><mdb-nav-item href=""><p v-on:click="show('health')">Health</p></mdb-nav-item></router-link>
        </mdb-navbar-nav>
            <input class="form-control mr-auto p-2" type="text" placeholder="Search" aria-label="Search" v-model="string" v-on:keyup.enter="onEnterClick">
            <div class="sign up">
              <router-link to="/" ><mdb-btn class="btn-login" @click="dark()" darkWaves v-bind:style="{display: displayIn}">Log In</mdb-btn></router-link>
              <router-link to="/" ><mdb-btn class="btn-logout" @click="darkOut()" darkWaves v-bind:style="{display: displayOut}">Log Out</mdb-btn></router-link>
              
            </div>
            <img :src="getPic(index)" class="profile_image" v-bind:style="{display: displayImage}">
    </mdb-navbar-toggler>
  </mdb-navbar>
  <!-- <moon-loader class="custom-class" :color="red" :loading='this.$store.state.loading' :size="80"></moon-loader> -->
  <modal-login v-if="this.$store.state.dark"></modal-login>
<!-- </mdb-container> -->
</div>

</template>

<script>
import {mapState, mapMutations} from 'vuex'
import modalFunc from '@/components/private/modalFunc';
import modalLogin from '@/components/private/login';
import { mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbBtn } from 'mdbvue';
export default {
  name: 'navbar',
  components: {
    mdbContainer,
    mdbRow,
    mdbIcon,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbInput,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownMenu,
    mdbDropdownItem,
    mdbBtn,
    modalLogin, modalFunc
  },
  data: ()=>({
    string: '',
    red: 'cadetblue',
    index: ''
    
    }),
  computed: {
    ...mapState([
        'displayIn',
        'displayOut',
        'displayImage'
    ])
    },
    mounted() {
      this.checkStatus()
    },
  methods: {
    getPic(index){
        return localStorage.userImage
     },
    checkStatus(){
      
      if(localStorage.accessToken != undefined){
        this.$store.state.displayIn = 'none'
        this.$store.state.displayOut = 'block'
        this.$store.state.displayImage = 'block'
      }else if(localStorage.accessToken == undefined){
        this.$store.state.displayIn = 'block'
        this.$store.state.displayOut = 'none'
        this.$store.state.displayImage = 'none'
      }
    },
    dark(){
      this.$store.state.dark = true     
    },
    darkOut(){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userImage');
      localStorage.removeItem('useremail');
        this.$store.state.displayIn = 'block'
        this.$store.state.displayOut = 'none'
        this.$store.state.displayImage = 'none'
        this.$router.push('/')
    },
    ...mapMutations([
        'UPDATE_CONTENT',
        'UPDATE_SEARCH'
      ]),
    onEnterClick: function(e){  
      if(e.keyCode === 13){
        this.UPDATE_CONTENT(this.string)
         this.show('search')
        this.allsearch()
      }
    },
    allsearch(){  
      this.$store.state.arrallsrch = []
      this.UPDATE_SEARCH(this)
      if(this.$router["currentRoute"].name != 'search'){
        this.$router.push('/search')
      }
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

      }else if(params === 'search'){
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
        this.$store.state.searchclickevent = true

      }
    }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width: 50%;
  height: 46px;
}
#navbar{
  background: #ccd3d921;
  top: 0;
  transition: top 1s;
}
.custom-class{
  position: fixed;
  top: 50%;
  left: 55%;
  width: -16em;
  margin-top: -5em;
  margin-left: -15em;
}
.navbar-nav{
  padding-top: 12px;
  
}
input{
  background: #d6dadd24;
  width: 40%;
}
.mr-auto{
  margin-right: 3% !important;
}
.btn-login{
    background: #d6dadd24 !important;
    color: rgb(15, 12, 12) !important;
    opacity: 0.9;
    border-radius: 6px;
    padding: 11px 20px 11px 20px;
    font-weight: 800;
    font-family: monospace;
}
.btn-logout{
    background: #d6dadd24 !important;
    color: rgb(15, 12, 12) !important;
    opacity: 0.9;
    border-radius: 6px;
    padding: 11px 20px 11px 20px;
    font-weight: 800;
    font-family: monospace;
    /* display:none */
}
p{
     color: rgb(15, 12, 12) !important;
    font-weight: 800;
    font-family: monospace;
    font-size: large;

}
.profile_image{
    margin-left: 1%;
    border-radius: 50%;
    width: 64px;
    height: 59px;
}
</style>

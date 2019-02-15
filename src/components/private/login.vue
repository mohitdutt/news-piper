<template>
<div>
  
  <mdb-container>
    <form @submit.prevent="validateBeforeSubmitLogin">
      <mdb-modal v-if="dark" @close="dark = false" dark bgSrc="https://mdbootstrap.com/img/Photos/Others/pricing-table%20(7).jpg">
        <div class="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
          <mdb-modal-header class="text-center pb-4">
            <mdb-modal-title tag="h3" bold class="w-100 white-text title"><strong>Login</strong>

            </mdb-modal-title>
             <mdb-btn  rounded size="sm" v-on:click="close" type="button" class="ml-4 mbutton">&times;</mdb-btn>
          </mdb-modal-header>
          <mdb-modal-body>
            <mdb-input label="Your email" type="email" class="mb-5" labelColor="white" name="email" v-model="email"
                       v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"/>
              <i v-show="errors.has('email')" class="fa fa-warning"></i>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>

            <mdb-input label="Your password" type="password" class="pb-3" labelColor="white" name="password" v-model="password"
                       v-validate="'required'" :class="{'input': true,'is-danger': errors.has('password')}"/>
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>

            <!-- <mdb-input type="checkbox" id="checkbox1" label="Accept the" labelClass="font-small" class="pb-4" wrapperClass="pl-0">
              <a href="#" class="green-text font-weight-bold font-small" style="margin-left: -3rem"> Terms and Conditions</a>
            </mdb-input> -->
            <mdb-row center class="">
              <!-- <mdb-column col="3" md="12"> -->
                <mdb-btn block color="success" class="btn-login" rounded type="submit">Login</mdb-btn>
              <!-- </mdb-column> -->
            </mdb-row>
            <!-- <div class="footer pt-3 mdb-color lighten-3"> -->
            <mdb-row class="d-flex justify-content-center">
              <p class="font-small white-text mb-2 pt-3">or Sign up with:</p>
            </mdb-row>
            <mdb-row class=" mt-2 d-flex justify-content-center">
              <a class="fa-lg p-2 m-2 fb-ic" @click="socialLoginFb" title="facebook"><mdb-icon  class="fab fa-facebook white-text fa-lg"> </mdb-icon></a>
              <a class="fa-lg p-2 m-2 tw-ic" @click="socialLoginTwitter" title="twitter"><mdb-icon class="fab fa-twitter white-text fa-lg"> </mdb-icon></a>
              <a class="fa-lg p-2 m-2 gplus-ic" @click="socialLoginGoogle" title="Google"><mdb-icon class="fab fa-google-plus white-text fa-lg"> </mdb-icon></a>
            </mdb-row>
          <!-- </div> -->
            <mdb-row end class="my-3 pt-3 white-text font-small">
              Don't have account? <router-link to="/Signup"><a href="" class="red-text ml-4  font-weight-bold" v-on:click="close"><strong> Sign Up</strong></a></router-link>
            </mdb-row>
            <flash-message class="myCustomClass"></flash-message>
          </mdb-modal-body>
        </div>
      </mdb-modal>
    </form>
  </mdb-container>
</div>
</template>

<script>
import * as firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8xlH7pkqOTxsoct_AWvmyIzOlxIHevg8",
    authDomain: "signinvue.firebaseapp.com",
    databaseURL: "https://signinvue.firebaseio.com",
    projectId: "signinvue",
    storageBucket: "signinvue.appspot.com",
    messagingSenderId: "6468238220"
  };
  firebase.initializeApp(config);

import modalFunc from '@/components/private/modalFunc';
import { ValidationProvider } from 'vee-validate';
import {mapState, mapMutations} from 'vuex'
import { mdbContainer, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbInput, mdbRow
        ,mdbCardBody, mdbCard,mdbCol, mdbIcon } from 'mdbvue';

export default {
  name: 'signup',
  components: {
    mdbContainer,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbInput,
    mdbRow,
    ValidationProvider,mdbCardBody, mdbCard,mdbCol, mdbIcon,
    modalFunc
  },
  data() {
    return {
        email: '', password: ''
    }
  },
  computed: {
    ...mapState([
        'dark'
    ]),
   
 },
 mounted() {
   
 },
 methods: {
   //login via facebook
      socialLoginFb(){debugger
        var provider = new firebase.auth.FacebookAuthProvider();
        var that = this
        firebase.auth().signInWithPopup(provider).then((result)=>{debugger
          this.flash('Login Successfully!', 'success', { timeout: 3000, });

           setTimeout(function(){
             that.$store.state.dark= false,
             that.$store.state.displayIn= 'none',
             that.$store.state.displayOut= 'block'
             that.$router.replace('/dashboard');
           },3000)

          var token = result.credential.accessToken;
          localStorage.setItem('accessToken', token)
          let username = localStorage.setItem('username', result.additionalUserInfo.profile.name);
          localStorage.setItem('useremail', result.additionalUserInfo.profile.email);
          this.$store.state.username = username
        }).catch((err)=>{
            this.flash('An error occurred!', 'error', { timeout: 3000, });
        })
      },

//login via twitter
      socialLoginTwitter(){
        var provider = new firebase.auth.TwitterAuthProvider();
        var that = this
        firebase.auth().signInWithPopup(provider).then((result)=>{debugger
          this.flash('Login Successfully!', 'success', { timeout: 3000, });

           setTimeout(function(){
             that.$store.state.dark= false,
             that.$store.state.displayIn= 'none',
             that.$store.state.displayOut= 'block'
             that.$router.replace('/dashboard');
           },3000)
          
          var token = result.credential.accessToken;
          localStorage.setItem('accessToken', token)
          let username = localStorage.setItem('username', result.additionalUserInfo.profile.name);
          let userImage = result.additionalUserInfo.profile.profile_image_url
          localStorage.setItem('userImage', userImage)
          this.$store.state.userImage = userImage
          localStorage.setItem('useremail', result.additionalUserInfo.profile.email);
          this.$store.state.username = username
          
        }).catch((err)=>{
            // alert('oopz' + err.message)
        })
      },
      
      //login via google
      socialLoginGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        var that = this
        firebase.auth().signInWithPopup(provider).then((result) =>{debugger
          this.flash('Login Successfully!', 'success', { timeout: 3000, });

           setTimeout(function(){
             that.$store.state.dark= false,
             that.$store.state.displayIn= 'none',
             that.$store.state.displayOut= 'block'
             that.$router.replace('/dashboard');
           },3000)

          var token = result.credential.accessToken
          localStorage.setItem('accessToken', token)
          let username = localStorage.setItem('username', result.additionalUserInfo.profile.name);
          let userImage = result.additionalUserInfo.profile.picture
          localStorage.setItem('userImage', userImage)
          this.$store.state.userImage = userImage
          localStorage.setItem('useremail', result.additionalUserInfo.profile.email);
          this.$store.state.username = username

        }).catch((err)=>{
            // alert('oopz' + err.message)
        })
      },
      //validattion before login
      validateBeforeSubmitLogin(){
        this.$validator.validateAll().then((result) => {
            if (result ) {
                this.value = {
                    "email"    : this.email,
                    "password" : this.password,
                }
                this.loginCustomers(this.value)
            } 
        });
    },
    //login via user resiteration
     loginCustomers(value){
          this.$http.post("http://localhost:4500/login",value, { 
              headers: { 
                "content-type": "application/json" 
                  } 
                }).then(result => {
                    console.log('res',result)
                    if(result.body.msg === 'user logged in successfully'){debugger
                        let username = result.body.user.firstname
                        localStorage.setItem('username', username);
                        this.$store.state.username = username
                        localStorage.setItem('accessToken',result.body.accessToken)
                        localStorage.setItem('useremail',result.body.user.email)

                        this.flash('Login Successfully!', 'success', { timeout: 3000, });

                        var that = this
                        setTimeout(function(){
                          that.$store.state.dark = false
                          that.$store.state.displayIn = 'none'
                          that.$store.state.displayOut = 'block'
                          that.$router.push('/dashboard')
                        },3000)
                    }
                    
                }, error => {
                    console.log(error)
                     if(error.body.msg === "No user found in this email"){
                       this.flash('No user found in this email!', 'error', { timeout: 3000, });
                    }
                    else if(error.body.msg === "password did not match with the email"){
                      this.flash('password did not match with the email!', 'info', { timeout: 3000, });
                    }
                })
        },
        close(){
            this.$store.state.dark = false
        }
 },
}
</script>
<style scoped>
.title{
    padding-left: 100px;
    color: white;
    text-shadow: 2px 2px blueviolet;
    font-size: 2.5rem;
}
.btn-login{
color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 92%;
  opacity: 0.8;
  margin-top: 4%;
    background-color: #4285f4 !important;
    color: #fff !important;
}
.modal{
    background: rgba(0,0,0,0.7) !important;
    top: 10% !important;
}
.close{
    display: none !important;
}
.red-text{
    font-size: large;
    /* padding-left: 1%; */

}
</style>

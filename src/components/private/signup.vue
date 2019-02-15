<template>
<!-- Material form register -->
<div>
    <nav-bar></nav-bar>
    <div class="bg-img">
        <form class="container" @submit.prevent="validateBeforeSubmit">
          <p class="h4 text-center mb-4 title">Registeration Form</p>
          <div class="grey-text" >

            <mdb-input label="Your name"  type="text" name="firstname" v-model="firstname" v-validate="'required|alpha'" 
                        :class="{'input': true, 'is-danger': errors.has('firstname') }"/>
              <i v-show="errors.has('firstname')" class="fa fa-warning"></i>
              <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>

            <mdb-input label="Your email" type="email" name="email" v-model="email" v-validate="'required|email'"
                         :class="{'input': true, 'is-danger': errors.has('email') }"/>
              <i v-show="errors.has('email')" class="fa fa-warning"></i>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
              
            <mdb-input label="Your password" type="password" name="password" v-model="password" v-validate="'required'"
                         :class="{'input': true,'is-danger': errors.has('password')}"/>
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>

            <mdb-input label="Confirm password" v-validate="'required'" name="confirmPassword" 
                        v-model="confirmPassword" type="password" :class="{'input': true,'is-danger': errors.has('confirmPassword')}"/>
                        <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>

          </div>
          <div class="text-center">
            <mdb-btn color="primary" type="submit">Register</mdb-btn>
          </div>
          <flash-message class="myCustomClass"></flash-message>
        </form>
        
    </div>
    
</div>
<!-- Material form register -->
</template>

<script>
import navBar from '@/components/public/navbar';
import { ValidationProvider } from 'vee-validate';
import {mapState, mapMutations} from 'vuex'
import { mdbContainer, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbInput, mdbRow,mdbCardBody, mdbCard,mdbCol, mdbIcon } from 'mdbvue';

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
    navBar
 },
 data() {
     return {
          firstname: '', lastname: '', email: '',  value: {}, password: '', confirmPassword: '', flashWwarning: ''
     }
 },
 methods: {
   //validation before submit
     validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result ) {
        //   return;
        
          this.value = {
             "firstname": this.firstname,
             "email"    : this.email,
             "password" : this.password,
          }
          
            this.fetchCustomers(this.value)
        //   alert('signUp successfully!!')
        }

        
      });
    },
    //user registertaion
       fetchCustomers(value){
          this.$http.post("http://localhost:4500/users/create", value, { 
              headers: { 
                "content-type": "application/json" 
                  } 
                }).then(result => {
                    this.response = result.data;
                    if(result.body.msg === 'new user created'){
                        this.flash('Registertaion Successfully!', 'success', {
                        timeout: 3000,
                        beforeDestroy() {
                        }
                      });
                       var that = this;
                      setTimeout(function(){
                        that.$router.push('/')
                      },3000)
                        
                    }
                }, error => {
                    if(error.body.msg === "this email is already registered"){
                       this.flash('this email is already registered!', 'warning', {
                        timeout: 3000,
                        beforeDestroy() {
                        }
                      });
                    }
             })
        },
        goLogin(){
            this.$router.push('/')
        }
  },
  computed: {
 },
}
</script>
<style scoped>
.backgroundimage{
    opacity: 0.7
}
.bg-img {
  /* The image used */
    background-image: url("http://localhost/Vue_projects/MDB-Vue-Free-4.10.1/src/assets/signupimage.jpg");
    opacity: 0.9;
    min-height: 863px;

  /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}
/* Add styles to the form container */
.container {
  position: absolute !important;
  margin: 5% 1% 1% 35% !important;
  max-width: 500px !important;
  background: none !important;
  border: none !important;
}
/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}
input:-webkit-autofill{
    background-color: rgb(181, 196, 20) !important;
    color: rgb(0, 0, 0) !important;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit button */
.btn {
  /* background-color: #4CAF50; */
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.8;
  margin-top: 4%
}

.btn:hover {
  opacity: 1;
}
.md-form{
    margin-top: 4rem;
}
.title{
    color: white;
    text-shadow: 2px 2px blueviolet;
    font-size: 2.5rem;
}
</style>


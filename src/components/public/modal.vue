<template>
<div>
    <mdb-container>
  <!-- trigger modal button -->


  <!-- vimeo modal -->
  <mdb-modal v-if="vmmodalstoreN || vmmodalstoreTHDLN || vmmodalstoreB || vmmodalstoreT || vmmodalstoreE || vmmodalstoreSC || vmmodalstoreS || vmmodalstoreH || vmmodalstoreL || vmmodalstoreSrch || vmmodalstoreD" @close="vmmodalstore=false">
    <mdb-modal-body class="p-0 mbody">
      <div class="modal_header">
        <a v-bind:href="urlbyarticle" target="_blank"><span class="title">{{titlebyarticle}}</span></a>
        <mdb-btn  rounded size="sm" v-on:click="close" class="ml-4 mbutton">&times;</mdb-btn>
       
      </div>
        
      <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
        <img class="embed-responsive-item" v-bind:src="this.$store.state.imagebyarticle" allowfullscreen>
      </div>
    </mdb-modal-body>
    <mdb-modal-footer center class="mfooter">
      <!-- <div class="social_sharing">
        <facebook :url="urlbyarticle" scale="2" class="btn-fb"></facebook>
        <twitter :url="urlbyarticle" title="Check me on Github" scale="2" class="btn-twitter"></twitter>
        <linkedin :url="urlbyarticle" scale="2" class="btn-linkedin"></linkedin>
        <telegram :url="urlbyarticle" scale="2" class="btn-telegram"></telegram>
        <whats-app :url="urlbyarticle" title="Hello" scale="2" class="btn-wp"></whats-app>
        <reddit :url="urlbyarticle" scale="2" title="My Github" class="btn-reddit"></reddit>
        <google :url="urlbyarticle" scale="2" class="btn-google"></google>
        <email :url="urlbyarticle" subject="Hello" scale="2" class="btn-email"></email>
      </div> -->
      <mdb-btn @click="clickedfb" class="btn-fb" v-bind:style="{display: displayscoialfb}"><i class="fa fa-facebook"></i> Facebook</mdb-btn>
      <flash-message class="myCustomClass" v-bind:style="{display: displayflash}"></flash-message>
      <!-- <social-sharing :url="urlbyarticle" inline-template social_shares_close @close="closep()">
        <div>
            <network network="facebook" social_shares_open>
              <i class="fa fa-facebook" social_shares_open ></i> Facebook
            </network>
            <network network="googleplus">
              <i class="fa fa-google-plus"></i> Google +
            </network>
            <network network="linkedin">
              <i class="fa fa-linkedin"></i> LinkedIn
            </network>
            <network network="pinterest">
              <i class="fa fa-pinterest"></i> Pinterest
            </network>
            <network network="reddit">
              <i class="fa fa-reddit"></i> Reddit
            </network>
            <network network="twitter">
              <i class="fa fa-twitter"></i> Twitter
            </network>
            <network network="vk">
              <i class="fa fa-vk"></i> VKontakte
            </network>
            <network network="weibo">
              <i class="fa fa-weibo"></i> Weibo
            </network> 
            <network network="whatsapp">
              <i class="fa fa-whatsapp"></i> Whatsapp
            </network>
        </div>
      </social-sharing> -->
      
       
    </mdb-modal-footer>
  </mdb-modal>
  
</mdb-container>
</div>
</template>

<script>
// import modalFunc from '@/components/private/modalFunc';
import {
  Facebook, Twitter, Linkedin, Pinterest, Reddit, Telegram, WhatsApp, Email, Google
} from "vue-socialmedia-share";
import {mapState, mapMutations} from 'vuex'

import {
        mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon
        } from 'mdbvue';
export default {
  name: 'modal',
  components: {
     mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon ,
     Facebook, Twitter, Linkedin, Pinterest, Reddit, Telegram, WhatsApp, Email, Google,
     
    
  }, computed: {
        ...mapState([
           'vmmodalstoreN',
           'vmmodalstoreTHDLN', 'vmmodalstoreB', 'vmmodalstoreT', 'vmmodalstoreE', 'vmmodalstoreS',
            'vmmodalstoreSC', 'vmmodalstoreH', 'vmmodalstoreL', 'vmmodalstoreSrch', 'vmmodalstoreD',
           'imagebyarticle',
           'titlebyarticle',
           'urlbyarticle'
        ])
    },
    created: function() {
   
  },
    mounted() { 
      
    },
  data: ()=>({
    displayscoialfb: 'block',
    displayflash: 'none'
  }),
  methods: {
          clickedfb(){debugger
          var that = this
               FB.init({
                  appId      : '355317795059772',
                  status     : true,
                  xfbml      : true,
                  version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
                });
            FB.ui({
              method: 'share',
              href: this.$store.state.urlbyarticle,
            },
      //callback
      
            function(response) {
              if (response && !response.error_message) {
                that.displayscoialfb = 'none'
                that.displayflash = 'block'
                that.flash('Shared Successfully!', 'success', { timeout: 3000, });
                  var email = localStorage.useremail
                  if(localStorage.shareobjfb != '' && localStorage.shareobjfb !=undefined){
                    var  obj = JSON.parse(localStorage.shareobjfb)
                  }else{
                    var obj = {}
                  }
                   var temp = []
                   var arrOfobj = Object.keys(obj)
                      temp.push({ link:that.$store.state.urlbyarticle,
                        image: that.$store.state.imagebyarticle,
                        title: that.$store.state.titlebyarticle
                      })
                    if(arrOfobj.indexOf(email) >=0 ){
                      obj[email].push(temp[0])
                    }else{
                       obj[email] = temp
                    }
                      localStorage.setItem('shareobjfb',JSON.stringify(obj))

                setTimeout(function(){
                  that.close()
                },3000)
              } else {
                  that.displayscoialfb = 'none'
                  that.displayflash = 'block'
                  that.flash('An error occurred!', 'error', { timeout: 3000, });
                  setTimeout(function(){
                    that.close()
                  },3000)
              }
            });
          },
     close(){ 
        this.$store.state.vmmodalstoreTHDLN = false
        this.$store.state.vmmodalstoreN = false
        this.$store.state.vmmodalstoreB = false
        this.$store.state.vmmodalstoreT = false
        this.$store.state.vmmodalstoreE = false
        this.$store.state.vmmodalstoreS = false
        this.$store.state.vmmodalstoreSC = false
        this.$store.state.vmmodalstoreH = false
        this.$store.state.vmmodalstoreL = false
        this.$store.state.vmmodalstoreSrch = false
        this.$store.state.vmmodalstoreD = false
     }
  }
};
</script>

<style scoped>
     .bindbutton{
         background-color: none 
     }
     .mbody, .mfooter{
       background: linear-gradient(to right, #ddd2d2, #e4dae5, #ccd9d8, #ddd2d2, #57161645, #ccd9d8, #e4dae5, #ddd2d2)
     }
     .mbutton{
       background: linear-gradient(to right, #ddd2d2, #e4dae5, #ccd9d8, #ddd2d2, #57161645, #ccd9d8, #e4dae5, #ddd2d2) !important;
       box-shadow: none;
       color:red !important
     }
     .modal_header{
       display: flex
     }
     a{
       padding-left: 5%;
     }
     .btn-fb, .btn-twitter, .btn-linkedin, .btn-telegram, .btn-wp, .btn-pint, .btn-reddit, .btn-google, .btn-email{
       padding: 10px;
       cursor: pointer;
     }
     .myCustomClass{
       width: 100% !important;
     }
</style>

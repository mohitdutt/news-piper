<template>
<!-- 2.5 hrs + 1 hr = code set + deploy heroku
dashboard design= 2 hrs
tt managmnt = 2hrs -->
    <div>
        <nav-bar></nav-bar>
        <h1>Welcome to dashboard</h1> <h3>{{this.username}} !!</h3>
        <div v-if="username">
            <div id="sharedOnfb">
              <h2 id="sharedOnfbtitle">Shared News</h2>
              <div class="container" v-for="(article, index) in linkfb" v-bind:key="index">
                  <div class="row firstrow">
                      <div class="col-md-6">
                          <div class="row">
                              <a v-bind:href="article.link" target="_blank"><span class="title">{{article.title}}</span></a>
                          </div>
                          <!-- <div class="row">
                              <div class="col-md-8">
                              <p class="source">{{ article.source.name }}</p>
                                  <span class="date">{{article.publishedAt.split('T')[0]}}</span>
                              </div>
                          </div> -->
                      </div>
                      <div class="col-md-6" style="overflow:hidden">
                          <div class="">
                              <a v-bind:href="article.image" target="_blank"><img class="image" :src="article.image" v-bind:alt="article.author" v-bind:title="article.author"></a>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
      </div>
      
    </div>
</template>


<script>
import navBar from '@/components/public/navbar';
import {mapState, mapMutations} from 'vuex'
import { mdbContainer, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbInput, mdbRow, mdbColumn
        ,mdbCardBody, mdbCard,mdbCol, mdbIcon } from 'mdbvue';

export default {
  name: 'dashboard',
  components: {
    navBar
  },
  data() {
    return {
        username: localStorage.username,
        
    }
  },
  computed: {
    ...mapState([
      'linkfb'
    ]),
   
 },
 mounted() {debugger
        var x = JSON.parse(localStorage.shareobjfb)
        for(var i =0; i< Object.values(x)[0].length ; i++ ){
            this.$store.state.linkfb.push({link: x[localStorage.useremail][i].link,
                                           image: x[localStorage.useremail][i].image,
                                           title: x[localStorage.useremail][i].title
                                          })
          }
 },
 methods: {
     
 },
}
</script>

<style scoped>
h2, h4{
  color: #181717;  
  text-shadow: 1px 1px 1px;
}
a{
  color: #623a0a;
}
a:hover{
  color: black
}

 .container {
        background: #d6dadd24 !important;
        margin-top: 3px;
        border: 1px solid #dadce0;
        border-radius: 8px;
        width: 40%
    }
    .firstrow {
        padding: 2%;
    }
    .source {
        float: left;
    }
    .source, .date, .viewmore, .hide {
        font-weight: 200;
        font-size: 14px;
        font-family: inherit;
        font-weight: initial;
        font-style: oblique;
        font-family: -webkit-body;
        opacity: .7;
    }
     .viewmore, .hide {
        font-weight: 200;
        font-size: 14px;
        font-family: inherit;
        font-weight: bold;
        font-style: oblique;
        font-family: -webkit-body;
        opacity: .7;
    }
    .viewhide{
            display: flex;
    margin-top: -1%;
    }
    .title {
        text-decoration: none;
        font-family: Oswald,sans-serif;
        font-size: 1em;
        color: #000;
        font-weight: inherit;
        line-height: 1.5em;

    }
    .image {
        background: #e8eaee;
        /* margin-top: 0.2%; */
        /* border: 1px solid #dadce0; */
        border-radius: 8px;
        width: 9rem;
        height: 4.5rem;
        /* padding: 2%; */
    }
</style>




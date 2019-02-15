<template>
    <div class="home">
              <p class="d-inline-block" style="opacity:0.4">{{Searched}} for..</p>
              <h4 class="d-inline-block">{{content}}</h4>
              <div v-if="arrallsrch.length!= 0">
            <div class="container" v-for="(article, index) in arrallsrch" v-bind:key="index" @mouseover="displayiconshow(index)" @mouseleave="displayiconhide(index)" >
                <div class="row firstrow">
                    <div class="col-md-8">
                        <div class="row">
                            <a v-bind:href="article.url" target="_blank"><span class="title">{{article.title}}</span></a>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                            <p class="source">{{ article.source.name }}</p>
                                <span class="date">{{article.publishedAt.split('T')[0]}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 viewhide" v-bind:style="{display: displayview}">
                                <p class="viewmore" v-on:click="seen(index)">view more</p>
                                <!-- trigger modal button -->   
                                    <mdb-btn v-on:click="open(article.url, article.title, article.urlToImage)" class="bindbutton" v-bind:style="{display: displayicon}"><i class="fas fa-share-alt" ></i></mdb-btn>
                            </div>
                            <div class="col-md-12">
                                <span class="contentDesciption" v-bind:show="clicked" v-bind:style="{display: display}">{{article.description}}<h5 class="hide" v-on:click="hide(index)">hide</h5></span>
                                <!-- <p class="hide" v-on:click="hide(index)" v-bind:style="{display: display}">hide</p> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" style="overflow:hidden">
                        <div class="">
                            <a v-bind:href="article.urlToImage" target="_blank"><img class="image" :src="article.urlToImage" v-bind:alt="article.author" v-bind:title="article.author"></a>
                        </div>
                    </div>
                </div>
            </div>
                <modal-view v-if="vmmodalstoreSrch"></modal-view>
                <div class="row" style="margin-right:0">
                    <div class="col-md-3" style="margin-left:9%">
                        <mdb-btn color="info" class="previousSrch" v-bind:class="{ disabled: isDisabledprevious}" v-on:click="previousSrch()">Previous</mdb-btn>
                    </div>
                    <div class="col-md-7">
                        <mdb-btn color="info" class="nextSrch" v-bind:class="{ disabled: isDisablednext}" v-on:click="nextSrch()">Next</mdb-btn>
                    </div>
                </div>
              </div>
              <div v-else-if="arrallsrcherror.length!= 0">
                <div class="container" v-for="(article, index) in arrallsrcherror" v-bind:key="index" >
                    <div class="row firstrow">
                        <div class="col-md-8">
                            <div class="row">
                                <span>{{article}}</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
    </div>
</template>

<script>

import leftSidebar from '@/components/public/leftsidebar';
import rightSidebar from '@/components/public/rightsidebar';
import navBar from '@/components/public/navbar';
import modalView from '@/components/public/modal';
import {mapState, mapMutations, mapActions} from 'vuex'
import { mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, 
        mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbBtn } from 'mdbvue';
    export default {
        name: 'national',
        components: {
          mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, 
          mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbBtn, leftSidebar, 
          rightSidebar, navBar, modalView
        },
        data: () => ({
             display: 'none',
            displayview: 'flex',
            clicked:false,
            isDisabledprevious: true,
            isDisablednext: false,
            country: 'in',
            displayicon: 'none'
        }),
        computed: {
            ...mapState([
               'arrallsrch',
               'pointersearch',
               'articlesSrch',
               'vmmodalstoreSrch',
               'content',
               'arrallsrcherror',
               'Searched'
            ])
         },
        methods: {
            displayiconshow(index){
                 
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[0].style.display = 'block'
            },
            displayiconhide(index){
                 
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[0].style.display = 'none'
            },
             seen(index){  
              this.clicked = !this.clicked
              if(this.clicked === true){
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('contentDesciption')[0].style.display = 'block'
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('viewhide')[0].style.display = 'none'
                  this.clicked = !this.clicked
              }
           },
           hide(index){ 
              if(this.clicked === false){
                  this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('contentDesciption')[0].style.display = 'none'
                  this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('viewhide')[0].style.display = 'flex'
              }
           },
           nextSrch(){ 
              this.isDisabledprevious = false
              this.$store.state.arrallsrch = []
              for(var i =0; i<5; i++){
                if(i+1+this.$store.state.pointersearch === this.$store.state.articlesSrch.length){
                    this.isDisablednext = true
                }else if(i+1+this.$store.state.pointersearch < this.$store.state.articlesSrch.length){
                    this.$store.state.arrallsrch.push(this.$store.state.articlesSrch[i+this.$store.state.pointersearch])
                }
              }
              this.$store.state.pointersearch+= 5
           },
           previousSrch(){ 
             this.isDisablednext = false
             this.$store.state.arrallsrch = []
             for(var i =0; i<5; i++){ 
               this.$store.state.arrallsrch.push(this.$store.state.articlesSrch[i+this.$store.state.pointersearch-10])
             }
             this.$store.state.pointersearch-= 5
             if(this.$store.state.pointersearch === 5){
                 this.isDisabledprevious = true
             }
           },
           open(geturl, gettitle, getimage){ 
           this.$store.state.urlbyarticle = geturl
           this.$store.state.titlebyarticle = gettitle
           this.$store.state.imagebyarticle = getimage
           this.$store.state.vmmodalstoreSrch = true
           
           }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   /* .container {
        background: #feeeea;
        margin-top: 3px;
        border: 1px solid #dadce0;
        border-radius: 8px;
        width: 85%
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
       font-weight: 200;
       font-size: 15px;
       font-family: inherit;
       font-weight: bold;
       font-style: oblique;
       font-family: -webkit-body;
    }
    .image {
        background: #e8eaee;
        margin-top: 0.2%;
        border: 1px solid #dadce0;
        border-radius: 8px;
        width: 8rem;
        height: 6rem;
        padding: 1%;
    }
    .viewmore, .hide {
        cursor: pointer;
    }
     .previousTH, .previousN, .previousB, .previousT, .previousE, .previousS, .previousSC, .previousH, .previousL, .previousSrch{
        border-radius: 4px;
        padding: 3% 4% 3% 4%;
        background: cadetblue !important;
    }
    .nextTH, .nextN, .nextB, .nextT, .nextE, .nextS, .nextSC, .nextH, .nextL, .nextSrch{
        float: right;
        border-radius: 4px;
        padding: 1% 2% 1% 2%;
        background: cadetblue !important;
    }
    .bindbutton{
      background-color: #feeeea !important;
      color: cadetblue !important;
      box-shadow: none !important;
      margin-top: -5%;

    } */
</style>
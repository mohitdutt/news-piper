<template>
    <div class="datenews">
        <h2 id="datetitle">{{fromDate}} - {{toDate}}</h2>
            <div class="container" v-for="(article, index) in arrdatesrch" v-bind:key="index"  @mouseover="displayiconshow(index)" @mouseleave="displayiconhide(index)">
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
                                <span class="contentDesciption" v-bind:show="clicked" v-bind:style="{display: display}">{{article.description}}</span>
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
            <modal-view v-if="this.$store.state.vmmodalstoreD"></modal-view>
            <div class="row" style="margin-right:0">
                <div class="col-md-3" style="margin-left:9%">
                    <mdb-btn  class="previousD" v-bind:class="{ disabled: isDisabledprevious}" v-on:click="previousD()">Previous</mdb-btn>
                </div>
                <div class="col-md-7">
                    <mdb-btn  class="nextD" v-bind:class="{ disabled: isDisablednext}" v-on:click="nextD()">Next</mdb-btn>
                </div>
            </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import modalView from '@/components/public/modal';
import {
        mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon
        } from 'mdbvue';
    export default {
        name: 'national',
        components: { mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon, modalView },
        data: () => ({
            display: 'none',
            displayview: 'flex',
            clicked:false,
            isDisabledprevious: true,
            isDisablednext: false,
            displayicon: 'none'
        }),
        mounted() {
            // this.datenews()
        },
        computed: {
            ...mapState([
              'fromDate',
              'toDate',
              'arrdatesrch',
              'articlesdatesrch',
              'pointerdatesrch',
              'vmmodalstoreD'
            ]),
        },              
        methods: {
            
            displayiconshow(index){
                 
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[0].style.display = 'block'
            },
            displayiconhide(index){
                 
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[0].style.display = 'none'
            },
        //     ...mapMutations([
        //     'SORTING_QUERY',
        //   ]),
        //     datenews(){   
        //       this.SORTING_QUERY({'this': this, query: 'popularity'})
        //   },
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
           nextD(){  
              this.isDisabledprevious = false
              this.$store.state.arrdatesrch = []
              for(var i =0; i<5; i++){
                if(i+1+Number(this.$store.state.pointerdatesrch) === this.$store.state.articlesdatesrch.length){
                    this.isDisablednext = true
                }else{
                    this.$store.state.arrdatesrch.push(this.$store.state.articlesdatesrch[i+Number(this.$store.state.pointerdatesrch)])
                }
              }
              this.$store.state.pointerdatesrch+= 5
           },
           previousD(){  
             this.isDisablednext = false
             this.$store.state.arrdatesrch = []
             for(var i =0; i<5; i++){ 
               this.$store.state.arrdatesrch.push(this.$store.state.articlesdatesrch[i+Number(this.$store.state.pointerdatesrch)-10])
             }
             this.$store.state.pointerdatesrch-= 5
             if(this.$store.state.pointerdatesrch === 5){
                 this.isDisabledprevious = true
             }
           },
           open(geturl, gettitle, getimage){ 
           this.$store.state.urlbyarticle = geturl
           this.$store.state.titlebyarticle = gettitle
           this.$store.state.imagebyarticle = getimage
           this.$store.state.vmmodalstoreD = true
           
           }
        }
    }
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

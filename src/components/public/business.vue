<template>
    <div id="business">
         <h2 id="businesstitle">Business</h2>
        <div class="container" v-for="(article, index) in arrcat_bsns" v-bind:key="index"  @mouseover="displayiconshow(index)" @mouseleave="displayiconhide(index)">
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
         <modal-view v-if="this.$store.state.vmmodalstoreB"></modal-view>
        <div class="row" style="margin-right:0">
            <div class="col-md-3" style="margin-left:9%">
                    <mdb-btn color="info" class="previousB" v-bind:class="{ disabled: isDisabledprevious}" v-on:click="previousB()">Previous</mdb-btn>
                </div>
                <div class="col-md-7">
                    <mdb-btn color="info" class="nextB" v-bind:class="{ disabled: isDisablednext}" v-on:click="nextB()">Next</mdb-btn>
                </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import modalView from '@/components/public/modal';
import {
        mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon
        } from 'mdbvue';
    export default {
        name: 'business',
        components: { mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon, modalView },
        data: () => ({
            display: 'none',
            displayview: 'flex',
            clicked:false,
            isDisabledprevious: true,
            isDisablednext: false,
            displayicon: 'none'
        }),
        mounted(){  
           this.business()
        },
          computed: {
            ...mapState([
               'arrcat_bsns',
               'articlescat_bsns',
               'vmmodalstoreB'
            ])
         },
        methods: {
        //icon show method
            displayiconshow(index){
                 
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[0].style.display = 'block'
            },
        //icon hide method
            displayiconhide(index){
                 
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[0].style.display = 'none'
            },
        //mutate category business
            ...mapMutations([
            'CATEGORY_NEWS'
            ]),
            business(){
                 this.CATEGORY_NEWS({this: this,cat: 'business'})
           },
        // save like share mehod
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
           
        // next button method
           nextB(){ 
              this.isDisabledprevious = false
              this.$store.state.arrcat_bsns = []
              for(var i =0; i<5; i++){
                if(i+1+this.$store.state.pointernational === this.$store.state.articlescat_bsns.length){
                    this.isDisablednext = true
                }else if(i+1+this.$store.state.pointernational < this.$store.state.articlescat_bsns.length){
                    this.$store.state.arrcat_bsns.push(this.$store.state.articlescat_bsns[i+this.$store.state.pointernational])
                }
              }
              this.$store.state.pointernational+= 5
           },
        
        // previous button method
           previousB(){ 
             this.isDisablednext = false
             this.$store.state.arrcat_bsns = []
             for(var i =0; i<5; i++){ 
               this.$store.state.arrcat_bsns.push(this.$store.state.articlescat_bsns[i+this.$store.state.pointernational-10])
             }
             this.$store.state.pointernational-= 5
             if(this.$store.state.pointernational === 5){
                 this.isDisabledprevious = true
             }
           },
        //open modal for share
           open(geturl, gettitle, getimage){ 
           this.$store.state.urlbyarticle = geturl
           this.$store.state.titlebyarticle = gettitle
           this.$store.state.imagebyarticle = getimage
           this.$store.state.vmmodalstoreB = true
           
           }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

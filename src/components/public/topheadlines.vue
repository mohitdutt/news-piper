<template>
    <div id="top-headlines">
         <flash-message class="myCustomClass"></flash-message>
        <h2 id="topheadlinestitle">Top Headlines</h2>
        <div class="container" v-for="(article, index) in arrtophdln" v-bind:key="index"  @mouseover="displayiconshow(index)" @mouseleave="displayiconhide(index)">
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
                            <p class="viewmore" v-on:click="seen(index)" >view more</p>
                            <!-- trigger modal button -->   
                                <mdb-btn v-on:click="open(article.url, article.title, article.urlToImage)" class="bindbutton" v-bind:style="{display: displayicon}"><i class="fas fa-share-alt" title="share"></i></mdb-btn>
                                <mdb-btn v-on:click="openSave(article.url, article.title, article.urlToImage, article.source.name,
                                         article.publishedAt.split('T')[0], article.description, article.urlToImage)" 
                                         v-bind:style="{display: displayicon}" class="bindbutton" title="save"><i class="far fa-save" ></i></mdb-btn>
                        </div>
                        <div class="col-md-12">
                            <span class="contentDesciption" v-bind:show="clicked"  v-bind:style="{display: display}">{{article.description}}<h5 class="hide" v-on:click="hide(index)">hide</h5></span>
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
        <modal-view v-if="this.$store.state.vmmodalstoreTHDLN"></modal-view>
        <div class="row previousNext" style="margin-right:0">
            <div class="col-md-3" style="margin-left:9%">
                <mdb-btn color="info" class="previousTH" v-bind:class="{ disabled: isDisabledprevious}" v-on:click="previousTH()">Previous</mdb-btn>
            </div>
            <div class="col-md-7">
                <mdb-btn color="info" class="nextTH" v-bind:class="{ disabled: isDisablednext}" v-on:click="nextTH()">Next</mdb-btn>
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
        name: 'topHeadlines',
        components: {
            mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon, modalView
        },
        data: () => ({
           display: 'none',
           displayicon: 'none',
           displayview: 'flex',
           clicked:false,
           isDisabledprevious: true,
           isDisablednext: false,
        }),
        mounted() {
             this.topheadlines()
        },
        computed: {
           ...mapState([
              'arrtophdln',
              'articlestop_hdln',
              'pointertophdln'
           ])
         },
        methods: {
            displayiconshow(index){
                 
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[0].style.display = 'block'
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[1].style.display = 'block'
            },
            displayiconhide(index){
                 
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[0].style.display = 'none'
                this.$el["getElementsByClassName"]('container')[index]['getElementsByClassName']('bindbutton')[1].style.display = 'none'
            },
           topheadlines(){  
             this.TOP_HEADLINES(this)
           },
           ...mapMutations([
            'TOP_HEADLINES',
          ]),
           seen(index){  debugger
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
           nextTH(){ 
              this.isDisabledprevious = false
              this.$store.state.arrtophdln = []
              for(var i =0; i<5; i++){
                if(i+1+Number(this.$store.state.pointertophdln) === this.$store.state.articlestop_hdln.length){
                    this.isDisablednext = true
                }else{
                    this.$store.state.arrtophdln.push(this.$store.state.articlestop_hdln[i+Number(this.$store.state.pointertophdln)])
                }
              }
              this.$store.state.pointertophdln+= 5
           },
           previousTH(){ 
             this.isDisablednext = false
             this.$store.state.arrtophdln = []
             for(var i =0; i<5; i++){ 
               this.$store.state.arrtophdln.push(this.$store.state.articlestop_hdln[i+Number(this.$store.state.pointertophdln-10)])
             }
             this.$store.state.pointertophdln-= 5
             if(this.$store.state.pointertophdln === 5){
                 this.isDisabledprevious = true
             }
           },
           open(geturl, gettitle, getimage){ debugger
           this.$store.state.urlbyarticle = geturl
           this.$store.state.titlebyarticle = gettitle
           this.$store.state.imagebyarticle = getimage
           if(localStorage.useremail !=undefined){
               this.$store.state.vmmodalstoreTHDLN = true
           }else{
               this.flash('Please sign up first!', 'error', { timeout: 500, });
           }
           
           
           },
           openSave(geturl, gettitle, getimage, getsourcename, getpublishdate, getdescription, getimageurl){debugger
               let useremail =localStorage.useremail;
               var obj = {};
               var data = [];
               var dataObj = {
                 url: geturl,
                 title: gettitle,
                 image: getimage,
                 sourceName: getsourcename,
                 publishDate: getpublishdate,
                 description: getdescription,
                 imageUrl: getimageurl
               };

               data.push(dataObj);

               this.$store.state.arraySave.filter((el)=>{debugger
                    if(el[useremail]){
                        obj[useremail].push(data);
                    }else{
                        obj[useremail] = data
                    }
               })
               
               this.$store.state.arraySave.push(obj)
               localStorage.setItem('saved', JSON.stringify(this.$store.state.arraySave))
           }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myCustomClass{
    width: 25% !important;
    margin-left: 36% !important;
}
</style>
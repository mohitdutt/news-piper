<template>
    <div class="rightsidebar">
        <h4 class="recentposts">Recent Posts</h4>
        <div class="container" >
                <div class="row firstrow" v-for="(article, index) in arrqrypblsh" v-bind:key="index">
                    <div class="col-md-8">
                        <div class="row">
                            <a v-bind:href="article.url" target="_blank"><p class="title">{{article.title}}</p></a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="image">
                            <a v-bind:href="article.urlToImage" target="_blank"><img class="image" :src="article.urlToImage" v-bind:alt="article.author" v-bind:title="article.author"></a>
                        </div>
                    </div>
                </div>
        </div>
<br>
        <h4 class="recentposts">Popular Posts</h4>
        <div class="container" >
                <div class="row firstrow" v-for="(article, index) in arrqrypop" v-bind:key="index">
                    <div class="col-md-8">
                        <div class="row">
                            <a v-bind:href="article.url" target="_blank"><p class="title">{{article.title}}</p></a>
                        </div>
                    </div>
                    <div class="col-md-4" style="overflow:hidden">
                        <div class="image">
                            <a v-bind:href="article.urlToImage" target="_blank"><img class="image" :src="article.urlToImage" v-bind:alt="article.author" v-bind:title="article.author"></a>
                        </div>
                    </div>
                </div>
        </div>
<br>
        <h4 class="recentposts">Most Relevant Posts</h4>
        <div class="container" >
                <div class="row firstrow" v-for="(article, index) in arrqryrlvnc" v-bind:key="index">
                    <div class="col-md-8">
                        <div class="row">
                            <a v-bind:href="article.url" target="_blank"><p class="title">{{article.title}}</p></a>
                        </div>
                    </div>
                    <div class="col-md-4" style="overflow:hidden">
                        <div class="image">
                            <a v-bind:href="article.urlToImage" target="_blank"><img class="image" :src="article.urlToImage" v-bind:alt="article.author" v-bind:title="article.author"></a>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import navBar from '@/components/public/navbar';
import modalView from '@/components/public/modal';
import {
        mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon
        } from 'mdbvue';
    export default {
        name: 'national',
        components: { mdbBtn, mdbContainer, mdbModal, mdbModalBody, mdbModalFooter, mdbIcon, modalView },
        data: () => ({
        }),
        mounted(){  
            this.sortingquery('publishedAt')
            .then(resp=>{
                this.sortingquery('popularity')
            })
            .then(resp=>{
                this.sortingquery('relevancy')
            })
        },
        computed: {
            ...mapState([
              'arrqrypblsh',
              'arrqrypop',
              'arrqryrlvnc'
            ]),
        },              
        methods: {
            ...mapMutations([
                'SORTING_QUERY'
             ]),
             sortingquery(event){  
                return new Promise((resolve,reject)=>{
                  resolve(this.SORTING_QUERY({this: this,query: event} ))
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
        background: #d6dadd24 1important;
        margin-top: 4.2%;
        border: 1px solid #dadce0;
        border-radius: 8px;
    }
    .firstrow {
      padding-top: 2%;
      padding-left: 3%;
    }
    .title {
      text-decoration: none;
    font-family: Oswald,sans-serif;
    font-size: 0.8em;
    color: #000;
    font-weight: inherit;
    line-height: 1.5em;
    opacity: 0.8;
      text-align: justify;
    }
    .image {
      background: #e8eaee;
      margin-top: 0.2%;
      border: 1px solid #dadce0;
      border-radius: 8px;
      width: 7.5rem;
      height: 4.5rem;
      padding: 1%;
    }
    .firstrow> .col-md-8{
        border-bottom: 1px solid gainsboro;
    }
</style>
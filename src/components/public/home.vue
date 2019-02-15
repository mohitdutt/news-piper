<template>
    <div class="">
        <div class="home" v-if="this.$store.state.homeclickevent">
            <top-headlines></top-headlines>
            <national-headlines></national-headlines>
                <h4 style="cursor:pointer;" v-on:click="clicked1"  v-bind:style="{display: disp1}">More..</h4>
            <business-headlines v-if="showbizz1"></business-headlines>
            <technology-headlines v-if="showbizz1"></technology-headlines>
            <entertainment-headlines v-if="showbizz1"></entertainment-headlines>
                <h4 style="cursor:pointer;" v-on:click="clicked2"  v-bind:style="{display: disp2}">More....</h4>
            <sports-headlines v-if="showbizz2"></sports-headlines>
            <science-headlines v-if="showbizz2"></science-headlines>
            <health-headlines v-if="showbizz2"></health-headlines>
         </div>
                <div class="home" v-if="this.$store.state.nationalclickevent">
                    <national-headlines></national-headlines>
                </div>
                <div class="home" v-if="this.$store.state.businessclickevent">
                    <business-headlines></business-headlines>
                </div>
                <div class="home" v-if="this.$store.state.technologyclickevent">
                    <technology-headlines></technology-headlines>
                </div>
                <div class="home" v-if="this.$store.state.entertainmentclickevent">
                    <entertainment-headlines></entertainment-headlines>
                </div>
                <div class="home" v-if="this.$store.state.sportsclickevent">
                    <sports-headlines></sports-headlines>
                </div>
                <div class="home" v-if="this.$store.state.scienceclickevent">
                    <science-headlines></science-headlines>
                </div>
                <div class="home" v-if="this.$store.state.healthclickevent">
                    <health-headlines></health-headlines>
                </div>
                <div class="home" v-if="this.$store.state.localclickevent">
                    <local-headlines></local-headlines>
                </div>
                <div class="home" v-if="this.$store.state.searchclickevent">
                    <search-headlines></search-headlines>
                </div>
                <div class="home" v-if="this.$store.state.dateclickevent">
                    <date-headlines></date-headlines>
                </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import navBar from '@/components/public/navbar';
import topHeadlines from '@/components/public/topheadlines';
import nationalHeadlines from '@/components/public/national';
import businessHeadlines from '@/components/public/business';
import technologyHeadlines from '@/components/public/technology';
import entertainmentHeadlines from '@/components/public/entertainment';
import sportsHeadlines from '@/components/public/sports';
import scienceHeadlines from '@/components/public/science';
import healthHeadlines from '@/components/public/health';
import localHeadlines from '@/components/public/localnews';
import searchHeadlines from '@/components/public/search';
import dateHeadlines from '@/components/public/sortacdate';
import {
        mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, 
        mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbBtn } from 'mdbvue';
    export default {
        name: 'home',
        components: {
          mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, 
          mdbNavItem, mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, 
          mdbBtn, topHeadlines, nationalHeadlines, businessHeadlines, technologyHeadlines, searchHeadlines,
          entertainmentHeadlines, sportsHeadlines, scienceHeadlines, healthHeadlines, navBar, localHeadlines, dateHeadlines

       },
        data: () => ({
            showbizz1: false,
            showbizz2: false,
            disp1: 'block',
            disp2: 'none'

        }),
        mounted(){  
            if(this.$router['currentRoute'].path.split('/')[1] == 'technology'){
                this.$store.state.homeclickevent = false
                this.$store.state.nationalevent = false
                this.$store.state.businessclickevent = false
                this.$store.state.technologyclickevent = true
                this.$store.state.entertainmentclickevent = false
                this.$store.state.sportsclickevent = false
                this.$store.state.scienceclickevent = false
                this.$store.state.healthclickevent = false
                this.$store.state.localclickevent = false
                this.$store.state.dateclickevent = false
                this.$store.state.searchclickevent = false

            }else if(this.$router['currentRoute'].path.split('/')[1] == ''){
                 this.$store.state.homeclickevent = true
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
                
            }else if(this.$router['currentRoute'].path.split('/')[1] == 'home'){
                 this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = true
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
                
            }else if(this.$router['currentRoute'].path.split('/')[1] == 'business'){
                 this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = true
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
                
            }else if(this.$router['currentRoute'].path.split('/')[1] == 'entertainment'){
                this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = true
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
                
            }else if(this.$router['currentRoute'].path.split('/')[1] == 'sports'){
                 this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = true
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
                
            }else if(this.$router['currentRoute'].path.split('/')[1] == 'science'){
                 this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = true
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
                
            }else if(this.$router['currentRoute'].path.split('/')[1] == 'health'){
                  this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = true
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
                
            }else if(this.$router['currentRoute'].path.split('/')[1] == 'national'){
                  this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = true
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
                
            }else if(this.$router['currentRoute'].path.split('/')[1] == 'local'){
                  this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = true
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = false
            }
            else if(this.$router['currentRoute'].path.split('/')[1] == 'date'){
                  this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.searchclickevent = false
        this.$store.state.dateclickevent = true
            }
            else if(this.$router['currentRoute'].path.split('/')[1] == 'search'){
                  this.$store.state.homeclickevent = false
        this.$store.state.nationalclickevent = false
        this.$store.state.businessclickevent = false
        this.$store.state.technologyclickevent = false
        this.$store.state.entertainmentclickevent = false
        this.$store.state.sportsclickevent = false
        this.$store.state.scienceclickevent = false
        this.$store.state.healthclickevent = false
        this.$store.state.localclickevent = false
        this.$store.state.dateclickevent = false
        this.$store.state.searchclickevent = true
            }
            this.scrolleffect()
        //   this.topheadlines()
        //   this.topheadlinesindia()
           
            //    this.technology()
 
            //    this.entertainment()
        //        this.sports()
        //        .then(resp=>{
        //        this.science()
        //    }).then(resp=>{
        //        this.health()
        //    })
        },
          computed: {
            ...mapState([
            //    'arrtophdln',
               'isDisabledprevious',
               'isDisablednext',
               'arrcat_bsns',
               'arrcat_tech',
               'arrcat_entrn',
               'arrcat_sports',
               'arrcat_science',
               'arrcat_health',
               'homeclickevent', 'nationalclickevent', 'businessclickevent', 'technologyclickevent', 'localclickevent',
               'entertainmentclickevent', 'sportsclickevent', 'scienceclickevent', 'healthclickevent', 'searchclickevent'
            ])
         },
        methods: {
            clicked1(){
                 
                this.showbizz1 = !this.showbizz1
                this.disp1= 'none'
                this.disp2 = 'block'
            },
            clicked2(){
                 
                this.showbizz2 = !this.showbizz2
                this.disp1= 'none'
                this.disp2= 'none'
            },
           scrolleffect(){ 
                var prevScrollpos = window.pageYOffset;
                window.onscroll = function() {  
                        var currentScrollPos = window.pageYOffset;
                     if (prevScrollpos > currentScrollPos) {
                       document.getElementById("navbar").style.top = "0";
                       document.getElementById("navbar").style.background = '#fffffff7'
                       if(currentScrollPos == 0){
                           document.getElementById("navbar").style.background = '#ccd3d921'
                       }
                     } else {
                       document.getElementById("navbar").style.top = "-85px";
                     }
                     prevScrollpos = currentScrollPos;
                     var topheadlines = document.getElementById('topheadlinestitle')
                     var national = document.getElementById('nationaltitle')
                     var business = document.getElementById('businesstitle')
                     var technology = document.getElementById('technologytitle')
                     var entertainment = document.getElementById('entertainmenttitle')
                     var sports = document.getElementById('sportstitle')
                     var science = document.getElementById('sciencetitle')
                     var health = document.getElementById('healthtitle')
                      if(topheadlines !=null && national !=null && business != null && technology !=null && entertainment != null && sports != null && science != null && health != null){
                        if(topheadlines.offsetTop+150 < window.pageYOffset && window.pageYOffset < national.offsetTop-150 ){ 
                           document.getElementsByClassName('previousTH')[0].style.display = 'block'
                           document.getElementsByClassName('nextTH')[0].style.display = 'block'
                         }else{
                           document.getElementsByClassName('previousTH')[0].style.display = 'none'
                           document.getElementsByClassName('nextTH')[0].style.display = 'none'
                         }
                        if(national.offsetTop+150 < window.pageYOffset && window.pageYOffset < business.offsetTop-150 ){ 
                           document.getElementsByClassName('previousN')[0].style.display = 'block'
                           document.getElementsByClassName('nextN')[0].style.display = 'block'
                         }else{
                           document.getElementsByClassName('previousN')[0].style.display = 'none'
                           document.getElementsByClassName('nextN')[0].style.display = 'none'
                         }
                        if(business.offsetTop+150 < window.pageYOffset && window.pageYOffset < technology.offsetTop-150 ){
                           document.getElementsByClassName('previousB')[0].style.display = 'block'
                           document.getElementsByClassName('nextB')[0].style.display = 'block'
                         }else{
                           document.getElementsByClassName('previousB')[0].style.display = 'none'
                           document.getElementsByClassName('nextB')[0].style.display = 'none'
                         }
                        if(technology.offsetTop+150 < window.pageYOffset && window.pageYOffset < entertainment.offsetTop-150 ){
                           document.getElementsByClassName('previousT')[0].style.display = 'block'
                           document.getElementsByClassName('nextT')[0].style.display = 'block'
                         }else{
                           document.getElementsByClassName('previousT')[0].style.display = 'none'
                           document.getElementsByClassName('nextT')[0].style.display = 'none'
                         }
                        if(entertainment.offsetTop+150 < window.pageYOffset && window.pageYOffset < sports.offsetTop-150 ){
                           document.getElementsByClassName('previousE')[0].style.display = 'block'
                           document.getElementsByClassName('nextE')[0].style.display = 'block'
                         }else{
                           document.getElementsByClassName('previousE')[0].style.display = 'none'
                           document.getElementsByClassName('nextE')[0].style.display = 'none'
                         }
                        if(sports.offsetTop+150 < window.pageYOffset && window.pageYOffset < science.offsetTop-150 ){
                           document.getElementsByClassName('previousS')[0].style.display = 'block'
                           document.getElementsByClassName('nextS')[0].style.display = 'block'
                         }else{
                           document.getElementsByClassName('previousS')[0].style.display = 'none'
                           document.getElementsByClassName('nextS')[0].style.display = 'none'
                         }
                        if(science.offsetTop+150 < window.pageYOffset && window.pageYOffset < health.offsetTop-150 ){
                           document.getElementsByClassName('previousSC')[0].style.display = 'block'
                           document.getElementsByClassName('nextSC')[0].style.display = 'block'
                         }else{
                           document.getElementsByClassName('previousSC')[0].style.display = 'none'
                           document.getElementsByClassName('nextSC')[0].style.display = 'none'
                         }
                      }
                     }
           }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style 
</style>
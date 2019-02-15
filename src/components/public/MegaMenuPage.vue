<template>
  <!--Navbar-->
<div>
  
<nav-bar></nav-bar>
<div class="container-fluid">
  <div class="row m-0">
  <div class="col-md-3">
    <left-sidebar></left-sidebar>
  </div>
  <div class="col-md-6">
    <home-trending></home-trending>
  </div>
  <div class="col-md-3">
    <right-sidebar></right-sidebar>
  </div>
</div>
</div>

</div>

</template>

<script>
import homeTrending from '@/components/public/home';
import leftSidebar from '@/components/public/leftsidebar';
import rightSidebar from '@/components/public/rightsidebar';
import navBar from '@/components/public/navbar';
export default {
  name: 'MegaMenuPage',
  components: {
    homeTrending,
    rightSidebar,
    leftSidebar,
    navBar
    
  },
  data: ()=>({
    image: "http://localhost/Vue_projects/MDB-Vue-Free-4.10.1/src/assets/newsimage.jpg"

  }),
  mounted(){  
    // alert(this.$router['currentRoute'].name)
     
  }
};
</script>
<style >
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
        width: 100%
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
        margin-top: 0.2%;
        /* border: 1px solid #dadce0; */
        border-radius: 8px;
        width: 15rem;
        height: 9rem;
        /* padding: 2%; */
    }
    .viewmore, .hide {
        cursor: pointer;
    }
     .previousTH, .previousN, .previousB, .previousT, .previousE, .previousS, .previousSC, .previousH, .previousL, .previousSrch, .previousD{
        border-radius: 4px;
        padding: 3% 4% 3% 4%;
        background: #d6dadd24 !important;
        color: black !important;
    }
    .nextTH, .nextN, .nextB, .nextT, .nextE, .nextS, .nextSC, .nextH, .nextL, .nextSrch, .nextD{
        float: right;
        border-radius: 4px;
        padding: 1% 2% 1% 2%;
        background: #d6dadd24 !important;
        color: black !important;
    }
    .bindbutton{
      background-color: transparent !important;
      color: #ae98a5 !important;
      box-shadow: none !important;
      margin-top: -5%;

    }
    .contentDesciption{
      text-align: -webkit-auto
    }
</style>

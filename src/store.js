import  Vue from 'vue';
import  Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({ 
  strict: process.env.NODE_ENV !== 'production',
  state:{   
    linkfb: [],
    arraySave: [],
    displayImage: 'none',
    userImage: '',
    username: '',
    dark: false,
    displayIn: 'block',
    displayOut: 'none',
    modalFunc: false,
    //login signup above
    fromDate: '',
    toDate: '',
    content: '',
    Searched: '',
    searchkeyword:'',
    arrallsrch: [],
    arrtophdln:[],
    articlesSrch: [],
    arrdatesrch: [],
    articlesdatesrch: [],
    articlescat_bsns: [],
    articlestop_hdln: [],articlescat_tech:[],
    arrcat_entrn: [],articlescat_entrn: [],
    arrcat_sports: [], articlescat_sports: [],
    arrcat_science: [], articlescat_science: [],
    arrcat_health: [], articlescat_health: [],arrallsrcherror:[],
    arrcat_tech:[],
    arrcat_bsns: [],
    pointersearch: 0, pointerdatesrch: 0,
    pointertophdln: 0,
    loading: false,
    display: 'none',
    pointernational: 0,
    articlesnational: [],arrqrypblsh: [],arrqrypop: [],arrqryrlvnc: [],
    arrtopind: [], articlesqrysrch: [], arrqrysrch: [], pointerqrysrch: 0,
    currentcity: '',
    pointerbsns: 0,pointetech: 0,pointerentrn: 0,pointersports: 0, pointerscience: 0, pointerhealth: 0,
    // isDisabledprevious: true,
    // isDisablednext: false,
    cat: '',
    vmmodalstoreN: false, vmmodalstoreSC: false, vmmodalstoreH: false, vmmodalstoreSrch: false, vmmodalstoreL: false,
    vmmodalstoreTHDLN: false, vmmodalstoreB: false, vmmodalstoreT: false, vmmodalstoreE: false, vmmodalstoreS: false, vmmodalstoreD:false,
    imagebyarticle: '',titlebyarticle: '',urlbyarticle: '',
    key: 'dad5ca42d17c4aaca8e6745acefa2f49',
    homeclickevent: true, nationalclickevent: false, businessclickevent: false, technologyclickevent: false, searchclickevent: false, dateclickevent: false,
    entertainmentclickevent: false, sportsclickevent: false, scienceclickevent: false, healthclickevent: false, localclickevent: false
  },
  mutations: {
    UPDATE_CONTENT: (state, link)=>{
        state.content = link
    },
    UPDATE_SEARCH: (state, that)=>{  
      state.loading = true
      state.Searched = 'Searching'
      that.$http.get("https://newsapi.org/v2/everything?language=en&q="+state.content+"&sortBy=popularity&apiKey="+state.key+"&pageSize=100").then(result => {
          var pointer =0
          state.Searched = 'Searched'
          state.loading = false
          state.display = 'block'
        state.articlesSrch = result.body.articles;
        state.arrallsrch = []
        for(var i =0; i<5; i++){ 
          if(i+pointer < state.articlesSrch.length){
            state.arrallsrch.push(state.articlesSrch[i+pointer])
          }
        }
          state.pointersearch+= 5
      }, error => {
        state.loading = false
        state.arrallsrcherror.push('Bad request, Please try again with different keywords')
      });      
    },
    QUERY_SEARCH: (state, that)=>{  
      state.loading = true
      that.$http.get("https://newsapi.org/v2/everything?language=en&q="+localStorage.currentcity+"&apiKey="+state.key+"&pageSize=100").then(result => {
          var pointer =0
           
          state.loading = false
          state.display = 'block'
        state.articlesqrysrch = result.body.articles;
        state.arrqrysrch= []
        for(var i =0; i<5; i++){ 
          if(i+pointer < state.articlesqrysrch.length){
            state.arrqrysrch.push(state.articlesqrysrch[i+pointer])
          }
        }
          state.pointerqrysrch+= 5
      }, error => {
        state.loading = false
      console.error(error);
      });      
    },
    SORTING_QUERY: (state, payload)=>{ debugger 
      var that = payload.this
      let query = payload.query
      state.loading = true
      that.$http.get("https://newsapi.org/v2/everything?language=en&q=world&sortBy="+query+"&apiKey="+state.key+"&from="+localStorage.fromDate+"&to="+localStorage.toDate+"&pageSize=100").then(result => {
        var pointer = 0
        state.loading = false;
        let article = result.body.articles;
        let arr = [];
         for(var i =0; i<5; i++){ 
          if(i+pointer < article.length){
           arr.push(article[i+pointer])
          }
         }
         if(query == '' && state.fromDate != ''){
          state.arrdatesrch = arr;
          state.articlesdatesrch = article;
          state.pointerdatesrch+=5
          
         }
         else if(query == 'publishedAt'){
          state.arrqrypblsh = arr;
          state.articlesqrypblsh = article;
          
         }else if(query == 'popularity'  && state.fromDate == ''){
          state.arrqrypop = arr;
          state.articlesqrypop = article;
  
         }else if(query == 'relevancy'){
          state.arrqryrlvnc = arr;
          state.articlesqryrlvnc = article;
           
         }
      }, error => {
        state.loading = false
      console.error(error);
      });      
    },
    TOP_HEADLINES: (state, that)=>{   
      state.loading = true
      that.$http.get("https://newsapi.org/v2/top-headlines?language=en&apiKey="+state.key+"&pageSize=100").then(result => {
         
        var pointer =0
          state.loading = false
          state.articlestop_hdln = result.body.articles;
          state.arrtophdln = []
          for(var i =0; i<5; i++){
            if(i+pointer < state.articlestop_hdln.length){
              state.arrtophdln.push(state.articlestop_hdln[i+pointer])
            }
          }
          state.pointertophdln+= 5
      }, error => {
        state.loading = false
      console.error(error);
      });
    },
    NATIONAL_HEADLINES:(state,payload)=>{  
         var that = payload.this
         var cont = payload.cont
         state.loading = true
         that.$http.get("https://newsapi.org/v2/top-headlines?language=en&country="+cont+"&apiKey="+state.key+"&pageSize=100").then(result => {
           var pointer =0
           state.loading = false
           state.display = 'block'
           state.articlesnational = result.body.articles;
           state.arrtopind = []
           for(var i =0; i<5; i++){ 
            if(i+pointer < state.articlesnational.length){
              state.arrtopind.push(state.articlesnational[i+pointer])
            }
           }
           state.pointernational+= 5
         }, error => {
          state.loading = false
         console.error(error);
         });
    },
    
    CATEGORY_NEWS:(state, payload)=>{ 
       var that = payload.this
       let cat = payload.cat
       state.loading = true
       that.$http.get("https://newsapi.org/v2/top-headlines?language=en&category="+cat+"&apiKey="+state.key+"&pageSize=100").then(result => {
       var pointer = 0
       state.loading = false;
       let article = result.body.articles;
       let arr = [];
        for(var i =0; i<5; i++){ 
         if(i+pointer < article.length){
          arr.push(article[i+pointer])
         }
        }
       if(cat == 'business'){
        state.arrcat_bsns = arr;
        state.articlescat_bsns = article;
        state.pointerbsns+= 5
        
       }else if(cat == 'technology'){
        state.arrcat_tech = arr;
        state.articlescat_tech = article;
        state.pointetech+= 5

       }else if(cat == 'entertainment'){
        state.arrcat_entrn = arr;
        state.articlescat_entrn = article;
        state.pointerentrn+= 5
         
       }else if(cat == 'sports'){
        state.arrcat_sports = arr;
        state.articlescat_sports = article;
        state.pointersports+= 5
         
       }else if(cat == 'science'){
        state.arrcat_science = arr;
        state.articlescat_science = article;
        state.pointerscience+= 5
          
       }else if(cat == 'health'){
        state.arrcat_health = arr;
        state.articlescat_health = article;
        state.pointerhealth+= 5
         
       }
       
       }, error => {
        state.loading = false
       console.error(error);
       });
    },
    GET_MONTH(state, month){debugger
      if(month === 1 ){
        return month = 'jan'
      }else if(month === 2){
        return month = 'feb'
      }else if(month === 3){
        return month = 'march'
      }else if(month === 4){
        return month = 'april'
      }else if(month === 5){
        return month = 'may'
      }else if(month === 6){
        return month = 'june'
      }else if(month === 7){
        return month = 'july'
      }else if(month === 8){
        return month = 'aug'
      }else if(month === 9){
        return month = 'sept'
      }else if(month === 10){
        return month = 'oct'
      }else if(month === 11){
        return month = 'nov'
      }else if(month === 12){
        return month = 'dec'
      }
  },
  }
});
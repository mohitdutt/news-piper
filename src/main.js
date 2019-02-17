// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import { store } from './store';
import VueResource from 'vue-resource';
import { VueSpinners } from '@saeris/vue-spinners'
import VeeValidate from 'vee-validate';
import VueFlashMessage from 'vue-flash-message';
Vue.use(VeeValidate);


Vue.use(VueSpinners)

Vue.use(VueResource);

Vue.use(VueFlashMessage);
// require('vue-flash-message/dist/vue-flash-message.min.css');
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

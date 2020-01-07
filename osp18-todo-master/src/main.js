import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import VueKakaoPf from 'vue-kakao-pf'
import VueGeolocation from 'vue-browser-geolocation';
import KakaoLogin from 'vue-kakao-login';

Vue.config.productionTip = false;
import { store } from './store/store.js'
VueKakaoPf.plusFriendId = '_StiXj'
Vue.use(VueKakaoPf)
import router from './route/index.js' //route 사용



Vue.use(VueGeolocation);
Vue.use(BootstrapVue)
Vue.use(VCalendar, {
  firstDayofWeek: 2,
})


// using style-loader
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,//route 사용
  template: '<App/>',
  components: { App }
})

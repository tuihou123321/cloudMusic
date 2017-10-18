import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router/router'
import MuseUI from "muse-ui"
// import  "muse-ui/dist/muse-ui.css"
import FastClick from 'fastclick'

if('addEventListener' in document){
  document.addEventListener('DOMContentLoaded',function(){
    FastClick.attach(document.body)
  },false)
}

Vue.use(MuseUI);

Vue.prototype.$http=Axios; //用法与vue-resource的调用方法相同，在实例中：this.$http.get()等
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

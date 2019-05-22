import Vue from 'vue'
import App from './App.vue'
import store from './store'


import BootstrapVue from 'bootstrap-vue'
import VueAudioRecorder from "vue-audio-recorder";
import * as axios from "axios";

import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(VueAudioRecorder)
Vue.use(BootstrapVue)
Vue.use(VueLayers)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
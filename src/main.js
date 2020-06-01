import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Swal from 'sweetalert2'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import IMask from 'imask';
import 'element-ui/lib/theme-chalk/index.css';
import {Input,Button,Form} from 'element-ui'
import * as firebase from './firebase/firebase.js'

Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.config.productionTip = false

Vue.prototype.$imageUrl = '@/assets/pictures/';
new Vue({
  IMask,
  firebase,
  Swal,
  router,  
  VueFormWizard,
  render: h => h(App),
}).$mount('#app')

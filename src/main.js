import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'
import dateFilter from './filters/date.filter'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

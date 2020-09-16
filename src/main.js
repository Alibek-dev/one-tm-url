import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

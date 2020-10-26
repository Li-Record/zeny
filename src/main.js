import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)

new Vue({
  router,
  created() {
    const pdsApi = `${process.env.VUE_APP_PRODUCTS_API_PATH}api/${process.env.VUE_APP_CUSTOMER_PATH}/products?page=:page`
    console.log(pdsApi);
    this.$http.get(pdsApi).then((response) => {
      console.log(response.data)
    })
  },
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

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

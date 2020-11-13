import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/all.scss'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// FontAwesome
library.add(faSpinner, faAlignLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

// 登入帶 cookie 並記錄
axios.defaults.withCredentials = true;

new Vue({
  router,
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)sToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    this.$http.defaults.headers.common['Authorization'] = token;
  },
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_PRODUCTS_API_PATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next('/login');
      }
    })
  }else {
    next();
  }
})
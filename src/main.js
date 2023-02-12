import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import confirmation from "@/plugins/confirmation";
// import appAlert from "@/plugins/appAlert";
import store from './store'
import loader from "@/plugins/loader";
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueCookies from 'vue-cookies'
import { VueTypedJs } from 'vue-typed-js'
//
import toastr from "../shared/toastr";
// import AuthService from "@/packages/auth/authService";
import appAlert from "@/plugins/appAlert";
//packages
import Dashboard from "@/packages/dashboard";
//
import User from "@/packages/User";

Vue.config.productionTip = false

Vue.use(loader);
Vue.use(Toast);
Vue.use(VueTypedJs)
Vue.use(confirmation)
Vue.use(appAlert);

Vue.use(VueCookies, { expire: '7d'})
const options = {
  store,
  router,
}
//dashboard
Vue.use(Dashboard, options)
//fixed assets
Vue.use(User, options)
//
new Vue({
  router,
  vuetify,
  store,
  mixins: [toastr],
  render: h => h(App)
}).$mount('#app')

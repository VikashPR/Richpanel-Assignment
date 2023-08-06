import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { auth } from "./firebase";


Vue.config.productionTip = false

let app;

auth.onAuthStateChanged((user) => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
}
)


import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import router from './router'
import store from './store'
import { Toast } from './helpers'
import { createProvider } from './vue-apollo'

import './assets/scss/main.scss'
import 'sweetalert2/src/sweetalert2.scss'

window.Toast = Toast
window.Swal = Swal

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
	router,
	store,
	apolloProvider: createProvider(),
	render: h => h(App)
}).$mount('#app')
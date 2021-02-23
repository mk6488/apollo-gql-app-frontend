import { BootstrapVue } from 'bootstrap-vue'
import * as echarts from 'echarts/lib/echarts'
import Echarts from 'vue-echarts'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Vue from 'vue'
import underscore from 'vue-underscore';

import App from './App.vue'
import { Toast } from './helpers'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'

import './assets/scss/main.scss'
import 'sweetalert2/src/sweetalert2.scss'

import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/dataZoomSlider'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/markLine'

window.Toast = Toast
window.Swal = Swal

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(underscore)
Vue.use(echarts)

Vue.component('chart', Echarts)

new Vue({
	router,
	store,
	apolloProvider: createProvider(),
	render: h => h(App)
}).$mount('#app')
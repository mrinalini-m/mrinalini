import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/styles/_index.scss'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import store from './store/index.js'

export default function(Vue, { appOptions }) {
	appOptions.store = store
	Vue.component('Layout', DefaultLayout)
}

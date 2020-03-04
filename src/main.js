import 'vue-multiselect/dist/vue-multiselect.min.css'
import '~/assets/styles/_index.scss'

import DefaultLayout from '~/layouts/Default.vue'
import VueGtag from 'vue-gtag'
import store from './store/index.js'

export default function(Vue, { appOptions }) {
	Vue.use(VueGtag, {
		config: {
			id: 'UA-159652083-2'
		}
	})
	appOptions.store = store
	Vue.component('Layout', DefaultLayout)
}

import DefaultLayout from '~/layouts/Default.vue'
import '@/assets/styles/_index.scss'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default function(Vue, { router, head, isClient }) {
	Vue.component('Layout', DefaultLayout)
}

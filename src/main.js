import DefaultLayout from '~/layouts/Default.vue'
import PostsLayout from '~/layouts/PostsLayout.vue'
import '@/assets/styles/_index.scss'

export default function(Vue, { router, head, isClient }) {
	Vue.component('Layout', DefaultLayout)
	Vue.component('PostsLayout', PostsLayout)
}

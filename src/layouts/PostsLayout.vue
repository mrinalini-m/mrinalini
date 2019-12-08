<template>
	<Layout>
		<div class="layout" id="posts">
			<Sidebar :showCategories="showCategories" :showPosts="showPosts" />
			<slot />
		</div>
	</Layout>
</template>

<script>
	import Sidebar from '../components/Sidebar'
	export default {
		props: {
			showCategories: { type: Boolean, default: false },
			showPosts: { type: Boolean, default: false }
		},
		components: {
			Sidebar
		}
	}
</script>

<template>
	<Layout>
		<div class="layout" id="posts">
			<Sidebar :postCategory="this.postCategory" />
			<slot />
		</div>
	</Layout>
</template>

<script>
	import Sidebar from '../components/Sidebar'
	export default {
		props: {
			postCategory: { type: String, required: false }
		},
		components: {
			Sidebar
		}
	}
</script>

<template>
	<Layout>
		<Sidebar :postCategory="this.postCategory" />
		<div class="container">
			<div class="layout" id="posts">
				<slot />
			</div>
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

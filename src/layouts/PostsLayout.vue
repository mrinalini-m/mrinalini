<template>
	<Layout>
		<div class="layout" id="posts">
			<Sidebar :links="links" />
			<slot />
		</div>
	</Layout>
</template>

<script>
	import Sidebar from '../components/Sidebar'
	export default {
		props: { links: { type: Array, default: () => [] } },
		components: {
			Sidebar
		},
		mounted() {
			for (const link of this.links) {
				console.log(link.node.name)
			}
		}
	}
</script>

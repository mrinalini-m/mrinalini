<template>
	<Layout :isIndex="true">
		<Map />
	</Layout>
</template>

<script>
	import Map from '@/components/Map'
	export default {
		metaInfo: {
			title: 'Mrinalini'
		},
		components: {
			Map
		}
	}
</script>

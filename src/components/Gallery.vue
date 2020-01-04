<template>
	<div class="gallery">
		<g-image v-for="image in filteredImages" :src="image" alt="gallery-img.jpeg" :key="image" />
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		props: {
			filteredImages: {
				type: Array,
				required: false,
				default: () => []
			}
		}
	}
</script>

<style scoped>
	img {
		width: 500px;
	}
</style>

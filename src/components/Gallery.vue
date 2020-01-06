<template>
	<div class="gallery">
		<g-image
			v-for="(imgObj, i) in filteredImages"
			class="gallery-image"
			:src="imgObj.src"
			alt="gallery-img.jpeg"
			:key="imgObj.name"
			@click="onClick(i)"
		/>
		<vue-gallery-slideshow :images="filteredImages" :index="index" @close="index = null"></vue-gallery-slideshow>
	</div>
</template>

<script>
	import VueGallerySlideshow from 'vue-gallery-slideshow'
	export default {
		props: {
			filteredImages: {
				type: Array,
				required: false,
				default: () => []
			}
		},
		data() {
			return {
				index: null
			}
		},
		components: {
			VueGallerySlideshow
		},
		methods: {
			onClick(i) {
				this.index = i
			}
		}
	}
</script>

<style scoped>
	.gallery {
		display: flex;
		flex-direction: column;
		height: 750px;
		overflow: scroll;
	}
	.gallery-image {
		width: 300px;
		/* height: 300px; */
		background-size: cover;
		cursor: pointer;
		margin: 5px;
		/* border-radius: 3px; */
		/* border: 1px solid lightgray; */
		/* object-fit: contain; */
	}
</style>

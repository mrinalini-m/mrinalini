<template>
	<div>
		<div ref="maps" id="maps">Google maps</div>
		<Gallery :filteredImages="images" />
		<Gallery :filteredImages="thumbnails" />
	</div>
</template>

<script>
	import gmapsInit from '@/helpers/gmaps'
	import test from '@/../content/images/test.json'
	import MarkerClusterer from '@google/markerclusterer'
	import Gallery from '@/components/Gallery'
	import { mapActions } from 'vuex'

	export default {
		components: {
			Gallery
		},

		methods: {
			...mapActions(['getGalleryImages', 'getGalleryThumbnails'])
		},

		data() {
			return {
				currentMarkers: [],
				markers: [],
				map: null,
				markerClusterer: null
			}
		},

		computed: {
			images() {
				const mapNames = this.currentMarkers.map(item => {
					return item.title
				})
				return this.$store.state.galleryImages.filter(image => {
					const imageName = image.split('/').pop()
					return mapNames.includes(imageName)
				})
			},
			thumbnails() {
				return this.$store.state.galleryThumbnails
			}
		},

		async mounted() {
			const galleryImages = [],
				galleryThumbnails = [],
				markers = []

			for (const img of test.features) {
				galleryImages.push(img.properties.name)
				galleryThumbnails.push('th_' + img.properties.name)
			}

			this.getGalleryImages({ galleryImages })
			this.getGalleryThumbnails({ galleryThumbnails })

			try {
				const google = await gmapsInit(),
					map = new google.maps.Map(this.$refs.maps, {
						zoom: 2,
						center: { lat: 0, lng: 0 }
					}),
					markerClusterer = new MarkerClusterer(map, markers, {
						imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
					}),
					markerClickHandler = marker => {
						map.setZoom(13)
						map.setCenter(marker.getPosition())
					}

				google.maps.event.addListener(map.data, 'addfeature', e => {
					if (e.feature.getGeometry().getType() === 'Point') {
						var marker = new google.maps.Marker({
							position: e.feature.getGeometry().get(),
							title: e.feature.getProperty('name'),
							map: map
						})
						google.maps.event.addListener(
							marker,
							'click',
							(function(marker, e) {
								return function() {
									console.log('clicked', e.feature.h.name)
								}
							})(marker, e)
						)
						markers.push(marker)
						markerClusterer.addMarker(marker)
						map.setCenter(e.feature.getGeometry().get())
					}
				})

				google.maps.event.addListener(map, 'zoom_changed', cluster => {
					const filtered = []
					for (var i = 0; i < markers.length; i++) {
						if (map.getBounds().contains(markers[i].getPosition())) {
							filtered.push(markers[i])
						}
					}
					this.currentMarkers = filtered
				})

				map.data.addGeoJson(test)
				map.data.setMap(null)
				this.map = map
			} catch (error) {
				console.error(error)
			}
		}
	}
</script>

<style scoped>
	#maps {
		width: 750px;
		height: 750px;
	}
</style>

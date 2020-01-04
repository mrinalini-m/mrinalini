<template>
	<div>
		<div ref="maps" id="maps">
			<google-map-marker v-bind:places="places"></google-map-marker>
		</div>
		<Gallery :filteredImages="images" />
		<Gallery :filteredImages="thumbnails" />
	</div>
</template>

<script>
	import gmapsInit from '~/helpers/gmaps'
	import test from '~/../content/images/test.json'
	import Gallery from '~/components/Gallery'
	import googleMapMarker from '~/components/MapMarker.vue'
	import { mapActions } from 'vuex'

	export default {
		components: {
			Gallery,
			googleMapMarker
		},
		provide: function() {
			return {
				getMap: this.getMap
			}
		},

		data() {
			return {
				currentMarkers: [],
				markers: [],
				map: null,
				places: []
			}
		},

		methods: {
			...mapActions(['getGalleryImages', 'getGalleryThumbnails']),
			getMap: function(found) {
				var vm = this
				function checkForMap() {
					if (vm.map) {
						found(vm.map)
					} else {
						setTimeout(checkForMap, 50)
					}
				}
				checkForMap()
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
				const mapNames = this.currentMarkers.map(item => {
					return item.title
				})
				return this.$store.state.galleryThumbnails.filter(image => {
					const imageName = image.split('/').pop()
					return mapNames.includes(`th-${imageName}`)
				})
			}
		},

		async mounted() {
			const galleryImages = [],
				galleryThumbnails = [],
				markers = [],
				places = []

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
					})

				google.maps.event.addListener(map.data, 'addfeature', e => {
					if (e.feature.getGeometry().getType() === 'Point') {
						places.push({
							position: e.feature.getGeometry().get(),
							title: e.feature.getProperty('name')
						})
						map.setCenter(e.feature.getGeometry().get())
					}
				})

				this.places = places
				google.maps.event.addListener(map, 'zoom_changed', () => {
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

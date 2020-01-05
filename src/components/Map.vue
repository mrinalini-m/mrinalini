<template>
	<div class="map-wrapper">
		<div ref="maps" id="maps">
			<google-map-marker v-bind:places="places"></google-map-marker>
		</div>
		<ClientOnly>
			<Gallery :filteredImages="images" />
		</ClientOnly>
	</div>
</template>

<script>
	import test from '~/../content/images/test.json'
	import Gallery from '~/components/Gallery'
	import GoogleMapMarker from '~/components/MapMarker.vue'
	import { mapActions } from 'vuex'

	export default {
		components: {
			Gallery,
			GoogleMapMarker
		},
		provide: function() {
			return {
				getMap: this.getMap
			}
		},

		data() {
			return {
				map: null,
				places: []
			}
		},

		methods: {
			...mapActions(['getGalleryImages']),
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
				const mapNames = this.$store.state.currentMarkers.map(item => {
					return item.title
				})
				return this.$store.state.galleryImages.filter(image => {
					const imageName = image.split('/').pop()
					return mapNames.includes(imageName)
				})
			}
		},

		mounted() {
			import('~/helpers/gmaps').then(async gmapsInit => {
				const galleryImages = [],
					places = []

				for (const img of test.features) {
					galleryImages.push(img.properties.name)
				}
				this.getGalleryImages({ galleryImages })

				try {
					const google = await gmapsInit.default(),
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
					map.data.addGeoJson(test)
					map.data.setMap(null)
					this.map = map
				} catch (error) {
					console.error(error)
				}
			})
		}
	}
</script>

<style scoped>
	.map-wrapper {
		display: flex;
	}
	#maps {
		width: 750px;
		height: 750px;
	}
</style>

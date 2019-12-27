<template>
	<Layout :isIndex="true">
		<div ref="maps" id="maps">Google maps</div>
		<div class="gallery">
			<g-image v-for="image in images" :src="image" :key="image" />
		</div>
	</Layout>
</template>

<script>
	import gmapsInit, { locations } from '@/helpers/gmaps'
	import geoJson from '@/../content/images/geoJson.json'
	import Images from '@/../content/images/gallery'
	import MarkerClusterer from '@google/markerclusterer'

	export default {
		metaInfo: {
			title: 'Mrinalini'
		},

		data() {
			return {
				show: false,
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

				return Images.filter(image => {
					const imageName = image.split('/').pop()
					return mapNames.includes(imageName)
				})
			}
		},

		async mounted() {
			const markers = []
			try {
				const google = await gmapsInit(),
					map = new google.maps.Map(this.$refs.maps, {
						zoom: 2,
						center: { lat: 0, lng: 0 }
					})
				const markerClusterer = new MarkerClusterer(map, markers, {
					imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
				})
				const markerClickHandler = marker => {
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

				map.data.addGeoJson(geoJson)
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
	img {
		width: 500px;
	}
</style>

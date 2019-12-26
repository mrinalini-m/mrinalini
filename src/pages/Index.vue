<template>
	<Layout :isIndex="true">
		<div ref="maps" id="maps">Google maps</div>
		<div class="gallery" v-html="images">
			<!-- <g-image v-for="image in images" :src="image" :key="image" /> -->
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
				refs: [],
				markers: [],
				map: null
			}
		},
		computed: {
			images() {
				let html = ''
				for (const image of Images) {
					const ref = `img${image
						.split('/')
						.pop()
						.replace('.jpg', '')}`
					this.refs.push(ref)
					html += `<img style="display:none;" src="${image}" ref="${ref}" width="500"></img>`
				}
				// console.log(html)
				// console.log(this.refs)
				return html
			}
		},
		watch: {
			markers(from, to) {
				const markerClusterer = new MarkerClusterer(this.map, to, {
					imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
				})
				console.log(from)
				console.log(to)
			}
		},
		async mounted() {
			// console.log(this.images, geoJson.features)
			try {
				const google = await gmapsInit(),
					map = new google.maps.Map(this.$refs.maps, {
						zoom: 2,
						center: { lat: 0, lng: 0 }
					})
				// var markerClusterer = new MarkerClusterer()
				// console.log(markerClusterer)

				const markerClickHandler = marker => {
					map.setZoom(13)
					map.setCenter(marker.getPosition())
				}
				// markers = locations.map(location => {
				// 	const marker = new google.maps.Marker({ ...location, map })
				// 	marker.addListener('click', () => markerClickHandler(marker))
				// 	return marker
				// })

				// map.data.setStyle({
				// 	icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png'
				// })

				// map.data.addListener('click', function(event) {
				// 	// vm.show = true
				// 	console.log('clicked', event.feature.h.name)
				// })

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

						this.markers.push(marker)
						// console.log(this.markers)
						// markerClusterer.addMarkers(markers)
						// markerClusterer.setReady_(true)
						map.setCenter(e.feature.getGeometry().get())
					}
				})
				// console.log(markers)

				// markerClusterer.ClusterIcon_.prototype.triggerClusterClick = function() {
				// 	var markerClusterer = this.cluster_.getMarkerClusterer()

				// 	// Trigger the clusterclick event.
				// 	google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_)

				// 	if (markerClusterer.isZoomOnClick()) {
				// 		// Zoom into the cluster.
				// 		// this.map_.fitBounds(this.cluster_.getBounds());

				// 		// modified zoom in function
				// 		this.map_.setZoom(markerClusterer.getMaxZoom() + 1)
				// 	}
				// }
				// google.maps.event.trigger(markerClusterer, 'clusterclick', function(e) {
				// 	e.preventDefault()
				// 	console.log('something')
				// })

				map.data.addGeoJson(geoJson)
				map.data.setMap(null)
				this.map = map
				// NOTE: This uses cross-domain XHR, and may not work on older browsers.
				// map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json')
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

<template>
	<Layout :isIndex="true">
		<div ref="maps" id="maps">Google maps</div>
	</Layout>
</template>

<script>
	import gmapsInit, { locations } from '@/helpers/gmaps'
	import MarkerClusterer from '@google/markerclusterer'
	export default {
		metaInfo: {
			title: 'Mrinalini'
		},
		async mounted() {
			try {
				const google = await gmapsInit(),
					geocoder = new google.maps.Geocoder(),
					map = new google.maps.Map(this.$refs.maps, {
						zoom: 2,
						center: { lat: 0, lng: 0 }
					}),
					markerClickHandler = marker => {
						map.setZoom(13)
						map.setCenter(marker.getPosition())
					},
					markers = locations.map(location => {
						const marker = new google.maps.Marker({ ...location, map })
						marker.addListener('click', () => markerClickHandler(marker))

						return marker
					})

				new MarkerClusterer(map, markers, {
					imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
				})
			} catch (error) {
				console.error(error)
			}
		}
	}
</script>

<style>
	#maps {
		width: 750px;
		height: 750px;
	}
</style>

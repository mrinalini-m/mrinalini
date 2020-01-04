<script>
	import MarkerClusterer from '@google/markerclusterer'
	export default {
		inject: ['getMap'],
		props: ['places'],
		created: function() {
			var vm = this
			const markerClickHandler = marker => {
				map.setZoom(13)
				map.setCenter(marker.getPosition())
			}

			vm.getMap(function(map) {
				const markers = []
				const markerClusterer = new MarkerClusterer(map, markers, {
					imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
				})
				vm.places.forEach(function(place) {
					let marker = new google.maps.Marker({ position: place.position, title: place.title, map: map })
					google.maps.event.addListener(
						marker,
						'click',
						(function(marker, title) {
							return function() {
								console.log('clicked', title)
							}
						})(marker, place.title)
					)
					markerClusterer.addMarker(marker)
				})
			})
		},
		render(h) {
			return null
		}
	}
</script>

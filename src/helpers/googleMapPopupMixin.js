export default {
	data: _ => ({
		coordKey: 'coord',
		items: [
			{
				id: 1,
				coord: {
					lat: 55,
					lng: 55
				},
				name: 'Test'
			}
		],

		Popup: null,
		popups: [],
		uniqueId: 'estobidi'
	}),

	// mounted() {
	// 	this.renderPopups()
	// },

	methods: {
		/**
		 * Defines a new javascript class to create popups on
		 * a google map.
		 *
		 * Taken from https://developers.google.com/maps/documentation/javascript/examples/overlay-popup
		 */
		definePopupClass() {
			this.Popup = function(position, content, id) {
				if (!this.google) return
				this.position = position

				content.classList.add('popup-bubble-content')

				var pixelOffset = document.createElement('div')
				pixelOffset.classList.add('popup-bubble-anchor')
				pixelOffset.appendChild(content)

				this.anchor = document.createElement('div')
				this.anchor.classList.add('popup-tip-anchor')
				this.anchor.id = id
				this.anchor.appendChild(pixelOffset)

				this.stopEventPropagation()
			}

			this.Popup.prototype = Object.create(this.google.maps.OverlayView.prototype)

			this.Popup.prototype.onAdd = function() {
				this.getPanes().floatPane.appendChild(this.anchor)
			}

			this.Popup.prototype.onRemove = function() {
				if (this.anchor.parentElement) {
					this.anchor.parentElement.removeChild(this.anchor)
				}
			}

			this.Popup.prototype.draw = function() {
				var divPosition = this.getProjection().fromLatLngToDivPixel(this.position)
				var display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none'

				if (display === 'block') {
					this.anchor.style.left = divPosition.x + 'px'
					this.anchor.style.top = divPosition.y + 'px'
				}
				if (this.anchor.style.display !== display) {
					this.anchor.style.display = display
				}
			}

			this.Popup.prototype.stopEventPropagation = function() {
				var anchor = this.anchor
				anchor.style.cursor = 'auto'
				;['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown'].forEach(function(
					event
				) {
					anchor.addEventListener(event, function(e) {
						e.stopPropagation()
					})
				})
			}
		},

		/**
		 * Generate popups from an array of objects.
		 */
		generatePopups() {
			this.items.forEach(i => {
				var el = document.createElement('div'),
					id = 'popup-' + i[this.uniqueId],
					coord = new this.google.maps.LatLng(i[this.coordKey].lat, i[this.coordKey].lng)
				el.innerHTML = this.htmlGenerator(i)
				var popup = new this.Popup(coord, el, id)
				popup.setMap(this.map)
				this.popups.push(popup)
			})
		},

		/**
		 * Generates the html to display within the popup.
		 *
		 * @param object item
		 *
		 * @return string
		 */
		htmlGenerator(item) {
			return item.name
		},

		/**
		 * Adds popups to map once map has rendered.
		 */
		renderPopups() {
			this.definePopupClass()
			this.generatePopups()
		}
	}
}

const API_KEY = 'AIzaSyAVfe5ahbxG_LANdgEutGukGaTqZcFpBFI'
const CALLBACK_NAME = 'gmapsCallback'

let initialized = !!window.google
let resolveInitPromise
let rejectInitPromise
const initPromise = new Promise((resolve, reject) => {
	resolveInitPromise = resolve
	rejectInitPromise = reject
})
const redStar = {
		path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
		fillColor: 'red',
		fillOpacity: 0.8,
		scale: 0.0625
	},
	home = { lat: 37.378437, lng: -122.030763 }

export default function init() {
	if (initialized) return initPromise

	initialized = true
	window[CALLBACK_NAME] = () => resolveInitPromise(window.google)

	const script = document.createElement('script')
	script.async = true
	script.defer = true
	script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`
	script.onerror = rejectInitPromise
	document.querySelector('head').appendChild(script)

	return initPromise
}

export const locations = [
	{
		position: home,
		icon: redStar,
		title: 'Home <3'
	},
	{
		position: {
			lat: 48.16091,
			lng: 16.38333
		}
	},
	{
		position: {
			lat: 48.17427,
			lng: 16.32962
		}
	}
]

const API_KEY = 'AIzaSyAVfe5ahbxG_LANdgEutGukGaTqZcFpBFI',
	CALLBACK_NAME = 'gmapsCallback',
	initPromise = new Promise((resolve, reject) => {
		resolveInitPromise = resolve
		rejectInitPromise = reject
	})

let initialized = !!window.google,
	resolveInitPromise,
	rejectInitPromise

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

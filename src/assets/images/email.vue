<template>
	<svg
		version="1.1"
		id="github"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 128 128"
		style="enable-background:new 0 0 128 128;"
		xml:space="preserve"
	>
		<path
			class="mail"
			d="M113.6,14.5H14.6C7.8,14.5,2.2,20,2.2,26.9l-0.1,74.3c0,6.8,5.6,12.4,12.4,12.4h99.1c6.8,0,12.4-5.6,12.4-12.4V26.9
	C126,20,120.4,14.5,113.6,14.5z M113.6,101.1H14.6V39.2l49.5,31l49.5-31V101.1z M64.1,57.8l-49.5-31h99.1L64.1,57.8z"
		/>
	</svg>
</template>

<script>
	export default {
		render(h) {
			return null
		}
	}
</script>

<style scoped>
	.mail {
		fill: #d44638;
		transition: 0.25s ease-out;
	}
	svg {
		height: 2rem;
		width: 2rem;
	}
	svg:hover .mail {
		fill: #7f2a21;
	}
</style>

<template>
	<div class="layout" id="app">
		<Header class="header" />
		<main id="main-content">
			<div class="container">
				<slot />
			</div>
		</main>
		<Footer />
	</div>
</template>

<script>
	import Header from '../components/Header'
	import Footer from '../components/Footer'
	export default {
		components: {
			Header,
			Footer
		}
	}
</script>

<style lang="scss" scoped>
	#main-content {
		margin-top: $nav-height;
		min-height: calc(100vh - #{$nav-height} - #{$footer-height});
	}
</style>

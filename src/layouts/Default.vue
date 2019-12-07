<template>
	<div class="layout" id="app">
		<Header class="header" />
		<div v-if="sidebar">
			<Sidebar
				:links="[
					{ id: 1, text: 'Link 1', url: 'https://github.com' },
					{ id: 2, text: 'Link 2', url: 'https://github.com' },
					{ id: 3, text: 'Link 3', url: 'https://github.com' }
				]"
			>
			</Sidebar>
		</div>
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
	import Sidebar from '../components/Sidebar'
	export default {
		props: ['sidebar'],
		components: {
			Header,
			Footer,
			Sidebar
		}
	}
</script>

<style lang="scss" scoped>
	#main-content {
		margin-top: calc(#{$nav-height} + 2rem);
		min-height: calc(100vh - #{$nav-height} - #{$footer-height});
	}
</style>

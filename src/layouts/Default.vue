<template>
	<div class="layout" id="app">
		<Header class="header" />
		<main id="main-content">
			<Sidebar
				:postCategory="this.postCategory"
				:showPosts="this.showPosts"
				:showTags="this.showTags"
				:showCategories="this.showCategories"
			/>
			<section class="container">
				<slot />
				<Footer />
			</section>
		</main>
	</div>
</template>

<script>
	import Sidebar from '../components/Sidebar'
	import Header from '../components/Header'
	import Footer from '../components/Footer'
	export default {
		components: {
			Header,
			Sidebar,
			Footer,
		},
		props: {
			postCategory: { type: String, required: false },
			showTags: { type: Boolean, required: false },
			showPosts: { type: Boolean, required: false },
			showCategories: { type: Boolean, required: false },
		},
	}
</script>

<style lang="scss" scoped>
	#main-content {
		margin-top: calc(#{$nav-height});
		min-height: calc(100vh - #{$nav-height} - #{$footer-height});
	}
</style>

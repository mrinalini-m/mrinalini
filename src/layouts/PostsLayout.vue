<template>
	<Layout>
		<Sidebar
			:postCategory="this.postCategory"
			:showPosts="this.showPosts"
			:showTags="this.showTags"
			:showCategories="this.showCategories"
		/>
		<section class="container">
			<article class="layout" id="posts">
				<slot />
			</article>
		</section>
	</Layout>
</template>

<script>
	import Sidebar from '../components/Sidebar'
	export default {
		props: {
			postCategory: { type: String, required: false },
			showTags: { type: Boolean, required: false },
			showPosts: { type: Boolean, required: false },
			showCategories: { type: Boolean, required: false }
		},
		components: {
			Sidebar
		}
	}
</script>

<template>
	<Card>
		<p class="date" v-html="post.date" />
		<h3 class="title" v-html="post.title" />
		<!-- <p class="description" v-html="post.description" /> -->
		<!-- <b>{{ post.timeToRead }} min read</b> &nbsp; -->
		<g-link :to="post.path" class="read">Read More</g-link>
	</Card>
</template>

<script>
	import Card from '../common/Card'
	export default {
		components: {
			Card
		},
		props: ['post']
	}
</script>

<style lang="scss" scoped>
	.line {
		border: 0.5px solid black;
		margin: 30px 0;
	}

	.date {
		padding: 1rem;
		font-weight: 300;
	}

	.read {
		color: black;
		text-decoration: none;
		border: 2px dashed red;
	}
</style>

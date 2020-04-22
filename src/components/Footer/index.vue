<template>
	<footer>
		<p>
			<a href="https://github.com/mrinalini-m/blog.mrinalini.dev"><Github /></a>
		</p>
	</footer>
</template>
<script>
	import Github from './github'
	export default {
		name: 'custom-footer',
		components: {
			Github
		}
	}
</script>
<style lang="scss" scoped>
	footer {
		padding: 1.5rem;
		text-align: center;

		p {
			display: inline-block;
			margin: 0 auto;
			padding: 0.5rem;
			font-size: 1rem;
			letter-spacing: 1px;
		}
	}
</style>

<template>
	<footer>
		<div>
			<p>
				Hi, I'm <a href="https://mrinalini.dev">Sam M</a>.
				<span class="mobile-hide"> I made this blog with Vue + Gridsome.</span>
				<br />
				If you find a bug or typo,
				<a href="https://github.com/mrinalini-m/blog.mrinalini.dev"
					>you can send a pull request here.</a
				>
			</p>
		</div>
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
		font-size: 14px;
		letter-spacing: 1px;
	}
}
@include small-breakpoint {
	footer {
		padding: 0rem;
		.mobile-hide {
			display: none;
		}
		p {
			font-size: 12px;
		}
	}
}
</style>

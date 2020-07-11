<template>
	<footer :style="{ marginLeft: sidebarWidth + 'px' }">
		<div>
			<p>
				Hi, I'm <a href="https://mrinalini.dev">Sam M</a>.
				<br />
				This blog is made with Vue + Gridsome <br />using the
				<a href="https://jamstack.org/">Jamstack</a> architecture.<br />
				<a href="https://github.com/mrinalini-m/blog.mrinalini.dev">
					<Github class="github-logo" />
				</a>
			</p>
		</div>
	</footer>
</template>

<script>
	import { mapState } from 'vuex'
	import Github from './github'
	export default {
		name: 'custom-footer',
		components: {
			Github,
		},
		computed: {
			...mapState(['sidebarWidth']),
		},
	}
</script>
<style lang="scss" scoped>
	footer {
		padding: 1.5rem;
		text-align: center;
		.github-logo {
			margin: 0.5rem;
		}
		p {
			display: inline-block;
			margin: 0 auto;
			padding: 0.5rem;
			font-size: 14px;
			letter-spacing: 1px;
		}
	}
	@include medium-breakpoint {
		footer {
			margin-left: 0px !important;
		}
	}
	@include small-breakpoint {
		footer {
			padding: 0.5rem;
			p {
				font-size: 12px;
			}
		}
	}
</style>

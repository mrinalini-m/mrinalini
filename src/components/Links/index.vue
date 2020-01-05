<template>
	<div class="links">
		<nav>
			<ul>
				<Link v-for="link in links" :key="link.type" :link="link" />
			</ul>
		</nav>
	</div>
</template>

<script>
	import Link from './Link'

	export default {
		name: 'links',
		components: {
			Link
		},
		data() {
			return {
				links: []
			}
		},
		mounted() {
			this.links = this.$static.metadata.links
		}
	}
</script>

<style lang="scss" scoped>
	nav {
		white-space: nowrap;
		align-items: center;
		padding: 0.3rem 0;
		text-align: 'center';
	}

	.links {
		ul {
			justify-items: center;
			display: inline-block;
			justify-content: center;
		}
		background-color: peachpuff;
		flex: 50%;
		max-width: 500px;
	}
</style>

<static-query>
query {
  metadata {
    links {
			type,
			name,
			url
		}
    
  }
}
</static-query>

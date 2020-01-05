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
			text-align: center;
			justify-items: center;
			display: inline-block;
			justify-content: center;
			display: grid;
			justify-content: center;
			grid-template-columns: repeat(3, minmax(60px, 100px));
			grid-template-areas: 'email linkedin github';
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

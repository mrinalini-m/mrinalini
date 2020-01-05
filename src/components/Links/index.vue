<template>
	<div class="links">
		<nav>
			<ul>
				<Mail :links="links" />
			</ul>
		</nav>
	</div>
</template>

<script>
	import Mail from './Mail'
	export default {
		name: 'links',
		components: {
			Mail
		},
		data() {
			return {
				links: {}
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

	ul {
		justify-items: center;
		display: inline-block;

		justify-content: center;
	}
	.links {
		background-color: peachpuff;
		flex: 50%;
		max-width: 500px;
		.link-wrapper {
			margin: 0.5rem 1rem;
		}
	}
</style>

<static-query>
query {
  metadata {
    links {
      email {
        name, url
      },
      linkedin {
        name, url
      },
      github {
        name, url
      }
    }
  }
}
</static-query>

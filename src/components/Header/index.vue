<template>
	<header class="custom-header" v-bind:class="{ scroll: scrolled }">
		<nav class="nav">
			<Mobile />
			<div class="brand">
				<g-link to="/">
					<span class="text">{{ $static.metadata.siteName }}</span></g-link
				>
			</div>
			<Header />
		</nav>
	</header>
</template>

<script>
	import Header from './Header'
	import Mobile from './Mobile'
	export default {
		name: 'custom-header',
		data() {
			return { scrolled: false }
		},
		components: {
			Header,
			Mobile
		},
		mounted() {
			window.addEventListener('scroll', this.onScroll)
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.onScroll)
		},
		methods: {
			onScroll() {
				this.scrolled = window.scrollY > 20 ? true : false
			}
		}
	}
</script>

<style lang="scss">
	.favicon {
		height: 1.5rem;
		width: 1.5rem;
		margin-bottom: 0;
	}

	.custom-header {
		background-color: white;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		max-width: 100vw;
		width: 100%;
		margin: 0;
		padding: 0 1.5rem;
		transition: height 0.3s ease, box-shadow 0.3s ease;
		z-index: 3;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
		&.scroll {
			box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0 2px 2px rgba(0, 0, 0, 0.03),
				0 4px 4px rgba(0, 0, 0, 0.03), 0 8px 8px rgba(0, 0, 0, 0.03),
				0 16px 16px rgba(0, 0, 0, 0.03);
			.nav {
				height: calc(#{$nav-height} - 1rem);
				.navbar-toggle {
					margin: 6px 0 6px 8px;
					transition: margin 0.3s ease;
				}
				.brand {
					a {
						color: $heading-font-color;
						text-decoration: none;
						&:hover {
							color: $heading-font-color;
						}
					}
				}
			}
		}
		.nav {
			display: flex;
			flex-wrap: no-wrap;
			align-items: center;
			justify-content: space-between;
			height: $nav-height;
			margin: auto;
			padding: 0 1.5rem;
			transition: height 0.3s ease, box-shadow 0.3s ease;
			.brand {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				flex: 1;
				margin: 0;
				a {
					display: flex;
					align-items: center;
					color: $heading-font-color;
					font-size: 1.5rem;
					&:hover {
						color: $heading-font-color;
					}
				}
				span.text {
					white-space: nowrap;
				}
			}
		}
	}

	//mobile header center brand
	@media screen and (max-width: 900px) {
		.custom-header {
			padding: 0;
			.nav {
				margin: 0;
				padding: 0;
				.brand {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					flex: 1;
					margin: 0;
				}
			}
		}
	}
</style>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

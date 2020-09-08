<template>
	<header class="custom-header" :class="{ scroll: scrolled }">
		<nav :style="{ height: navHeight }" class="nav">
			<Mobile />
			<div class="brand">
				<a href="https://mrinalini.dev/">
					<span class="text" style="color: rgb(246, 213, 92)">S</span>
					<span class="text" style="color: rgb(63, 187, 131)">M</span>
				</a>
			</div>
			<div class="links">
				<g-link class="style-as-link-header" to="/">All Posts</g-link>
			</div>
		</nav>
	</header>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	import Mobile from './Mobile'

	export default {
		name: 'custom-header',
		data() {
			return { scrolled: false }
		},
		components: {
			Mobile,
		},
		computed: {
			...mapState(['navHeight']),
		},
		mounted() {
			window.addEventListener('scroll', this.onScroll)
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.onScroll)
		},
		methods: {
			...mapActions(['getNavHeight']),

			onScroll() {
				this.scrolled = window.scrollY > 20 ? true : false
				this.scrolled ? this.getNavHeight('3rem') : this.getNavHeight('4rem')
			},
		},
	}
</script>

<style lang="scss">
	.favicon {
		height: 1.5rem;
		width: 1.5rem;
		margin-bottom: 0;
	}

	img.logo {
		margin-bottom: 0;
	}

	.custom-header {
		background-color: $background;
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
				font-family: 'Open Sans' !important;
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
					padding: 0.5rem;
					border-radius: 50%;
					&:hover {
						color: $heading-font-color;
					}
					.logo {
						height: 2rem;
						width: 2rem;
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
				width: 100vw;
				margin: 0;
				padding: 0;
				.links {
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

	.scroll {
		.nav {
			.links {
				a {
					height: calc(#{$nav-height} - 1rem);
					transition: height 0.3s ease, color $transition;
				}
			}
		}
	}
	.nav {
		.links {
			display: flex;
			align-items: center;
			margin-left: auto; //flex item will align to the right since you can't use justify-items or justify-self with flexbox
			a {
				display: flex;
				align-items: center;
				text-align: center;
				margin: 0;
				height: $nav-height;
				padding: 0 0.75rem;
				// font-size: 1.25rem;
			}
			@include style-as-link-header('height 0.3s ease, color $transition');
			.active--exact {
				border-bottom: 1px solid $link-color;
			}
		}
	}

	@include medium-breakpoint {
		.custom-header {
			.nav {
				.brand {
					// display: none;
					position: absolute;
					right: 0;
					a {
						padding-right: 13px;
					}
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

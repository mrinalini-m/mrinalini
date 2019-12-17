<template>
	<div class="links">
		<g-link class="style-as-link-header" to="/posts/">Posts</g-link>
	</div>
</template>

<style lang="scss" scoped>
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
				font-size: 1.25rem;
				font-weight: 500;
			}
			@include style-as-link-header('height 0.3s ease, color $transition');
			.active {
				border-bottom: 1px solid $primary;
			}
		}
	}

	//Hide Right links for mobile
	@include medium-breakpoint {
		.nav {
			.links {
				display: none;
			}
		}
	}
</style>

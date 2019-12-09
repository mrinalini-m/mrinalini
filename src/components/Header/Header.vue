<template>
	<div class="links">
		<g-link to="/posts/">Posts</g-link>
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
				transition: height 0.3s ease, color $transition;
				font-size: 1.25rem;
				font-weight: 500;
				color: $heading-font-color;
				&:active {
					color: $heading-font-color;
				}
				&:hover {
					color: $link-color;
				}
			}
			.active {
				color: $primary;
				border-bottom: 1px solid $primary;
			}
		}
	}

	//Hide Right links for mobile
	@media (max-width: 900px) {
		.nav {
			.links {
				display: none;
			}
		}
	}
</style>

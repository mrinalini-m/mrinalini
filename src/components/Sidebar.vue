<template>
	<div class="sidebar">
		<transition name="slide">
			<nav v-show="show" class="menu" :style="[menuWidth]">
				<div v-if="showTags" class="tags">
					<ul>
						<li v-for="tag in tags" :key="tag.id" class="tag">
							<h6>
								<g-link class="style-as-link-header" :to="tag.path">
									{{ tag.name }}
								</g-link>
							</h6>
						</li>
					</ul>
				</div>
				<div v-if="showCategories || showPosts" class="categories">
					<ul>
						<li
							v-for="category in categories"
							:key="category.id"
							class="category"
						>
							<h6>
								<g-link class="style-as-link-header" :to="category.path">
									{{ category.name }}
								</g-link>
							</h6>
							<ul v-if="category.id === postCategory">
								<li
									v-for="post in posts[category.id]"
									:key="post.id"
									class="post"
								>
									<g-link class="style-as-link-header" :to="post.path">
										{{ post.title }}
									</g-link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</transition>
	</div>
</template>

<script>
	import { getTags, getCatsAndPosts } from '@/utils'
	export default {
		name: 'sidebar',
		props: {
			width: {
				type: Number,
				required: false,
				default: 300
			},
			postCategory: {
				type: String,
				required: false,
				default: ''
			},
			showPosts: { type: Boolean, required: false, default: false },
			showTags: { type: Boolean, required: false, default: false },
			showCategories: { type: Boolean, required: false, default: false }
		},

		data() {
			return {
				menuWidth: {
					width: this.width + 'px'
				},
				marginLeft: this.width + 'px',
				categories: {
					type: Object,
					required: false,
					default: () => ({})
				},
				posts: {
					type: Object,
					required: false,
					default: () => ({})
				},
				tags: {
					type: Object,
					required: false,
					default: () => ({})
				},

				show: false
			}
		},

		computed: {
			mainContent() {
				return document.getElementById('main-content')
			}
		},

		async mounted() {
			this.mainContent.style['margin-left'] = this.marginLeft
			const boundFetch = this.$fetch.bind(this)

			this.$root.$on('toggle-sidebar', data => {
				this.show = data && !this.show
			})
			const { parsedCategories, parsedPosts } = await getCatsAndPosts(
				boundFetch
			)
			this.categories = parsedCategories
			this.posts = parsedPosts
			this.tags = await getTags(boundFetch)
		}
	}
</script>

<style lang="scss">
	.slide-enter-active {
		transition: $transition;
	}
	.slide-leave-active {
		transition: $transition;
	}
	.slide-enter,
	.slide-leave-to {
		transform: translateX(-100%);
	}
	.menu {
		height: 100%;
		border-right: $border;
		width: 0;
		position: fixed;
		left: 0;
		margin-top: calc(#{$nav-height} - 1rem);
		z-index: 1;
		top: 0;
		background: $background-secondary;
		overflow-x: hidden;
		padding: 2rem 0;
		padding-bottom: 6rem;
		.categories,
		.tags {
			a {
				&:after {
					background-color: $primary;
					opacity: 1;
					transform: translateX(-92px);
					width: 0px;
					border-radius: 4px;
					content: '';
					left: calc(0.5rem);
					top: 12px;
					height: 8px;
					position: absolute;
					transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
				}
			}
			.active {
				position: relative;
				&:after {
					width: 100px;
				}
				font-weight: 700;
				background-color: scale-color($primary, $lightness: 90%);
			}
			ul {
				li {
					a.style-as-link-header {
						padding: 0.3rem;
						text-decoration: none;
						display: block;
						line-height: 1.5rem;
						position: relative;
						&:before {
							content: '';
							left: calc(0.5rem);
							top: 12px;
							height: 0px;
							width: 0px;
							position: absolute;
							transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
							background-color: $primary;
							transform: scale(1);
							border-radius: 100%;
						}
						border: 1px solid transparent;
						&:hover {
							background-color: scale-color($primary, $lightness: 90%);
							border: 1px solid $link-hover-color;
							position: relative;
							&:before {
								width: 8px;
								height: 8px;
							}
						}
					}
					&.category,
					&.tag {
						h6 {
							margin-bottom: 0;
							a.style-as-link-header {
								padding-left: 1.5rem;
							}
						}
					}
					&.post {
						a.style-as-link-header {
							font-weight: 500;
							padding-left: 2rem;
						}
					}
					@include style-as-link-header;
				}
			}
			.posts {
				ul {
					li {
						a.style-as-link-header {
							font-size: 1rem;
						}
						@include style-as-link-header;
					}
				}
			}
		}

		.closebtn {
			position: absolute;
			top: 0;
			right: 25px;
			font-size: 36px;
			margin-left: 50px;
		}
	}
	.hamburger-icon {
		position: relative;
		top: -50px;
		float: left;
		z-index: 20;
	}
	@media screen and (max-height: 450px) {
		.menu {
			padding-top: 15px;
			a {
				font-size: 18px;
			}
		}
	}
	@media screen and (min-width: 900px) {
		.sidebar {
			.menu {
				display: block !important;
			}
		}
	}
	@include medium-breakpoint {
		#main-content {
			margin-left: 0px !important;
		}
	}
	@include small-breakpoint {
		.sidebar {
			.menu {
				border: none;
				width: 100% !important;
			}
		}
	}
</style>

<template>
	<div class="sidebar" :style="[sidebarDisplay]">
		<nav class="menu" :style="[menuWidth]">
			<slot />
			<div class="categories" v-if="Object.keys(categories).length">
				<ul>
					<li v-for="category in categories" :key="category.id">
						<g-link class="category-link" :to="category.path">
							{{ category.name }}
						</g-link>
						<ul v-if="category.id === postCategory">
							<li v-for="edge in posts[category.id]" :key="edge.node.id">
								<g-link :to="edge.node.path">
									{{ edge.node.title }}
								</g-link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<slot v-else />
		</nav>
	</div>
</template>

<script>
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
			}
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
				sidebarDisplay: {}
			}
		},

		computed: {
			mainContent() {
				return document.getElementById('main-content')
			}
		},

		async mounted() {
			this.mainContent.style['margin-left'] = this.marginLeft
			let results,
				posts = {}
			try {
				results = await this.$fetch('/posts')
			} catch (error) {
				console.error(error)
			}
			const categories = results.data.allCategory.edges,
				parsedCategories = {}
			for (const category of categories) {
				const catObj = {
					id: category.node.id,
					name: category.node.name,
					path: category.node.path
				}
				parsedCategories[category.node.id] = catObj
				try {
					const categoryList = await this.$fetch(`/posts/${catObj.id}`)
					posts[catObj.id] = categoryList.data.category.belongsTo.edges
				} catch (error) {
					console.error(error)
				}
			}
			this.posts = posts
			this.categories = parsedCategories
			this.$root.$on('toggle-sidebar', data => {
				this.sidebarDisplay =
					data && window.innerWidth < 900
						? { display: 'block' }
						: { display: 'none' }
			})
		}
	}
</script>

<style lang="scss">
	.menu {
		height: 100%;
		width: 0;
		position: fixed;
		left: 0;
		z-index: 1;
		top: 0;
		background: gray;
		overflow-x: hidden;
		padding-top: 60px;
		transition: 0.5s;
		padding: 60px 0;
		.categories {
			.category-link {
				padding: 8px 8px 8px 32px;
				text-decoration: none;
				font-size: 25px;
				display: block;
				transition: 0.3s;
			}
			.posts {
				ul {
					li {
						a {
							font-size: 1rem;
						}
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
	@media screen and (max-width: 900px) {
		#main-content {
			margin-left: 0px !important;
		}
		.sidebar {
			display: none;
		}
	}
	@media screen and (min-width: 900px) {
		.sidebar {
			display: block !important;
		}
	}
	@media screen and (max-width: 500px) {
		.sidebar {
			.menu {
				width: 100% !important;
			}
		}
	}
</style>

<template>
	<div class="sidebar">
		<nav class="menu" :style="[menuWidth]">
			<slot />
			<div class="categories" v-if="categories.length">
				<ul>
					<li v-for="category in categories" :key="category.id">
						<g-link class="category-link" :to="category.path">
							{{ category.name }}
						</g-link>
						<ul v-if="category.posts">
							<li v-for="edge in category.posts" :key="edge.node.id">
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
				default: 400
			},
			showCategories: {
				type: Boolean,
				required: false,
				default: false
			},
			showPosts: {
				type: Boolean,
				required: false,
				default: false
			}
		},
		data() {
			return {
				menuWidth: {
					width: this.width + 'px'
				},
				marginLeft: this.width + 'px',
				categories: []
			}
		},
		computed: {
			mainContent() {
				return document.getElementById('main-content')
			}
		},
		async mounted() {
			this.mainContent.style['margin-left'] = this.marginLeft
			let results
			try {
				results = await this.$fetch('/posts')
			} catch (error) {
				console.error(error)
			}
			if (this.showCategories) {
				const categories = results.data.allCategory.edges
				const parsedCategories = []
				for (const category of categories) {
					const catObj = {
						id: category.node.id,
						name: category.node.name,
						path: category.node.path,
						posts: []
					}
					if (this.showPosts) {
						try {
							const categoryList = await this.$fetch(`/posts/${catObj.id}`)
							catObj.posts = categoryList.data.category.belongsTo.edges
						} catch (error) {
							console.error(error)
						}
					}
					parsedCategories.push(catObj)
				}
				this.categories = parsedCategories
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		margin-top: 40px;
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
</style>

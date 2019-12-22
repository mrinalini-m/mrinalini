<template>
	<Layout :showCategories="showCategories" :postCategory="postCategory" :showPosts="showPosts" :showTags="showTags">
		<article class="posts">
			<header class="title-wrapper">
				<h2 class="title">{{ title }}</h2>
				<p v-if="description" class="description">
					{{ $page.category.description }}
				</p>
			</header>
			<Searchbar v-on:filter="filterPosts" />
			<div>
				<PostList v-for="edge in filteredPosts" :key="edge.node.id" :post="edge.node" />
			</div>
		</article>
	</Layout>
</template>

<script>
	import { mapActions } from 'vuex'
	import PostList from '@/components/PostList'
	import Searchbar from '@/components/Searchbar'
	export default {
		props: {
			postCategory: {
				type: String,
				required: false,
				default: () => ''
			},
			postTag: {
				type: String,
				required: false,
				default: () => ''
			},
			showPosts: {
				type: Boolean,
				required: false,
				default: false
			},
			showCategories: {
				type: Boolean,
				required: false,
				default: true
			},
			showTags: {
				type: Boolean,
				required: false,
				default: false
			},
			edges: {
				type: Array,
				required: false,
				default: () => []
			},
			title: {
				ype: String,
				required: false,
				default: 'All Posts'
			},
			description: {
				type: String,
				required: false,
				default: ''
			}
		},

		data() {
			return {
				posts: [],
				filteredPosts: []
			}
		},
		components: {
			PostList,
			Searchbar
		},
		metaInfo: {
			title: 'Mrinalini'
		},
		computed: {
			allPosts() {
				return this.$store.state.posts
			}
		},

		methods: {
			...mapActions(['getPosts', 'getCategories']),
			filterByTerm: function(searchTerm) {
				let filteredPosts = this.posts.filter(post => post.node.title.toLowerCase().includes(searchTerm.toLowerCase()))
				return filteredPosts
			},
			filterByTags: function(tags, firstPass) {
				const filtered = []
				firstPass.forEach(post => {
					const postTags = post.node.tags
					const arr1 = []
					for (const tag of postTags) {
						arr1.push(tag.id.toLowerCase())
					}
					const another = tags
					var filteredArray = arr1.filter(callback)
					function callback(el) {
						return another.indexOf(el) >= 0
					}
					if (filteredArray.length === tags.length) {
						filtered.push(post)
					}
				})
				return filtered
			},
			filterPosts: function(term, tags) {
				const firstPass = term.length ? this.filterByTerm(term) : this.posts
				this.filteredPosts = this.filterByTags(tags, firstPass)
			}
		},

		watch: {
			posts: function(newPosts, oldPosts) {
				this.filteredPosts = newPosts
			},
			postCategory: function(newCategory, oldCategory) {
				if (newCategory !== oldCategory) {
					this.posts = !this.edges.length ? this.$page.allPost.edges : this.edges
				}
			},
			postTag: function(oldTag, newTag) {
				this.posts = !this.edges.length ? this.$page.allPost.edges : this.edges
			}
		},

		async mounted() {
			this.posts = !this.edges.length ? await this.$page.allPost.edges : this.edges
			this.getPosts(this.posts)
			this.filteredPosts = this.posts
		}
	}
</script>

<style lang="scss" scoped>
	.title-wrapper {
		padding: 0.5rem;
		.title {
			margin-bottom: 0.7rem;
		}
		.description {
			margin-bottom: 1rem;
			text-align: left;
		}
	}
</style>

<page-query>
  query {
    allPost(sort: [{ by: "date" , order: DESC}, { by: "title", order: ASC }]) {
      totalCount
      edges {
        node {
          id
          title
          date (format: "D MMMM, YYYY")
          path
          tags{name, id, path}
        }
      }
    }
    allCategory {
      totalCount
      edges {
        node {
          id
          path
          name
          description
        }
      }
    }
  }
</page-query>

import Vue from 'vue'
import Vuex from 'vuex'
import geoJson from '@/../content/images/geoJson.json'
import { flattenTags, flattenPosts } from '@/helpers'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tags: [],
		categories: [],
		posts: [],
		currentCategory: [],
		galleryImages: []
	},

	mutations: {
		SET_POSTS(state, posts) {
			state.posts = posts
		},
		SET_CATEGORIES(state, categories) {
			state.categories = categories
		},
		SET_TAGS(state, tags) {
			state.tags = tags
		},
		SET_GALLERY_IMAGES(state, images) {
			state.galleryImages = images
		}
	},

	actions: {
		getPosts({ commit }, data) {
			commit('SET_POSTS', data)
		},
		getTags({ commit }, { tags }) {
			commit('SET_TAGS', flattenTags(tags))
		},
		async getCategories({ commit }, { categories, fetch }) {
			const parsedCategories = {},
				parsedPosts = {}
			for (const category of categories) {
				const catObj = {
					id: category.node.id,
					name: category.node.name,
					path: category.node.path
				}
				parsedCategories[category.node.id] = catObj
				try {
					const posts = await fetch(`/posts/${catObj.id}`)
					parsedPosts[catObj.id] = flattenPosts(posts.data.category.belongsTo.edges)
				} catch (error) {
					console.error(error)
				}
			}
			commit('SET_CATEGORIES', parsedCategories)
			commit('SET_POSTS', parsedPosts) //posts will change based on which category you're in right now
		},
		getGalleryImages({ commit }, { galleryImages }) {
			function getImgUrl(image) {
				return require('@/../content/images/gallery/' + image)
			}
			const images = []
			for (const img of galleryImages) {
				images.push(getImgUrl(img))
			}
			commit('SET_GALLERY_IMAGES', images)
		}
	}
})

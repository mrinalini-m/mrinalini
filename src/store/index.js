import Vue from 'vue'
import Vuex from 'vuex'
import { flattenTags, flattenPosts, getImageUrls } from '~/helpers'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tags: [],
		categories: [],
		posts: [],
		currentCategory: [],
		galleryImages: [],
		galleryThumbnails: [],
		currentMarkers: []
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
		},
		SET_GALLERY_THUMBNAILS(state, images) {
			state.galleryThumbnails = images
		},
		SET_CURRENT_MARKERS(state, currentMarkers) {
			state.currentMarkers = currentMarkers
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
			const images = getImageUrls(galleryImages, 'SET_GALLERY_IMAGES')
			commit('SET_GALLERY_IMAGES', images)
		},

		getGalleryThumbnails({ commit }, { galleryThumbnails }) {
			const images = getImageUrls(galleryThumbnails, 'SET_GALLERY_THUMBNAILS')
			commit('SET_GALLERY_THUMBNAILS', images)
		},
		getCurrentMarkers({ commit }, { currentMarkers }) {
			console.log(currentMarkers)
			commit('SET_CURRENT_MARKERS', currentMarkers)
		}
	}
})

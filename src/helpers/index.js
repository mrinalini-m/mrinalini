function flattenTags(tags) {
	const parsedTags = {}

	for (const tag of tags) {
		const tagObj = {
			id: tag.node.id,
			name: tag.node.name,
			path: tag.node.path
		}
		parsedTags[tag.node.id] = tagObj
	}
	return parsedTags
}

function flattenPosts(posts) {
	const parsedPosts = []
	for (const post of posts) {
		const tags = []
		for (const tag of post.node.tags) {
			tags.push(tag.id.toLowerCase())
		}
		const parsedPost = {
			id: post.node.id,
			path: post.node.path,
			title: post.node.title,
			tags: tags
		}
		parsedPosts.push(parsedPost)
	}
	return parsedPosts
}

function getImageUrls(images, type) {
	const imgSources = [],
		folder = type === 'SET_GALLERY_IMAGES' ? 'gallery' : 'gallery-thumbnails'
	for (const img of images) {
		imgSources.push(`/images/${img}`)
	}
	return imgSources
}

export { flattenTags, flattenPosts, getImageUrls }

function flattenTags(tags) {
	const parsedTags = {}

	for (const tag of tags) {
		const tagObj = {
			id: tag.node.id,
			name: tag.node.name,
			path: tag.node.path,
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
			tags: tags,
		}
		parsedPosts.push(parsedPost)
	}
	return parsedPosts
}

function scrollSidebarActiveIntoView() {
	// TODO: FIX THIS AND DO IT THE RIGHT WAY
	setTimeout(() => {
		const activePost = document.getElementsByClassName('active--exact')
		if (activePost && activePost.length) activePost[0].scrollIntoView()
	}, 200)
}
export { flattenTags, flattenPosts, scrollSidebarActiveIntoView }

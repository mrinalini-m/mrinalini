async function getTags(boundFetch) {
	const parsedTags = {}
	let tags
	try {
		const res = await boundFetch('/tags')
		tags = res.data.allTag.edges
	} catch (error) {
		console.error(error)
	}
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

async function getPosts(boundFetch) {
	let allPosts
	try {
		allPosts = await boundFetch('/posts')
	} catch (error) {
		console.error(error)
	}
	return allPosts
}

function parsePosts(posts) {
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

async function getPostsByCategory(boundFetch) {
	const allPosts = await getPosts(boundFetch)
	const categories = allPosts.data.allCategory.edges
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
			const posts = await boundFetch(`/posts/${catObj.id}`)
			parsedPosts[catObj.id] = parsePosts(posts.data.category.belongsTo.edges)
		} catch (error) {
			console.error(error)
		}
	}
	return { parsedCategories, parsedPosts }
}

async function getAllPosts(boundFetch) {
	const posts = await getPosts(boundFetch),
		allPosts = parsePosts(posts.data.allPost.edges)
	return allPosts
}
export { getTags, getPostsByCategory, getAllPosts }

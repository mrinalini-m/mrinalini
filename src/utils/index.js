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

function parsePosts(posts) {
	const parsedPosts = []
	for (const post of posts) {
		const parsedPost = {
			id: post.node.id,
			path: post.node.path,
			title: post.node.title
		}
		parsedPosts.push(parsedPost)
	}

	return parsedPosts
}

async function getCatsAndPosts(boundFetch) {
	let results
	try {
		results = await boundFetch('/posts')
	} catch (error) {
		console.error(error)
	}
	const categories = results.data.allCategory.edges
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

export { getTags, getCatsAndPosts }

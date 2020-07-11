const createTags = (tags) => {
	const arr = JSON.parse(tags)
	let res = ``
	for (const tag of arr) {
		res += `- ${tag}`
	}
	return res
}

const crateFileContent = (title, date, slug, tags) => {
	const tagsStr = createTags(tags)
	const fileContents = `
---
title: ${title}
date: ${date}
slug: ${slug}
tags:
  - ctci
  ${tagsStr}
category:  problems
---

\`\`\`js
`
	return fileContents
}

const title = process.argv[2],
	date = process.argv[3],
	slug = process.argv[4],
	tags = process.argv[5]

console.log(crateFileContent(title, date, slug, tags))

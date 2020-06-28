const crateFileContent = (title, date, slug) => {
	const fileContents = `
---
title: ${title}
date: ${date}
slug: ${slug}
tags:
  - leetcode
  - tree
category: problems
---

\`\`\`js
`
	return fileContents
}

const title = process.argv[2],
	date = process.argv[3],
	slug = process.argv[4]

console.log(crateFileContent(title, date, slug))

const crateFileContent = (title, date, slug, tags, link, js) => {
	const fileContents = `---
title: ${title}
link: '${link}'
date: ${date}
slug: ${slug}
tags:
  - interview-cake
  - algorithms
  ${tags}
category: problems
---

<!-- embed:${js} -->`
	return fileContents
}

const title = process.argv[2],
	date = process.argv[3],
	slug = process.argv[4],
	tags = process.argv[5],
	link = process.argv[6],
	js = process.argv[7]

console.log(crateFileContent(title, date, slug, tags, link, js))

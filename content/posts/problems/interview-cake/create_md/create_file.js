const exec = require('child_process').exec
const allProblems = require('./problems.json')

const createFilename = (str, chap, number) => {
	let filename = chap ? `${chap}.` : ''
	filename += number ? `0${number}_` : ''
	const arr = str.toLowerCase().split(' ')

	return `${filename}${arr.join('_')}`
}

const createTagsStr = (tagsArr) => {
	return !tagsArr ? '' : '- ' + tagsArr.join('\n  - ')
}

const chapNo = process.argv[2]
const problems = allProblems[chapNo].problems

for (const problem of problems) {
	const filename = createFilename(problem.title, chapNo, problem.number)
	const file = filename + '.md'

	const chap = `0${chapNo}`,
		number = `0${problem.number}`,
		chapName = 'Hashing and hash tables'

	const title = `${chap}-${number} - ${problem.title} [Interview Cake] [${chapName}]`,
		date = '2020-05-29',
		tags = createTagsStr(problem.tags),
		slug = `ic-${chap}-${number}-${problem.title
			.toLowerCase()
			.split(' ')
			.join('-')}`,
		link = problem.link,
		js = filename + '.js'
	exec(
		`touch ${file} && node ./../create_md/file_content.js "${title}" "${date}" "${slug}" "${tags}" "${link}" "${js}" > ${file}`
	)
}

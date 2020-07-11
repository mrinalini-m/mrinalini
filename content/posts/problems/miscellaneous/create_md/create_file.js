const exec = require('child_process').exec

const others = ['to', 'a', 'an', 'the'],
	prepositions = [
		'at',
		'by',
		'down',
		'for',
		'from',
		'in',
		'into',
		'like',
		'near',
		'of',
		'off',
		'on',
		'onto',
		'over',
		'past',
		'to',
		'upon',
		'with',
	],
	conjunctions = [
		'and',
		'as',
		'but',
		'for',
		'if',
		'nor',
		'once',
		'or',
		'so',
		'than',
		'that',
		'till',
		'when',
		'yet',
	]

const lowercase = new Set([...others, ...prepositions, ...conjunctions])

const getName = (str) => {
	str = str.replace('.js', '')

	const arr = str.split('_'),
		// num = Number(arr.shift()),
		split = []

	arr.shift()

	for (const word of arr) {
		lowercase.has(word)
			? split.push(word)
			: split.push(word[0].toUpperCase() + word.slice(1))
	}
	return split
}

const convertToMd = (js) => {
	return js.replace('.js', '.md')
}

const getSlug = (name) => {
	const slug = name.join('-').toLowerCase()
	return slug
}

const name = getName(process.argv[2])
//, num = name.shift()

const title = `${name.join(' ')}`,
	date = '2020-06-16',
	slug = getSlug(name),
	fileName = convertToMd(process.argv[2])

exec(
	`touch ${fileName} && code ${fileName} && node create_md/file_content.js "${title}" "${date}" "${slug}" > ${fileName} && cat ${process.argv[2]} >> ${fileName} && node create_md/end.js >> ${fileName} && rm ${process.argv[2]}`
)

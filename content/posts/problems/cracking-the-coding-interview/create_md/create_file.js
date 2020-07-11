const exec = require('child_process').exec

const getName = (str) => {
	let arr = str.split('.')

	arr.pop()

	arr = arr.join('_').split('_')
	const split = []

	for (const word of arr) {
		split.push(word[0].toUpperCase() + word.slice(1))
	}
	return split
}

const convertToMd = (js) => {
	return js.replace('.js', '.md')
}
const name = getName(process.argv[2]),
	ch = `${name.shift()}`,
	no = name.shift(),
	lowerCase = []

for (const word of name) {
	lowerCase.push(word.toLowerCase())
}
const title = `${no} - ${name.join(' ')} [Cracking the Coding Interview]`,
	date = '2020-04-20',
	tags = JSON.stringify(['"tree"']),
	slug = `ctci-${ch}-${no}-${lowerCase.join('-')}`,
	fileName = convertToMd(process.argv[2])

exec(
	`touch ${fileName} && code ${fileName} && node ./../create_md/file_content.js "${title}" "${date}" "${slug}" "${tags}" > ${fileName} && cat ${process.argv[2]} >> ${fileName} && node ./../create_md/end.js >> ${fileName} && rm ${process.argv[2]}`
)

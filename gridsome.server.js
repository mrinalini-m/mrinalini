module.exports = function(api) {
	api.loadSource(async store => {
		store.addMetadata('links', [
			{
				type: 'email',
				name: 'sam@mrinalini.dev',
				url: 'sam@mrinalini.dev'
			},
			{
				type: 'linkedin',
				name: 'mrinalini-m',
				url: 'http://linkedin.com/in/mrinalini-m'
			},
			{
				type: 'github',
				name: 'mrinalini-m',
				url: 'http://github.com/mrinalini-m'
			}
		])
	})
}

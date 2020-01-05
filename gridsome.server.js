module.exports = function(api) {
	api.loadSource(async store => {
		store.addMetadata('links', {
			email: {
				name: 'sam@mrinalini.dev',
				url: 'sam@mrinalini.dev'
			},
			linkedin: {
				name: 'mrinalini-m',
				url: 'http://linkedin.com/in/mrinalini-m'
			},
			github: {
				name: 'mrinalini-m',
				url: 'http://github.com/mrinalini-m'
			}
		})
	})
}

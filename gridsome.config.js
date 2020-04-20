const shiki = require('shiki'),
	mtc = shiki.loadTheme(
		'./src/assets/styles/material-theme-darker-high-contrast-custom.json'
	)

module.exports = {
	siteName: 'Sam Mrinalini',

	plugins: [
		{
			use: 'gridsome-plugin-sass-resources-loader',
			options: {
				resources: '@/assets/styles/_variables.scss',
			},
		},

		{
			use: '@gridsome/vue-remark',
			options: {
				typeName: 'Post',
				baseDir: './content/posts/',
				template: './src/templates/Post.vue',
				route: '/posts/:slug',
				refs: {
					tags: 'Tag',
					category: 'Category',
				},

				plugins: [
					['gridsome-remark-embed-snippet'],
					['gridsome-plugin-remark-shiki', { theme: mtc, skipInline: true }],
				],
			},
		},

		{
			use: '@gridsome/source-filesystem',
			options: {
				path: 'content/tags/**/*.md',
				typeName: 'Tag',
			},
		},

		{
			use: '@gridsome/source-filesystem',
			options: {
				path: 'content/categories/**/*.md',
				typeName: 'Category',
			},
		},
	],

	templates: {
		Tag: '/tags/:id',
		Category: '/posts/:id',
	},
}

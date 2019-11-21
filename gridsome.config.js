// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Mrinalini',
  plugins: [
    {
      use: 'gridsome-plugin-sass-resources-loader',
      options: {
        resources: '@/assets/styles/_variables.scss'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: 'Tag',
          categories: 'Category'
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/tags/**/*.md',
        typeName: 'Tag'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/categories/**/*.md',
        typeName: 'Category'
      }
    }
  ],
  templates: {
    Post: '/posts/:title',
    Tag: '/tags/:name',
    Category: '/categories/:name'
  },
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: ['@gridsome/remark-prismjs']
    }
  }
}

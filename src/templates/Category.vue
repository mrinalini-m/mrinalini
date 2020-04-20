<template>
	<Posts
		:postCategory="this.$page.category.id"
		:showPosts="true"
		:edges="$page.category.belongsTo.edges"
		:title="$page.category.name"
		:description="$page.category.description"
		:link="$page.category.link"
	/>
</template>

<script>
	import Posts from '~/pages/Index'
	export default {
		components: {
			Posts
		}
	}
</script>

<page-query>
query ($id: ID!) {
  category(id: $id) {
		id
    name
    description
    link
    belongsTo(sort: [{ by: "date" , order: DESC}, { by: "title", order: ASC }]) {
      edges {
        node {
          ... on Post {
            id
            title
						date (format: "D MMMM, YYYY")
            path
						tags{name, path, id}
          }
        }
      }
    }
  }
}
</page-query>

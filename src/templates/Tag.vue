<template>
	<Posts
		:showTags="true"
		:showCategories="false"
		:edges="$page.tag.belongsTo.edges"
		:title="$page.tag.name"
		:postTag="$page.tag.id"
		:description="$page.tag.description"
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
  tag(id: $id) {
    name
		id
    description
    belongsTo {
      edges {
        node {
          ... on Post {
            id
            title
            path
						date (format: "D MMMM, YYYY")
						tags{name, id, path}
          }
        }
      }
    }
  }
	allPost(filter: { tags: { contains : ["css", "animation"]}}) {
		totalCount
		edges {
			node {
				id
				title
				date (format: "D MMMM, YYYY")
				path
				tags{name, id, path}
			}
		}
	}
}
</page-query>

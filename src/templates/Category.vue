<template>
	<div class="post-list-wrapper">
		<PostsLayout :postCategory="this.$page.category.id">
			<h3>{{ $page.category.name }}</h3>
			<p>{{ $page.category.description }}</p>
			<PostList
				v-for="edge in $page.category.belongsTo.edges"
				:key="edge.node.id"
				:post="edge.node"
			/>
		</PostsLayout>
	</div>
</template>

<script>
	import PostList from '@/components/PostList'
	export default {
		components: {
			PostList
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		text-align: center;
		font-size: 30px;
		padding: 2em 0;
	}

	.date {
		font-size: 16px;
		font-weight: 400;
	}

	.content {
		font-size: 20px;
	}
</style>

<page-query>
query ($id: ID!) {
  category(id: $id) {
		id
    name
    description
    belongsTo {
      edges {
        node {
          ... on Post {
            id
            title
						date (format: "D MMMM YYYY")
            path
						tags{name, path}
          }
        }
      }
    }
  }
  
}
</page-query>

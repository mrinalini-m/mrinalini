<template>
	<PostsLayout :postCategory="this.$page.category.id" :showPosts="true">
		<header class="title-wrapper">
			<h4 class="title">{{ $page.category.name }}</h4>
			<p class="description">{{ $page.category.description }}</p>
		</header>
		<PostList
			v-for="edge in $page.category.belongsTo.edges"
			:key="edge.node.id"
			:post="edge.node"
		/>
	</PostsLayout>
</template>

<script>
	import PostList from '@/components/PostList'
	export default {
		components: {
			PostList
		}
	}
</script>

<style lang="scss">
	.title-wrapper {
		padding: 0.5rem;
		.title {
			margin-bottom: 0.7rem;
		}
		.description {
			margin-bottom: 1.5rem;
			text-align: left;
		}
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

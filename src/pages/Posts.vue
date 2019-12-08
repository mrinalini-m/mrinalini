<template>
	<PostsLayout :links="$page.allCategory.edges">
		<section class="posts">
			<PostList
				v-for="edge in $page.allPost.edges"
				:key="edge.node.id"
				:post="edge.node"
			/>
		</section>
	</PostsLayout>
</template>

<script>
	import PostList from '@/components/PostList'
	export default {
		components: {
			PostList
		},
		metaInfo: {
			title: 'Mrinalini'
		}
	}
</script>

<style></style>

<page-query>
  query {
    allPost {
      totalCount
      edges {
        node {
          id
          title
          timeToRead
          date (format: "D MMMM YYYY")
          path
          tags{name}
        }
      }
    }
    allCategory {
      totalCount
      edges {
        node {
          id
          path
          name
          description
        }
      }
    }
  }
</page-query>

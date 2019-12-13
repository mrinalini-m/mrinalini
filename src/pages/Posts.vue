<template>
	<PostsLayout :showCategories="true">
		<section class="posts">
			<header class="title-wrapper">
				<h4 class="title">All Posts</h4>
			</header>
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

<page-query>
  query {
    allPost {
      totalCount
      edges {
        node {
          id
          title
          date (format: "D MMMM YYYY")
          path
          tags{name, path}
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

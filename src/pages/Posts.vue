<template>
	<div class="post-list-wrapper">
		<PostsLayout>
			<section class="posts">
				<PostList
					v-for="edge in $page.allPost.edges"
					:key="edge.node.id"
					:post="edge.node"
				/>
			</section>
		</PostsLayout>
	</div>
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

<style>
	.post-list-wrapper {
		background-color: #f5f5f5;
	}
</style>

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

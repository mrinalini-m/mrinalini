<template>
	<PostsLayout :showTags="true">
		<section class="posts">
			<header class="title-wrapper">
				<h4 class="title">{{ $page.tag.name }}</h4>
			</header>
			<PostList
				v-for="edge in $page.tag.belongsTo.edges"
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
		}
	}
</script>

<page-query>
query ($id: ID!) {
  tag(id: $id) {
    name
    belongsTo {
      edges {
        node {
          ... on Post {
            id
            title
            path
						date (format: "D MMMM YYYY")
						tags{name, path}
          }
        }
      }
    }
  }
}
</page-query>

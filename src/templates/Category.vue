<template>
	<PostsLayout>
		<h1>{{ $page.category.name }}</h1>
		<p>{{ $page.category.description }}</p>
		<ul>
			<li v-for="edge in $page.category.belongsTo.edges" :key="edge.node.id">
				<g-link :to="edge.node.path">
					{{ edge.node.title }}
				</g-link>
			</li>
		</ul>
	</PostsLayout>
</template>

<page-query>
query ($id: ID!) {
  category(id: $id) {
    name
    description
    belongsTo {
      edges {
        node {
          ... on Post {
            id
            title
            path
          }
        }
      }
    }
  }
  
}
</page-query>

<style lang="scss" scoped>
	.title {
		text-align: center;
		font-size: 30px;
		line-height: 10px;
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

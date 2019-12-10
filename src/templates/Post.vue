<template>
	<PostsLayout :postCategory="this.$page.post.category.id">
		<div class="title">
			<h3>{{ $page.post.title }}</h3>
			<div class="post-meta">
				<p class="date">
					{{ $page.post.date }}
				</p>
				<div class="tag-container">
					<g-link
						v-for="tag in $page.post.tags"
						:key="tag.id"
						:to="tag.path"
						class="link"
					>
						{{ tag.name.toLowerCase() }}
					</g-link>
				</div>
			</div>
			<p v-html="$page.post.content" />
		</div>
	</PostsLayout>
</template>

<page-query>
query Post ($path: String!) {
   post: post (path: $path) {
    id
    title
    content
    date (format: "D MMMM, YYYY")
    timeToRead
    tags{name, path}
		category{id, name}
  }
}
</page-query>

<style lang="scss" scoped>
	.title {
		text-align: center;
		padding-bottom: 2rem;
	}

	.post-meta {
		text-align: start;
		.date {
			font-size: 0.8rem;
			font-weight: 400;
			margin-bottom: 0.75rem;
		}
	}
</style>

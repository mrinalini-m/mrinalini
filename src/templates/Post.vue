<template>
	<Layout :postCategory="this.$page.post.category.id" :showPosts="true">
		<h1 class="post-title">{{ $page.post.title }}</h1>

		<div class="post-meta">
			<div class="date">
				{{ $page.post.date }}
			</div>
			<ul class="tag-container">
				<g-link
					v-for="tag in $page.post.tags"
					:key="tag.id"
					:to="tag.path"
					class="link"
				>
					{{ tag.name.toLowerCase() }}
				</g-link>
			</ul>
		</div>
    <p class="link-wrapper" v-if="$page.post.link">
			<a :href="$page.post.link">Problem Link</a>
		</p>
		<VueRemarkContent class="post-content" />
		<!-- <div class="post-content" v-html="$page.post.content" /> -->
	</Layout>
</template>

<style lang="scss" scoped>
	.post {
		background-color: red;
	}
	.post-title {
		font-size: 1.9rem;
	}
  .link-wrapper {
    text-align: start;
    font-size: 1.125rem;
    margin-top: 1.5rem;
  }
	.post-meta {
		text-align: start;
		.date {
			font-size: 0.8rem;
			font-weight: 400;
			margin-bottom: 0.75rem;
		}
	}
	.post-content {
		margin-top: 2rem;
		text-align: left;
	}
</style>

<page-query>
query Post ($path: String!) {
  post (path: $path) {
    id
    title
    link
    content
    date (format: "D MMMM, YYYY")
    tags{name, id, path}
		category{id, name}
  }
}
</page-query>

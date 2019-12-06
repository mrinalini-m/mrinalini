<template>
	<Layout>
		<div class="title">
			<h1>{{ $page.post.title }}</h1>
			<div class="post-meta">
				<p class="date">
					{{ $page.post.date }}
				</p>
				<ul class="tag-container">
					<li>
						<g-link
							v-for="tag in $page.post.tags"
							:key="tag.id"
							:to="tag.path"
							class="link"
						>
							{{ tag.name.toLowerCase() }}
						</g-link>
					</li>
				</ul>
			</div>
			<p v-html="$page.post.content" />
		</div>
	</Layout>
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
  }
}
</page-query>

<style lang="scss">
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

	code[class*='language-'],
	pre[class*='language-'],
	pre {
		::selection {
			background: rgba(150, 150, 150, 0.3) !important;
		}
		code {
			font-family: $code-font-family;
			font-size: 13px;
			direction: ltr;
			text-align: left;
			white-space: pre-wrap;
			word-spacing: normal;
			word-break: normal;
			line-height: 1.7;
			font-weight: 400;
			margin: 2rem 0;
			tab-size: 2;
			hyphens: none;
			-webkit-font-smoothing: antialiased;
			display: block;
			padding: 1.5rem;
			overflow: auto;
			border: 0;
			box-shadow: 2px 4px 25px rgba(0, 0, 0, 0.15);
		}
	}
</style>

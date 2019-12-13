<template>
	<div class="post">
		<g-link :to="post.path" class="post-link">
			<h5 class="title">{{ post.title }}</h5>
			<div class="post-meta">
				<p class="date">
					{{ post.date }}
				</p>
				<ul class="tag-container">
					<li>
						<g-link
							v-for="tag in post.tags"
							:key="tag.id"
							:to="tag.path"
							class="link"
						>
							{{ tag.name.toLowerCase() }}
						</g-link>
					</li>
				</ul>
			</div>
		</g-link>
	</div>
</template>

<script>
	export default {
		props: ['post']
	}
</script>

<style lang="scss" scoped>
	.post:first-of-type {
		margin-top: 0.75rem;
	}
	.post:last-of-type {
		border-bottom: $border;
	}
	.post {
		border: 1px solid transparent;
		border-top: $border;
		margin-bottom: -1px;
		transition: backgroundo-color 0.2s ease, border 0.2s ease;

		&:hover {
			border: $border;
			border-radius: $border-radius;
			background-color: $background-secondary;
			+ .post {
				border-top: 1px solid transparent;
			}
		}
		.post-link {
			display: flex;
			flex-direction: column;
			padding: 0.75rem 1.5rem;
			.title {
				line-height: normal;
				margin-bottom: 0.2rem;
				text-align: left;
			}
			.tag-container {
				a {
					padding: 3px 6px;
				}
			}
		}

		text-align: left;
		.date {
			font-size: 0.8rem;
			font-weight: 500;
			color: $post-meta;
			margin-bottom: 0.5rem;
		}
	}
	@include medium-breakpoint {
		.post {
			.post-link {
				padding: 0.75rem 1rem;
			}
		}
	}
</style>

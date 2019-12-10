<template>
	<Card class="post">
		<g-link :to="post.path" class="post-link">
			<div class="flex-col-1">
				<h4 class="title">{{ post.title }}</h4>
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
			</div>
		</g-link>
	</Card>
</template>

<script>
	import Card from '../common/Card'
	export default {
		components: {
			Card
		},
		props: ['post']
	}
</script>

<style lang="scss" scoped>
	.card {
		padding: 0;
		.post-link {
			display: flex;
			padding: 0.75rem 1.5rem;
			.title {
				line-height: normal;
				margin-bottom: 0.5rem;
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
			font-weight: 400;
			color: $gray-medium;
			margin-bottom: 0.5rem;
		}
	}
	@include medium-breakpoint {
		.card {
			margin-bottom: 1rem;
			.post-link {
				padding: 0.75rem 1rem;
			}
		}
	}
</style>

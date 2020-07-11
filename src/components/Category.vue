<template>
	<div class="category">
		<hr class="line" />
		<g-link :to="category.path" class="read">{{ category.name }}</g-link>
		<p class="description">{{ category.description }}</p>
	</div>
</template>

<script>
	export default {
		props: ['category'],
	}
</script>

<style lang="scss" scoped></style>

<template>
	<div class="card">
		<slot />
	</div>
</template>

<script>
	export default {
		name: 'card'
	}
</script>

<style lang="scss" scoped>
	.card {
		background-color: rgb(255, 255, 255);
		border-radius: $border-radius;
		box-shadow: $box-shadow;
		box-sizing: border-box;
		padding: 24px 16px;
		transition: box-shadow $transition;
		margin-bottom: 1.5rem;
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>

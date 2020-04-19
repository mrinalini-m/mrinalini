<template>
	<footer>
		<p>© Mrinalini Manandhar {{ currYear }}</p>
	</footer>
</template>
<script>
	export default {
		name: 'custom-footer',
		data() {
			return {
				currYear: new Date().getFullYear(),
			}
		},
	}
</script>
<style lang="scss" scoped>
	footer {
		padding: 1.5rem;
		text-align: center;

		p {
			display: inline-block;
			margin: 0 auto;
			padding: 0.5rem;
			font-size: 1rem;
			letter-spacing: 1px;
		}
	}
</style>

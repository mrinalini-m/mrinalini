<template>
	<button
		type="button"
		@click="toggleMenu()"
		class="navbar-toggle"
		v-bind:class="{ open: opened }"
	>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
	</button>
</template>

<script>
	export default {
		name: 'mobile',
		data() {
			return { opened: false }
		},
		methods: {
			toggleSidebar() {
				this.$root.$emit('toggle-sidebar', this.opened)
			},
			toggleMenu() {
				this.opened = !this.opened
				this.toggleSidebar()
			},
		},
	}
</script>

<style lang="scss">
	.navbar-toggle {
		align-items: flex-start;
		background-image: none;
		color: $secondary-dark;
		cursor: pointer;
		display: block;
		font-size: 14px;
		font-weight: 400;
		letter-spacing: normal;
		line-height: 20px;
		margin: 14px 0 14px 8px;
		padding: 9px 5px;
		position: absolute;
		top: 0;
	}
	.icon-bar {
		border-radius: 1px;
		color: $secondary-dark;
		cursor: pointer;
		transition: 0.4s all ease;
		font-weight: 400;
		height: 2px;
		font-size: 14px;
		letter-spacing: normal;
		display: block;
		background-color: $secondary-dark;
		line-height: 20px;
		margin-top: 4px;
		text-align: center;
		width: 22px;
	}

	@media (min-width: 900px) {
		.navbar-toggle {
			display: none;
		}
	}

	.navbar-toggle .icon-bar {
		-webkit-transition: 0.4s all;
		-o-transition: 0.4s all;
		transition: 0.4s all;
	}
	.navbar-toggle.open .icon-bar {
		width: 20px;
	}
	.navbar-toggle.open .icon-bar:first-child {
		transform: rotate(44deg) translateY(4px) translateX(4px);
	}
	.navbar-toggle.open .icon-bar:nth-child(2) {
		opacity: 0;
		width: 0;
	}
	.navbar-toggle.open .icon-bar:last-child {
		transform: rotate(-44deg) translateY(-5px) translateX(4px);
	}
</style>

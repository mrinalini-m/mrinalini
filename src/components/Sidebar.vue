<template>
	<div class="sidebar">
		<nav class="menu-button" :style="[menuWidth]">
			<template v-if="links.length">
				<a v-for="link in links" :key="link.id" :href="link.url">{{
					link.text
				}}</a>
			</template>
			<slot v-else />
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'slider',
		props: {
			width: {
				type: Number,
				required: false,
				default: 250
			},

			links: {
				type: Array,
				required: false,
				default: () => []
			}
		},
		data() {
			return {
				menuWidth: {
					width: this.width + 'px'
				},
				marginLeft: this.width + 'px'
			}
		},
		computed: {
			mainContent() {
				return document.getElementById('main-content')
			}
		},
		mounted() {
			this.mainContent.style['margin-left'] = this.marginLeft
		}
	}
</script>

<style lang="scss" scoped>
	.menu-button {
		height: 100%;
		width: 0;
		position: fixed;
		left: 0;
		z-index: 1;
		top: 0;
		background: palevioletred;
		overflow-x: hidden;
		padding-top: 60px;
		transition: 0.5s;
		margin-top: 40px;
		a {
			padding: 8px 8px 8px 32px;
			text-decoration: none;
			font-size: 25px;
			display: block;
			transition: 0.3s;
		}
		.closebtn {
			position: absolute;
			top: 0;
			right: 25px;
			font-size: 36px;
			margin-left: 50px;
		}
	}
	.hamburger-icon {
		position: relative;
		top: -50px;
		float: left;
		z-index: 20;
	}
	@media screen and (max-height: 450px) {
		.menu-button {
			padding-top: 15px;
			a {
				font-size: 18px;
			}
		}
	}
</style>

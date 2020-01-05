<template>
	<li
		v-if="link"
		:style="{ gridArea: link.type }"
		@click="handleClick($event)"
		@mouseenter="showHideElement($refs.copy, true)"
		@mouseleave="showHideElement($refs.copy, false)"
	>
		<a class="nav-link" :href="link.url">
			<span v-if="link.type === 'email'" ref="tooltip" class="tool-tip-text">
				{{ tooltipText }}
			</span>
			<img :alt="link.type" class="link-svg" :src="`/images/${link.type}.svg`" />
		</a>
		<a ref="copy" class="hidden" :href="`mailto:${link.url}`">
			{{ link.name }}
		</a>
		<input type="text" :value="link.name" ref="copyFail" />
	</li>
</template>

<script>
	export default {
		data() {
			return {
				isClicked: false,
				tooltipText: 'Click to copy',
				clipBoard: '',
				isFirefox: typeof InstallTrigger !== 'undefined',
				isChrome: !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
			}
		},

		props: {
			link: {
				type: Object,
				required: false,
				default: () => {}
			}
		},

		methods: {
			setClipboard(text) {
				let data = new DataTransfer()
				data.items.add('text/plain', text)
				const vm = this
				navigator.clipboard.writeText(data.items[0].type).then(
					function() {
						vm.isClicked = !vm.isClicked
						vm.tooltipText = 'Copied!'
					},
					function() {
						vm.isClicked = !vm.isClicked
					}
				)
			},

			handleClick(e) {
				if (this.link.type === 'email') {
					e.preventDefault()
					if (!this.isFirefox && !this.isChrome) {
						this.$refs.copyFail.select()
						document.execCommand('copy')
						this.tooltipText = 'Copied!'
						return
					}
					const data = new DataTransfer()
					data.items.add('text/plain', this.$refs.copy.innerText)
					this.setClipboard(this.$refs.copy.innerText)
				}
			},

			showHideElement(element, open) {
				element.style.height = element.scrollHeight + 'px'
				element.classList.toggle('open', open)
				const tooltip = this.$refs.tooltip
				if (open) {
					if (tooltip) {
						tooltip.style.opacity = 1
						tooltip.style.visibility = 'visible'
					}
				} else {
					if (tooltip) {
						tooltip.style.opacity = 0
						tooltip.style.visibility = 'hidden'
					}
					window.setTimeout(() => {
						this.isClicked = false
						element.style.removeProperty('height')
					}, 7)
					window.setTimeout(() => {
						//to persist the 'copied' until  the tool tip is not visible
						this.tooltipText = 'Click To Copy'
					}, 500)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hidden {
		display: inline-block;
		height: 0;
		overflow: hidden;
		transition: height 0.25s ease-out;
	}

	.hidden.open {
		height: max-content;
	}

	li {
		display: flex;
		text-align: center;
		flex-direction: column;
	}

	a.hidden {
		border: none;
		overflow: auto;
		padding: 0;
		resize: none;
		cursor: pointer;
	}

	a.nav-link {
		.tool-tip-text {
			visibility: hidden;
			width: 120px;
			background-color: rgba(0, 0, 0, 0.8);
			text-align: center;
			border-radius: 6px;
			padding: 5px 0;
			position: absolute;
			z-index: 1;
			bottom: 125%;
			left: 50%;
			margin-left: -60px;
			opacity: 0;
			transition: 0.4s ease;
			color: white;

			&::after {
				content: '';
				position: absolute;
				top: 100%;
				left: 50%;
				margin-left: -5px;
				border-width: 5px;
				border-style: solid;
				border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
			}
		}

		position: relative;
		display: inline-block;
		vertical-align: middle;
		img {
			height: 2rem;
			width: 2rem;
		}
	}

	input {
		border: none;
		padding: 0;
		margin: 0;
		height: 1px;
		width: 1px;
		opacity: 0;
	}
</style>

<template>
	<div class="resize-observer">
		<div class="box" ref="box">
			<h4>Resize Me</h4>
			<p>
				width: <span class="size">{{ width }}</span>
			</p>
			<p>
				height: <span class="size">{{ height }}</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				width: null,
				height: null,
				observer: null,
			}
		},

		mounted() {
			const box = this.$refs.box,
				boxSize = box.getBoundingClientRect()

			this.width = boxSize.width + 'px'
			this.height = boxSize.height + 'px'
			// initialize the observer on mount
			this.initObserver()
		},

		//disconnect the observer before destroy
		beforeDestroy() {
			if (this.observer) this.observer.disconnect()
		},

		methods: {
			// Resize handler
			onResize() {
				const box = this.$refs.box,
					vm = this
				let { width, height } = box.style

				this.width = width
				this.height = height
				// Optionally, emit event with dimensions
				this.$emit('resize', { width, height })
			},

			initObserver() {
				const config = {
						attributes: true,
					},
					vm = this

				// create the observer
				const observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						// check if the mutation is attributes and
						// update the width and height data if it is.
						if (mutation.type === 'attributes') {
							// call resize handler on mutation
							vm.onResize()
						}
					})
				})

				// observe element's specified mutations
				observer.observe(this.$refs.box, config)
				// add the observer to data so we can disconnect it later
				this.observer = observer
			},
		},
	}
</script>

<style lang="scss" scoped>
	.resize-observer {
		text-align: center;

		h4 {
			margin-top: 30px;
			text-align: center;
		}

		.box {
			box-sizing: border-box;
			width: 210px;
			height: 210px;
			border: 2px solid red;
			padding: 10px;
			margin: 0 auto;
			resize: both;
			overflow: auto;
		}
		.size {
			color: #2a9966;
			font-weight: 600;
		}
	}
</style>

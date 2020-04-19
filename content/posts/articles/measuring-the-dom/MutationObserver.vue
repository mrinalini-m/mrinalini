<template>
	<div class="resize-observer">
		<section>
			<!-- more info on refs: https://vuejs.org/v2/api/#ref -->
			<div class="box" ref="box">
				<h4>Resize Me</h4>
				<p>
					<span>width: </span><span class="size">{{ width }}</span>
				</p>
				<p>
					<span>height: </span><span class="size">{{ height }}</span>
				</p>
			</div>
		</section>
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
			//get initial dimensions. Mutation observer will observe mutations only
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
				// emit event with dimensions
				// More info on emitting custom events --> https://vuejs.org/v2/guide/components-custom-events.html
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
						// check if the mutation is attributes and update the width and height data if it is.
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
		section {
			h4 {
				margin-top: 30px;
				text-align: center;
			}
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

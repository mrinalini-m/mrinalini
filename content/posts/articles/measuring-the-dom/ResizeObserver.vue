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
			// initialize the observer on mount
			this.initObserver()
		},

		//unobserve before destroy
		beforeDestroy() {
			if (this.observer) this.observer.unobserve(this.$refs.box)
		},

		methods: {
			onResize() {
				const box = this.$refs.box,
					width = this.$refs.box.offsetWidth + 'px',
					height = this.$refs.box.offsetHeight + 'px'

				this.width = width
				this.height = height

				this.$emit('resize', { width, height })
			},
			initObserver() {
				const observer = new ResizeObserver(this.onResize)
				observer.observe(this.$refs.box)
				this.observer = observer
			},
		},
	}
</script>

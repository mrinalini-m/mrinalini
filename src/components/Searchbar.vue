<template>
	<div
		class="input-form-control"
		:class="[{ focused: isFocused }, { 'not-empty': !empty }]"
	>
		<label ref="label" class="outlined-label" for="search">Search Posts</label>
		<div class="outlined-input-wrapper">
			<input
				type="text"
				class="outlined-input"
				autocomplete="off"
				@input="onInput"
				@focus="onFocus"
				@blur="onBlur"
				v-model="searchTerm"
				name="searchTerm"
				id="search"
				placeholder=""
			/>
			<fieldset aria-hidden="true" class="outlined-input-fieldset">
				<legend class="input-legend" :style="[focusedLabelWidth]">
					<span>​</span>
				</legend>
			</fieldset>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'searchbar',
		data() {
			return {
				searchTerm: '',
				focusedLabelWidth: { width: '0.1px' },
				calculatedWidth: { width: '0.1px' },
				isFocused: false,
				empty: true
			}
		},

		methods: {
			onInput(event) {
				this.$emit('filter', this.searchTerm)
				this.empty = this.searchTerm.length === 0 ? true : false
			},
			onFocus(event) {
				this.focusedLabelWidth = this.calculatedWidth
				this.isFocused = true
				this.empty = this.searchTerm.length === 0 ? true : false
			},
			onBlur(event) {
				this.focusedLabelWidth = { width: '0.1px' }
				this.isFocused = false
				this.empty = this.searchTerm.length === 0 ? true : false
				if (!this.empty) this.focusedLabelWidth = this.calculatedWidth
			}
		},
		mounted() {
			const width = this.$refs.label.getBoundingClientRect().width * 0.75 + 8
			this.calculatedWidth = { width: width + 'px' }
		}
	}
</script>

<style lang="scss" scoped>
	$transition: getTransition(0.2s);
	:focus {
		outline: none;
	}
	.searchbar {
		text-align: start;
	}

	.input-form-control {
		display: inline-flex;
		position: relative;
		flex-direction: column;
		vertical-align: top;
		width: 95%;
		margin: 0 0.5rem 2rem 0.5rem;

		&.not-empty,
		&.focused {
			.outlined-label {
				transform: translate(14px, -6px) scale(0.75);
			}
			.outlined-input-wrapper {
				.outlined-label {
					outline: 0;
				}
				.outlined-input-fieldset {
					border-width: 2px;
					padding-left: 8px;
				}
			}
		}
		&.focused {
			.outlined-label {
				color: $primary;
			}
			.outlined-input-wrapper {
				.outlined-input-fieldset {
					border-color: $primary;
				}
			}
		}

		.outlined-label {
			z-index: 1;
			transform: translate(14px, 20px) scale(1);
			pointer-events: none;
			transition: color $transition, transform $transition;
			top: 0;
			left: 0;
			position: absolute;
			display: block;
			transform-origin: top left;
			color: rgba(0, 0, 0, 0.54);
			padding: 0;
			font-size: 1rem;
			font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
			font-weight: 400;
			line-height: 1;
			letter-spacing: 0.00938em;
		}

		.outlined-input-wrapper {
			position: relative;
			border-radius: 4px;
			color: rgba(0, 0, 0, 0.87);
			cursor: text;
			display: inline-flex;
			position: relative;
			font-size: 1rem;
			box-sizing: border-box;
			align-items: center;
			font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
			line-height: 1.1875em;
			font-weight: 400;
			letter-spacing: 0.01071em;

			.outlined-input {
				font: inherit;
				color: currentColor;
				width: 100%;
				border: 0;
				height: 1.1875em;
				margin: 0;
				display: block;

				min-width: 0;
				background: none;
				box-sizing: content-box;
				animation-name: MuiInputBase-keyframes-auto-fill-cancel;
				padding: 18.5px 14px;
			}

			.outlined-input-fieldset {
				padding-left: 34.875px;
				border-color: rgba(0, 0, 0, 0.23);
				top: -5px;
				left: 0;
				right: 0;
				bottom: 0;
				margin: 0;
				padding: 0;
				position: absolute;
				transition: padding-left $transition, border-color $transition,
					border-width $transition;
				border-style: solid;
				border-width: 1px;
				border-radius: inherit;
				pointer-events: none;

				.input-legend {
					padding: 0;
					text-align: left;
					transition: width $transition;
					line-height: 11px;
				}
			}
		}
	}
</style>

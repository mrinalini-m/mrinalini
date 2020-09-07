---
title: 'Measuring a changing DOM element'
date: 2020-09-06
slug: 'measuring-a-changing-dom-element'
tags:
  - html
  - css
  - javascript
  - vue
category: articles
---

import Measure from './MutationObserver.vue'

There is something like the window's `onresize` event listener but for DOM elements. It's called [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) and makes measuring dynamic elements very easy. The only problem is it's not standard. 😑 It's been in the editor's draft list for years. Almost all browsers support it. Safari started supporting it since 13.1 but Internet Explorer and Firefox android still don't support it. So... is there another way to measure a changing element other than a `setInterval`? Enter [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

Here's a demo of the code that will be explained below:

<Measure/>

<p></p>

### The `<template>` or HTML part

```vue
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
```

We'll be resizing the `div` element with class "box" by giving it a css property `resize: both`. This will give the rendered box a small triangle on the bottom-right corner that allows for resizing.

Since we'll need access to the actual HTML element and its changing dimensions, we'll be using a `ref`. You can read more about refs [here](https://vuejs.org/v2/api/#ref).

### The `<script>` Code for Resizing with `MutationObserver`

```vue
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
```

We'll add the `width`, `height` and the `observer` to our state. Then when the component is mounted, we'll set the width and height. We'll also initialize the observer by calling `this.initObserver`.

```js
    beforeDestroy() {
      if (this.observer) this.observer.disconnect()
    },
```

We also need to make sure we disconnect the observer before destroy.

We've now reached the main part of this tutorial. In the `initObserver` method, we create and initialize an observer which is an instance of `MutationObserver`. This observer tracks our box element's mutations and calls another method - `onResize` when the mutation type is attributes (the box's width and height attributes will fall under this). `onResize` is our resize handler.

```js
    methods: {
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
```

The resize handler updates the state when the dimensions change. Optionally, you can emit an event that other components can listen to. [More info on emitting events with vue.](https://vuejs.org/v2/guide/components-custom-events.html)

```js
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
    },
  }
</script>
```

### The `<script>` code for Resizing with `ResizeObserver`

Here's how you would do it with `ResizeObserver`. You'll notice that it's a lot less code when you implement with `ResizeObserver`. The `<template>` and `<style>` portion will stay the same.

<!-- embed:ResizeObserver.vue -->

And here's the full code with `<template>`, `<script>` and `<style>` for resizing with `MutationObserver`.

<!-- embed:MutationObserver.vue -->

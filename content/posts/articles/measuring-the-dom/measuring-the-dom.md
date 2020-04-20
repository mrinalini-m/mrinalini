---
title: 'Measuring a changing DOM element'
date: 2020-04-20
slug: 'measuring-a-changing-dom-element'
tags:
  - html
  - css
  - javascript
  - vue
category: articles
---

There is something like the window's `onresize` event listener but for DOM elements. It's called [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) and makes measuring dynamic elements very easy. The only problem is it's not standard. 😑 As of April 2020, it's been in the editor's draft list for over two years. Almost all browsers support it. But the exceptions include not only Internet Explorer(which surprises no one) but also Safari and Firefox android. So... is there another way to measure a changing element other than a `setInterval` or using a polyfill? Enter [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

import Measure from './MutationObserver.vue'

<!-- embed:MutationObserver.vue -->

Here is the result:

<Measure/>
<p></p>

Here's how you would do it with `ResizeObserver`:

<!-- embed:ResizeObserver.vue -->

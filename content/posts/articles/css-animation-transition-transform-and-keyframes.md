---
title: 'Css: Transform, Transition, Animation and Keyframes'
date: 2019-12-17
slug: 'css-transform-transition-animation-and-keyframes'
tags:
  - css
  - animation
category: articles
---

### Transform

`transform: scale(2);` will change the element from 0 —> end. Only one step

### Transition

`transition: all 0.5s ease-out;` allows you to change the rate at which element changes from one property to another. Usually want to use with pseudo-classes like :hover or :active or onAction. They don't loop

### Animation

CSS animations don’t need a trigger. They can respond to a trigger, but one isn’t needed to start the animation. Animations can run automatically when the page first loads. If you need your elements to change or move automatically, you have only one choice: animations.

### Keyframes

You have keyframes and you can change the property values inside keyframes. Example

<iframe height="600" style="width: 100%;" scrolling="no" title="Animation example" src="https://codepen.io/sam_saama/embed/LwYwKK?height=265&theme-id=dark&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sam_saama/pen/LwYwKK'>Animation example</a> by Sam S
  (<a href='https://codepen.io/sam_saama'>@sam_saama</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

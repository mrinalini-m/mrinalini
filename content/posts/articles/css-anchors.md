---
title: 'Html: Anchor Tags and Pseudo classes'
date: 2019-12-17
slug: 'html-anchor-tags'
tags:
  - css
  - html
category: articles
---

```css
/* unvisited link */
a:link {
	color: #ff0000;
}

/* visited link */
a:visited {
	color: #00ff00;
}

/* mouse over link */
a:hover {
	color: #ff00ff;
}

/* selected link */
a:active {
	color: #0000ff;
}
```

> **Note**: `a:hover` **MUST** come after `a:link` and `a:visited` in the CSS definition in order to be effective! a:active **MUST** come after a:hover in the CSS definition in order to be effective! Pseudo-class names are not case-sensitive.

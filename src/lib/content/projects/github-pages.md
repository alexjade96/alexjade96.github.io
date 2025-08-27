---
title: "GitHub Pages"
description: "This Website!"
date: "2025-08-01"
categories:
  - Svelte
  - Sveltekit
  - Typescript
published: true
---

## Contents

This is my project card for this website.  I used this [JoyOfCode tutorial](https://joyofcode.xyz/sveltekit-markdown-blog) as my main guideline & supplemented with additional libraries & frameworks here and there.

### Sub Techs

- __mdsvex__
  - Enables the adding of .md Markdown-supported pages
  - Also includes __Shiki__ to provide code highlighting syntax as shown below

```ts
// TS
function greet(name: string) {
	console.log(`Hey ${name}! 👋`)
}
```

```css
/* CSS */
<style>
    p {
        margin-block: var(--size-5);
        max-width: 800px;
        margin-inline: auto;
        font-size: var(--size-3);
    }
</style>
```

- __svelte-pdf__
  - Enables the usage of a pdfviewer component (See [Resume](/resume) Section)


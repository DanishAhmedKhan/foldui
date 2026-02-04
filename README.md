# web-blocks

A schema-driven engine for building web UI blocks.

`web-blocks` converts structured JSON into HTML.  
It is framework-agnostic and designed to power menus, layouts, quizzes, and full websites.

## Status

🚧 Early development (API not stable)

## Example

```ts
import { render } from 'web-blocks';

const html = render({
  /* schema */
});
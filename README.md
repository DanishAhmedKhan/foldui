# foldui

A lightweight, component rendering engine built on top of the DOM.

`foldui` lets you define strongly-typed components with schema-driven props, default values, scoped styling, and a powerful render helper — without a virtual DOM.

# Installation

### Using npm

```bash
npm install foldui
```

```ts
import { Fold } from 'foldui'
```

### Using CDN

```html
<script src="https://unpkg.com/foldui/dist/foldui.umd.js"></script>
```

## 🚀 Basic Usage

```html
<div id="container"></div>
```

### Create a component

```ts
 Fold.addComponent({
    name: 'main',
    render: ({ props, helper }) => {
        const sectionEl = helper.el('section', 'main')
        return sectionEl
    }
})

Fold.addComponent({
    name: 'heading',
    props: {
        title: { type: 'string', default: 'Heading' },
    },
    defaultStyle: {
        heading: {
            fontSize: '24px',
            color: '#333',
        }
    },
    render: ({ props, helper }) => {
        const headingEl = helper.el('h1', 'heading')
        headingEl.innerText = props.title
        return headingEl
    }
})
```

### Register & Render

```ts
 const schema = {
    id: 'main-1',
    type: 'main',
    style: {
        main: {
            background: 'red',
        }
    },
    children: [
        {
            id: 'heading-1',
            type: 'heading',
            props: {
                title: 'Foldui is amazing',
            },
            style: {
                fontSize: '30px',
            },
        }
    ]
}

const html = Fold.render(schema)

const containerEl = document.getElementById('container')
containerEl.appendChild(html)
```

## ⚙️ API Reference

### Fold.createComponent(options)

```ts
{
    type: string
    props?: {
        [key: string]: {
            type: 'string' | 'number' | 'boolean' | 'object' | 'array',
            default?: any
        }
    },
    defaultStyle?: {
        [partName: string]: {
            [cssProperty: string]: string
        }
    },
    render(context): HTMLElement
}
```

#### render(context)

The render function receives:

```ts
{
  id: string,      // unique node id
  props: object,   // resolved props (with defaults applied)
  ui: object       // rendering utilities
}
```

### `ui` (Render Utilities)

```ts
ui.el(tag, part?)
```

## Example

```ts
render({ props, ui }) {
  const img = ui.el('img')
  img.src = props.src
  img.alt = props.alt
  return img
}
```

`ui.el('img')` creates a dom.

You can also give the dom a 'part' name

```
const img = helper.el('img', 'image')
```

This generates:

```html
<button data-part="image" data-fui-owner="componentId"></button>
```

## Ideal Use Cases

- Visual page builders
- Quiz generator
- Form creator

## License

MIT
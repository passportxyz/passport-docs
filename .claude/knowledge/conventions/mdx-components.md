# MDX Components Convention

## Standard Nextra Components

MDX files commonly import from 'nextra/components':

### Cards and Card

For link grids and navigation cards.

```jsx
import { Cards, Card } from 'nextra/components'

<Cards>
  <Card title="Getting Started" href="/getting-started" />
  <Card title="API Reference" href="/api" />
</Cards>
```

### Callout

For info, warning, and tip callouts.

```jsx
import { Callout } from 'nextra/components'

<Callout type="info">
  This is an informational callout.
</Callout>

<Callout type="warning">
  This is a warning callout.
</Callout>
```

## Content Format

Content uses standard MDX with frontmatter for title/description.

## Related Files

- pages/index.mdx

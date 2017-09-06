
## Accordion

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

### API

#### Props

- id (String, required): the id, used to link a title to content for accessibility
- items (Array, default = []): an array of items to be included
- autocollapse (default = true): whether other open tabs should close when another is opened
- titleProp (String, default = 'title'): which property should be used for the title from the `items` array
- contentProp: (String, default = 'content'): which property should be used for the content from the `items` array

#### Methods

- toggle(index: Number): opens the tab at the appropriate index

#### Slots

- accordion-items: replaces the list of tabs
- accordion-item-title: replaces the tab title
- accordion-item-content: replaces the tab content


## Badge

Badges are used for static notifications, such as the number of nodes in a tree, the number of unread messages, or just to signal importance.

### API

#### Props

- color (String, default = 'none'): the color of the badge
- value (String): what the badge displays

#### Slots

- default: the value to be displayed


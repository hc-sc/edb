
## Menu

THIS IS UNFINISHED

A simple dropdown consisting of buttons.

### Slots

- label: the label
- content: the dropdown section
- selected-menuitem: a value to display when selected


## Textarea

Used for lengthy sections of text input. Has settings for required, disabled, max lenth, and whether the textarea should resize automatically.

### Values

#### Props

- id (String, required): the id
- name (String): the name, will fall back to id if not provided
- label (String, required): the label
- required (Boolean): if the field needs to be valid
- disabled (Boolean): disable the field
- max (Number): the max character length
- autoresize (Boolean, default = true): if false, a scroll bar will appear if needed
- value (String): the value of the textarea
- cb (Function, default = $emit('input', value)): the callback

#### Data

- touched (Boolean): if the textarea has received focus

#### Computed

- compName (String): the name, or fallback to id
- empty (Boolean): if the length of value is 0
- invalid (Boolean): if the value is invalid
- validLength (Boolean): if the value is less than max

### Methods

- resize(): resize the box to the height of the text content


## Toolbar

Used anywhere that a combination of header and action tools are used, for example a header with a navigation toggle.

### Values

#### Props

- title (String): the header text
- color (String, default = 'primary'): the theme
- display (String, default = 'normal'): allows for different depths, effect, etc, so it can be used as the document header, a section header, or as status bars

### Slots

- left: left section of the header, typically for icon prefixes or navigation toggles
- default: the main section, usually used for the header text
- right: right section, typically has role=toolbar, for dynamic actions


## Tooltip

A hovering element used to give extra information about an element, such as an icon or abbreviation.

### Values

#### Props

- id (String, required): the id
- label (String, required): the descriptive text
- position (String, default = 'bottom'): the location of the tooltip in relation to the wrapped element

### Slots

- default: the injected element/component


## Tree

A recursive component that allows for nested children, such as a directory structure. Each tree node must be an object with properties 'label' and 'children'

### Values

#### Props

- id (String): the id
- tree (Object): the root of the tree, with properties 'label' and 'children'

#### Data

- open (Boolean): if the children are visible

#### Computed

- hasChildren (Boolean): if the tree has children

### Methods

- toggle(): toggles the 'open' state


## Nav

Navigation section, can be arranged in a horizontal or vertical manner.

### Values

#### Props

- id (String, required): the id
- toggleable (Boolean, default = false): if the navs can be hidden with a toggle
- navs (Array, default = []): the nav items
- column (Boolean, default = true): whether the navs should be horizontal or vertical

#### Data

- expanded (Boolean): if the nav is expanded

### Methods

- toggle(): toggles the expanded state

### Slots

- default: the entire navbar


## Dialog

Dialogs are used to present a windowed experience. Modal dialogs restrict interaction with the rest of the page when the dialog is open.

### Values

#### Props

- cancel (Function): a callback for the 'cancel' action
- confirm (Function): a callback for the 'confirm' action
- content (String): the content for the dialog
- height (String): defines the height of the dialog in percent, based on vh
- id (String, required): the id
- modal (Boolean): defines whether the rest of the page should be interactive
- title (String): the header for the dialog
- type (String): shortcut for defining alerts, comfirm, prompts, or custom
- width (String): defines the width of the dialog in percent, based on vw

#### Data

- component (Component): defines a custom component to render in the dialog
- expanded (Boolean): whether the dialog is open

### Methods

- open() - open the dialog
- close() - hide the dialog
- show(config: Object): allows for supplying a custom component and model to the dialog, and opens it

### Slots

- confirm-text: the label for the confirm button
- cancel-text: the label for the cancel button
- default: replaces the content, as long as there is no component defined
- footer: the footer (including buttons for confirm and cancel)
- title: replaces the title header


## Fieldset

Used to wrap forms (or nested form models) in a fieldset

### Values

#### Props

- legend (String): the legend of the fieldset

### Slots

- default: allows for field injection


## Header

A generic wrapper for header sections. Allows for displaying as a page header (e.g. with navigation), or simple headers for smaller sections

### Values

#### Props

- title (String): the title of the section
- color (String, default = 'primary'): the theme of the header

### Slots

- superheader: area above the header
- left: replaces the 'left' section of the included toolbar
- default: the middle section of the toolbar
- right: the right side of the toolbar
- subheader: area below the header (i.e. for navigation)


## History

A component for managing the history API. It is tightly tied to use with vuex

### Mixins

- navigation


## Icon

Allows for definition of an icon, complete with appropriate tooltip.

### Values

### Props

- classes (String): additional classes to append to the icon
- color (String, default = 'primary'): the theme
- disabled (Boolean, default = false): disables the icon
- fab (Boolean, default = false): promotes the icon to a FAB button
- icon (String): if using icon-fonts, allows for definition using code points or ligatures
- id (String, required): the id
- label (String, required): the label used as a tooltip
- position (String): allows for modifying the location of the tooltip

### Slot

- default: replace the icon character(s)


## Input

The wrapper for all input types, including text, password, email, tel, date, etc. Provides additional functionality for character counts, min/max lengths or values, pattern matching, custom error messages, disabled, and required

### Values

#### Props

- cb (Function, default = $emit('input', value): the input callback (can be used to integrate 'vuex' more simply)
- disabled (Boolean): disabled field
- id (String, required): the id
- label (String): label of the input field
- max (Number): same as min, but for max
- message (String): the message to display if the pattern is not matched
- min (Number): the minimum value for number/date, and minimum length for text-based fields
- name (String): the name
- pattern (RegExp): the pattern the value must meet
- required (Boolean): if the field must be filled
- showErrors (Boolean): whether to show any error messages
- type (String, default = 'text'): the type of the input field
- value (String | Boolean | Number | Date): the value of the input field

#### Data

- touched (Boolean): if the field has received focus

#### Computed

- compName (String): the name if provided, otherwise the id
- empty (Boolean): if the field has empty value
- invalid (Boolean): if the field does not meet required, min/max, or pattern, and it has been touched
- isTextField (Boolean): returns true if the field's type can be considered only text
- validBounds (Boolean): if the field has correct min/max values
- validPattern (Boolean): if the pattern is valid

### Methods

- toDate(value): converts a string to a date

### Filters

- errorMessage(message): allows for customization of error message

### Slots

- default: replaces the label


## List

Used to display a list of items in a list-like traditional manner (for small items, see Chips).

### Values

#### Props

- id (String): the id
- items (Array, default = []): the items in the list
- selectable (Boolean, default = false): if an event should be emitted on select
- onSelect (Function, default = $emit('select', value)): event emitter
- displayValue (Function, default = value.label || value): what to display

### Slots

- prefix: to include some elements before the list item
- content: to replace the value portion
- postfix: to append something at the end of the item, like a Badge


## List Filter

A list that has been augmented to include filtering

### Values

#### Props

- those composed from List
- sortable (Boolean, default = true): if the list is sortable
- sortByArgs (String): the property to sort by


## Tabs

NOT COMPLETE

Used to display panels with tabs to navigate between them. If no JS is available, all panels are visible

### Values

#### Props

- id (String, require): the id
- tabs (Array, default = []): the tabs

#### Data

- selected (Array): the currently selected tab

### Methods

- select(index: Number): changes the current selection

### Slots

- tabs-link: the link part of the panel
- tabs-panel: the content part of the panel


## Table

The table is used to display grid-like and/or tabular data. You can provide an array of items, or provide a function to get the data.

### Values

#### Props

- addable (Boolean, default = false): if an add button should be displayed
- displayHeader (Function, default = header.label || header): controls how to display the header, for instance a translation function, or retrieving a property from an object
- filterable (Boolean, default = true): allows for filtering of data
- getItems(Function): if defined will override items and retrieves rows from the given function
- header (Array, default = []): array of header columns
- id (String, required): the id
- items (Array, default = []): the rows
- onAdd (Function, default = $emit('add', {id: this.id}))
- onSelect(Function, default = $emit('select', index)): callback for select
- pageable (Boolean, default = true): if you can page the data
- selectable (Boolean, default = true): emits an event on select
- sortable (Boolean, default = true): allows for sorting of data
- title (String, required): the title of the table

#### Data

- filters (Array, default = []): the filters to apply
- offset (Number, default = 0): the page offset
- pageSize (Number, default = 5): the number of rows to display per page
- sortBy (String, default = this.headers[0]): the column to sort by
- desc (Boolean, default = false): if the sorted rows should be applied reverse
- loading (Boolean, default = true): if the getItems function is in progress

### Methods

- addFilter(): adds a new empty filter
- changeOffset(offset: Number): changes the page
- deleteFilter(index: Number): deletes the filter at an index
- select(index: Number): if selectable, calls onSelect
- sort(header: String): sets sortBy if necessary and clears the offset


## Drawer

NOT CURRENTLY FINISHED

The drawer is used to place navigation or asides in a collapseable sidebar. The props are mainly to define visual effect, like which side it comes from, method of movement, etc.

### Values

#### Props

- display (String, default = 'overlay'): controls how the drawer behaves. 'overlay' is on top, 'push' translates the siblingId over, 'collapse' shrinks the width of the siblingId
- fullscreen (Boolean, default = false): whether the drawer should take up the full vw
- id (String, required): the id
- showing (Boolean): if the drawer is currently open or not
- siblingId (String): when using 'push' display, controls which container is moved
- side (String, default = 'left'): which side of the viewport the drawer comes from

### Methods

- close(): closes the drawer
- open(): opens the meeting
- toggle(): toggles the drawer between open and closed


## Progress

Spinners and determinate progress bars to indicate loading.

### Values

#### Props

- type (String, default = 'circular'): spinner or bar
- determinate (Boolean, default = false): if the indicator should have determined position
- progress (Number, default = 0): the amount of progress that has been completed


## Switch

An accessible checkbox like widget that is more visually indicative for on/off true/false states.

### Values

#### Props

- id (String, required): the id
- label (String, required): the label
- value
- show (Boolean, default = false): whether to include the on/off values
- 'on-value' (String, default = 'on'): which value to display for on/true states
- 'off-value' (String, default = 'off'): inverse of 'on-value';
- value (Boolean): the provided data
- cb (Function, default = $emit('input', !value)): event emitter


## Split Pane

Allows for creation of adjustable columns and rows, for example to create master/detail pages. You can also nest the split-pane with other split panes.

### Values

#### Props

- id (String): the id
- numPanes (Number, default = 2): the number of panes desired
- direction (String, default = 'row'): if 'row' or 'columns' are desired

### Slots

- split-pane-{n}: allows you to inject components into the pane


## Select

Used to replace the native HTML select input with a better styled listbox component

### Values

#### Props

- disabled (Boolean, default = false): disabled
- displayValue (Function, default = value.label || value): what to display of the selected value
- getItems (Function): if defined, allows defining a function to get values
- id (String, required): the id
- label (String, required): the label for the select
- matchValue (Function): how to match the selected value to the items array
- onSelect (Function, default = $emit('input', value)): event emitter
- options (Array): the list items
- required (Boolean, default = false): required
- value (String): the currently selected value

#### Data

- expanded (Boolean): if the listbox is open
- focusable (Array): the focusable nodes in the listbox
- focusedIndex (Number): the index of the currently focused/selected item
- loading (Boolean): if the getItems function is running
- previousFocusedNode: returns focus to the previous node on close
- searchValue (String): the currently searched for text
- selected (Boolean): which value is being selected
- timer (Handle): the name of the function that clears searchValue

#### Computed

- compName (String): the name or id
- items (Array): the items returned from getItems or options
- selectedValue (Object): the currently selected value

### Methods

TODO: clean up focusable


## Select Extensible

Allows for extending the collection of options in a select listbox.

### Values

#### Props

- all of the same as Select
- onAdd (Function): defines what to do when adding

#### Data

- newValue (String): the encoded value
- newValueDecode (String): the value that will be displayed
- adding (Boolean): if they are currently adding a new value

### Methods

- toggleAdd(): allows for adding
- clear(): clears the adding fields

### Slots

- add-fields: overrides the add fields


## Snackbar

NOT COMPLETE

Used to indicate to the user when an event has happened via a small message on the bottom of the page.

### Slots

- message: the snackbar message
- actions: the snackbar actions


## Chips

Chips are method of displaying simple lists, including the options to add and remove elements. Additionally you can customize whether you can sort the items. On sort, emits a 'sort' event

### Mixins

- focusable

### Values

#### Props

- autocomplete (String, default = 'off'): whether a data-list should be included to help with completing the items
- deletable (Boolean): if you can delete chips
- disabled (Boolean, default = false): the entire functioning of the chips is disabled (just displays the items)
- displayValue (Function): defines how to display the value
- getItems (Function): used to get the autocomplete values, `options` is used if this is left undefined
- id (String, required): the id
- label (String, required): the placeholder text for the input field
- name (String): can be used to define the chips input field
- onAdd(Function, default = $emit('input', value)): how to update the list on add.
- options (Array, default = []): the items to include in the data-list, should it be used
- sortable (Boolean, default = true): if you can sort the items
- sortBy (Function, default = localeCompare): define how to sort
- unique (Boolean): if you can include duplicates
- value (Array, default = []): the array of items already in the chips

#### Data

- currValue (String): the chip input fields value

#### Computed

- chips (Array): the list of chips, keyed on `value` prop
- compName (String): the name of the input field, keyed on either `id` or `name`
- focused (Boolean): if the component has focus
- items (Array): the list of options, keyed on `options` prop

### Methods

- addItem(value: String): the item to add
- clear(): emits a new empty array
- deleteItem(index: Number): the index of the item to remove
- handleKeyBoardEvent(event: Event): handle keyboard presses
- sort(): emits a new array with sorted values

### Slots

- deleteIcon: specifies what to display for delete
- actions: replace the native 'sort' and 'clear' buttons
- options: replace the data-list element


## Card

Used to provide the material appearance to specific sections

### Values

#### Props

- hover (Boolean, default = false): if the card should change depth on hover


## Button

Buttons are used for dynamic activity on the page (non-navigation). They can be used to toggle navigation, menus, or to trigger javascript methods on data. To use, attach an @click.native handler to the custom button. NOTE: for FAB buttons, see Icon

### Values

#### Props

- color (String, default = 'primary'): the theme of the button
- disabled (Boolean, default = false): if the button should be non-interactive
- display (String, default = 'raised'): whether the button should appear raised or not
- label (String): the label of the button
- type (String, default = 'button'): defines the type are 'button', 'submit', or 'reset'

### Slots

- default: replaces the label of the button


## Badge

Badges are used for static notifications, such as the number of nodes in a tree, the number of unread messages, or just to signal importance.

### Props

- color (String, default = 'none'): the color of the badge
- value (String): what the badge displays

### Slots

- default: the value to be displayed


## Accordion

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

### Values

#### Props

- autocollapse (default = true): whether other open tabs should close when another is opened
- contentProp: (String, default = 'content'): which property should be used for the content from the `items` array
- id (String, required): the id, used to link a title to content for accessibility
- items (Array, default = []): an array of items to be included
- titleProp (String, default = 'title'): which property should be used for the title from the `items` array

#### Data

- expanded (Array): which accordion tabs are open

### Methods

- toggle(index: Number): opens the tab at the appropriate index

### Slots

- accordion-items: replaces the list of tabs
- accordion-item-title: replaces the tab title
- accordion-item-content: replaces the tab content


## Menu

THIS IS UNFINISHED

A simple dropdown consisting of buttons.

### Slots

- label: the label
- content: the dropdown section
- selected-menuitem: a value to display when selected


## Textarea

Used for lengthy sections of text input. Has settings for required, disabled, max lenth, and whether the textarea should resize automatically.

### Values

#### Props

- id (String, required): the id
- name (String): the name, will fall back to id if not provided
- label (String, required): the label
- required (Boolean): if the field needs to be valid
- disabled (Boolean): disable the field
- max (Number): the max character length
- autoresize (Boolean, default = true): if false, a scroll bar will appear if needed
- value (String): the value of the textarea
- cb (Function, default = $emit('input', value)): the callback

#### Data

- touched (Boolean): if the textarea has received focus

#### Computed

- compName (String): the name, or fallback to id
- empty (Boolean): if the length of value is 0
- invalid (Boolean): if the value is invalid
- validLength (Boolean): if the value is less than max

### Methods

- resize(): resize the box to the height of the text content


## Toolbar

Used anywhere that a combination of header and action tools are used, for example a header with a navigation toggle.

### Values

#### Props

- title (String): the header text
- color (String, default = 'primary'): the theme
- display (String, default = 'normal'): allows for different depths, effect, etc, so it can be used as the document header, a section header, or as status bars

### Slots

- left: left section of the header, typically for icon prefixes or navigation toggles
- default: the main section, usually used for the header text
- right: right section, typically has role=toolbar, for dynamic actions


## Tooltip

A hovering element used to give extra information about an element, such as an icon or abbreviation.

### Values

#### Props

- id (String, required): the id
- label (String, required): the descriptive text
- position (String, default = 'bottom'): the location of the tooltip in relation to the wrapped element

### Slots

- default: the injected element/component


## Tree

A recursive component that allows for nested children, such as a directory structure. Each tree node must be an object with properties 'label' and 'children'

### Values

#### Props

- id (String): the id
- tree (Object): the root of the tree, with properties 'label' and 'children'

#### Data

- open (Boolean): if the children are visible

#### Computed

- hasChildren (Boolean): if the tree has children

### Methods

- toggle(): toggles the 'open' state


## Nav

Navigation section, can be arranged in a horizontal or vertical manner.

### Values

#### Props

- id (String, required): the id
- toggleable (Boolean, default = false): if the navs can be hidden with a toggle
- navs (Array, default = []): the nav items
- column (Boolean, default = true): whether the navs should be horizontal or vertical

#### Data

- expanded (Boolean): if the nav is expanded

### Methods

- toggle(): toggles the expanded state

### Slots

- default: the entire navbar


## Dialog

Dialogs are used to present a windowed experience. Modal dialogs restrict interaction with the rest of the page when the dialog is open.

### Values

#### Props

- cancel (Function): a callback for the 'cancel' action
- confirm (Function): a callback for the 'confirm' action
- content (String): the content for the dialog
- height (String): defines the height of the dialog in percent, based on vh
- id (String, required): the id
- modal (Boolean): defines whether the rest of the page should be interactive
- title (String): the header for the dialog
- type (String): shortcut for defining alerts, comfirm, prompts, or custom
- width (String): defines the width of the dialog in percent, based on vw

#### Data

- component (Component): defines a custom component to render in the dialog
- expanded (Boolean): whether the dialog is open

### Methods

- open() - open the dialog
- close() - hide the dialog
- show(config: Object): allows for supplying a custom component and model to the dialog, and opens it

### Slots

- confirm-text: the label for the confirm button
- cancel-text: the label for the cancel button
- default: replaces the content, as long as there is no component defined
- footer: the footer (including buttons for confirm and cancel)
- title: replaces the title header


## Fieldset

Used to wrap forms (or nested form models) in a fieldset

### Values

#### Props

- legend (String): the legend of the fieldset

### Slots

- default: allows for field injection


## Header

A generic wrapper for header sections. Allows for displaying as a page header (e.g. with navigation), or simple headers for smaller sections

### Values

#### Props

- title (String): the title of the section
- color (String, default = 'primary'): the theme of the header

### Slots

- superheader: area above the header
- left: replaces the 'left' section of the included toolbar
- default: the middle section of the toolbar
- right: the right side of the toolbar
- subheader: area below the header (i.e. for navigation)


## History

A component for managing the history API. It is tightly tied to use with vuex

### Mixins

- navigation


## Icon

Allows for definition of an icon, complete with appropriate tooltip.

### Values

### Props

- classes (String): additional classes to append to the icon
- color (String, default = 'primary'): the theme
- disabled (Boolean, default = false): disables the icon
- fab (Boolean, default = false): promotes the icon to a FAB button
- icon (String): if using icon-fonts, allows for definition using code points or ligatures
- id (String, required): the id
- label (String, required): the label used as a tooltip
- position (String): allows for modifying the location of the tooltip

### Slot

- default: replace the icon character(s)


## Input

The wrapper for all input types, including text, password, email, tel, date, etc. Provides additional functionality for character counts, min/max lengths or values, pattern matching, custom error messages, disabled, and required

### Values

#### Props

- cb (Function, default = $emit('input', value): the input callback (can be used to integrate 'vuex' more simply)
- disabled (Boolean): disabled field
- id (String, required): the id
- label (String): label of the input field
- max (Number): same as min, but for max
- message (String): the message to display if the pattern is not matched
- min (Number): the minimum value for number/date, and minimum length for text-based fields
- name (String): the name
- pattern (RegExp): the pattern the value must meet
- required (Boolean): if the field must be filled
- showErrors (Boolean): whether to show any error messages
- type (String, default = 'text'): the type of the input field
- value (String | Boolean | Number | Date): the value of the input field

#### Data

- touched (Boolean): if the field has received focus

#### Computed

- compName (String): the name if provided, otherwise the id
- empty (Boolean): if the field has empty value
- invalid (Boolean): if the field does not meet required, min/max, or pattern, and it has been touched
- isTextField (Boolean): returns true if the field's type can be considered only text
- validBounds (Boolean): if the field has correct min/max values
- validPattern (Boolean): if the pattern is valid

### Methods

- toDate(value): converts a string to a date

### Filters

- errorMessage(message): allows for customization of error message

### Slots

- default: replaces the label


## List

Used to display a list of items in a list-like traditional manner (for small items, see Chips).

### Values

#### Props

- id (String): the id
- items (Array, default = []): the items in the list
- selectable (Boolean, default = false): if an event should be emitted on select
- onSelect (Function, default = $emit('select', value)): event emitter
- displayValue (Function, default = value.label || value): what to display

### Slots

- prefix: to include some elements before the list item
- content: to replace the value portion
- postfix: to append something at the end of the item, like a Badge


## List Filter

A list that has been augmented to include filtering

### Values

#### Props

- those composed from List
- sortable (Boolean, default = true): if the list is sortable
- sortByArgs (String): the property to sort by


## Tabs

NOT COMPLETE

Used to display panels with tabs to navigate between them. If no JS is available, all panels are visible

### Values

#### Props

- id (String, require): the id
- tabs (Array, default = []): the tabs

#### Data

- selected (Array): the currently selected tab

### Methods

- select(index: Number): changes the current selection

### Slots

- tabs-link: the link part of the panel
- tabs-panel: the content part of the panel


## Table

The table is used to display grid-like and/or tabular data. You can provide an array of items, or provide a function to get the data.

### Values

#### Props

- addable (Boolean, default = false): if an add button should be displayed
- displayHeader (Function, default = header.label || header): controls how to display the header, for instance a translation function, or retrieving a property from an object
- filterable (Boolean, default = true): allows for filtering of data
- getItems(Function): if defined will override items and retrieves rows from the given function
- header (Array, default = []): array of header columns
- id (String, required): the id
- items (Array, default = []): the rows
- onAdd (Function, default = $emit('add', {id: this.id}))
- onSelect(Function, default = $emit('select', index)): callback for select
- pageable (Boolean, default = true): if you can page the data
- selectable (Boolean, default = true): emits an event on select
- sortable (Boolean, default = true): allows for sorting of data
- title (String, required): the title of the table

#### Data

- filters (Array, default = []): the filters to apply
- offset (Number, default = 0): the page offset
- pageSize (Number, default = 5): the number of rows to display per page
- sortBy (String, default = this.headers[0]): the column to sort by
- desc (Boolean, default = false): if the sorted rows should be applied reverse
- loading (Boolean, default = true): if the getItems function is in progress

### Methods

- addFilter(): adds a new empty filter
- changeOffset(offset: Number): changes the page
- deleteFilter(index: Number): deletes the filter at an index
- select(index: Number): if selectable, calls onSelect
- sort(header: String): sets sortBy if necessary and clears the offset


## Drawer

NOT CURRENTLY FINISHED

The drawer is used to place navigation or asides in a collapseable sidebar. The props are mainly to define visual effect, like which side it comes from, method of movement, etc.

### Values

#### Props

- display (String, default = 'overlay'): controls how the drawer behaves. 'overlay' is on top, 'push' translates the siblingId over, 'collapse' shrinks the width of the siblingId
- fullscreen (Boolean, default = false): whether the drawer should take up the full vw
- id (String, required): the id
- showing (Boolean): if the drawer is currently open or not
- siblingId (String): when using 'push' display, controls which container is moved
- side (String, default = 'left'): which side of the viewport the drawer comes from

### Methods

- close(): closes the drawer
- open(): opens the meeting
- toggle(): toggles the drawer between open and closed


## Progress

Spinners and determinate progress bars to indicate loading.

### Values

#### Props

- type (String, default = 'circular'): spinner or bar
- determinate (Boolean, default = false): if the indicator should have determined position
- progress (Number, default = 0): the amount of progress that has been completed


## Switch

An accessible checkbox like widget that is more visually indicative for on/off true/false states.

### Values

#### Props

- id (String, required): the id
- label (String, required): the label
- value
- show (Boolean, default = false): whether to include the on/off values
- 'on-value' (String, default = 'on'): which value to display for on/true states
- 'off-value' (String, default = 'off'): inverse of 'on-value';
- value (Boolean): the provided data
- cb (Function, default = $emit('input', !value)): event emitter


## Split Pane

Allows for creation of adjustable columns and rows, for example to create master/detail pages. You can also nest the split-pane with other split panes.

### Values

#### Props

- id (String): the id
- numPanes (Number, default = 2): the number of panes desired
- direction (String, default = 'row'): if 'row' or 'columns' are desired

### Slots

- split-pane-{n}: allows you to inject components into the pane


## Select

Used to replace the native HTML select input with a better styled listbox component

### Values

#### Props

- disabled (Boolean, default = false): disabled
- displayValue (Function, default = value.label || value): what to display of the selected value
- getItems (Function): if defined, allows defining a function to get values
- id (String, required): the id
- label (String, required): the label for the select
- matchValue (Function): how to match the selected value to the items array
- onSelect (Function, default = $emit('input', value)): event emitter
- options (Array): the list items
- required (Boolean, default = false): required
- value (String): the currently selected value

#### Data

- expanded (Boolean): if the listbox is open
- focusable (Array): the focusable nodes in the listbox
- focusedIndex (Number): the index of the currently focused/selected item
- loading (Boolean): if the getItems function is running
- previousFocusedNode: returns focus to the previous node on close
- searchValue (String): the currently searched for text
- selected (Boolean): which value is being selected
- timer (Handle): the name of the function that clears searchValue

#### Computed

- compName (String): the name or id
- items (Array): the items returned from getItems or options
- selectedValue (Object): the currently selected value

### Methods

TODO: clean up focusable


## Select Extensible

Allows for extending the collection of options in a select listbox.

### Values

#### Props

- all of the same as Select
- onAdd (Function): defines what to do when adding

#### Data

- newValue (String): the encoded value
- newValueDecode (String): the value that will be displayed
- adding (Boolean): if they are currently adding a new value

### Methods

- toggleAdd(): allows for adding
- clear(): clears the adding fields

### Slots

- add-fields: overrides the add fields


## Snackbar

NOT COMPLETE

Used to indicate to the user when an event has happened via a small message on the bottom of the page.

### Slots

- message: the snackbar message
- actions: the snackbar actions


## Chips

Chips are method of displaying simple lists, including the options to add and remove elements. Additionally you can customize whether you can sort the items. On sort, emits a 'sort' event

### Mixins

- focusable

### Values

#### Props

- autocomplete (String, default = 'off'): whether a data-list should be included to help with completing the items
- deletable (Boolean): if you can delete chips
- disabled (Boolean, default = false): the entire functioning of the chips is disabled (just displays the items)
- displayValue (Function): defines how to display the value
- getItems (Function): used to get the autocomplete values, `options` is used if this is left undefined
- id (String, required): the id
- label (String, required): the placeholder text for the input field
- name (String): can be used to define the chips input field
- onAdd(Function, default = $emit('input', value)): how to update the list on add.
- options (Array, default = []): the items to include in the data-list, should it be used
- sortable (Boolean, default = true): if you can sort the items
- sortBy (Function, default = localeCompare): define how to sort
- unique (Boolean): if you can include duplicates
- value (Array, default = []): the array of items already in the chips

#### Data

- currValue (String): the chip input fields value

#### Computed

- chips (Array): the list of chips, keyed on `value` prop
- compName (String): the name of the input field, keyed on either `id` or `name`
- focused (Boolean): if the component has focus
- items (Array): the list of options, keyed on `options` prop

### Methods

- addItem(value: String): the item to add
- clear(): emits a new empty array
- deleteItem(index: Number): the index of the item to remove
- handleKeyBoardEvent(event: Event): handle keyboard presses
- sort(): emits a new array with sorted values

### Slots

- deleteIcon: specifies what to display for delete
- actions: replace the native 'sort' and 'clear' buttons
- options: replace the data-list element


## Card

Used to provide the material appearance to specific sections

### Values

#### Props

- hover (Boolean, default = false): if the card should change depth on hover


## Button

Buttons are used for dynamic activity on the page (non-navigation). They can be used to toggle navigation, menus, or to trigger javascript methods on data. To use, attach an @click.native handler to the custom button. NOTE: for FAB buttons, see Icon

### Values

#### Props

- color (String, default = 'primary'): the theme of the button
- disabled (Boolean, default = false): if the button should be non-interactive
- display (String, default = 'raised'): whether the button should appear raised or not
- label (String): the label of the button
- type (String, default = 'button'): defines the type are 'button', 'submit', or 'reset'

### Slots

- default: replaces the label of the button


## Badge

Badges are used for static notifications, such as the number of nodes in a tree, the number of unread messages, or just to signal importance.

### Props

- color (String, default = 'none'): the color of the badge
- value (String): what the badge displays

### Slots

- default: the value to be displayed


## Accordion

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

### Values

#### Props

- autocollapse (default = true): whether other open tabs should close when another is opened
- contentProp: (String, default = 'content'): which property should be used for the content from the `items` array
- id (String, required): the id, used to link a title to content for accessibility
- items (Array, default = []): an array of items to be included
- titleProp (String, default = 'title'): which property should be used for the title from the `items` array

#### Data

- expanded (Array): which accordion tabs are open

### Methods

- toggle(index: Number): opens the tab at the appropriate index

### Slots

- accordion-items: replaces the list of tabs
- accordion-item-title: replaces the tab title
- accordion-item-content: replaces the tab content


## Menu

THIS IS UNFINISHED

A simple dropdown consisting of buttons.

### Slots

- label: the label
- content: the dropdown section
- selected-menuitem: a value to display when selected


## Textarea

Used for lengthy sections of text input. Has settings for required, disabled, max lenth, and whether the textarea should resize automatically.

### Values

#### Props

- id (String, required): the id
- name (String): the name, will fall back to id if not provided
- label (String, required): the label
- required (Boolean): if the field needs to be valid
- disabled (Boolean): disable the field
- max (Number): the max character length
- autoresize (Boolean, default = true): if false, a scroll bar will appear if needed
- value (String): the value of the textarea
- cb (Function, default = $emit('input', value)): the callback

#### Data

- touched (Boolean): if the textarea has received focus

#### Computed

- compName (String): the name, or fallback to id
- empty (Boolean): if the length of value is 0
- invalid (Boolean): if the value is invalid
- validLength (Boolean): if the value is less than max

### Methods

- resize(): resize the box to the height of the text content


## Toolbar

Used anywhere that a combination of header and action tools are used, for example a header with a navigation toggle.

### Values

#### Props

- title (String): the header text
- color (String, default = 'primary'): the theme
- display (String, default = 'normal'): allows for different depths, effect, etc, so it can be used as the document header, a section header, or as status bars

### Slots

- left: left section of the header, typically for icon prefixes or navigation toggles
- default: the main section, usually used for the header text
- right: right section, typically has role=toolbar, for dynamic actions


## Tooltip

A hovering element used to give extra information about an element, such as an icon or abbreviation.

### Values

#### Props

- id (String, required): the id
- label (String, required): the descriptive text
- position (String, default = 'bottom'): the location of the tooltip in relation to the wrapped element

### Slots

- default: the injected element/component


## Tree

A recursive component that allows for nested children, such as a directory structure. Each tree node must be an object with properties 'label' and 'children'

### Values

#### Props

- id (String): the id
- tree (Object): the root of the tree, with properties 'label' and 'children'

#### Data

- open (Boolean): if the children are visible

#### Computed

- hasChildren (Boolean): if the tree has children

### Methods

- toggle(): toggles the 'open' state


## Nav

Navigation section, can be arranged in a horizontal or vertical manner.

### Values

#### Props

- id (String, required): the id
- toggleable (Boolean, default = false): if the navs can be hidden with a toggle
- navs (Array, default = []): the nav items
- column (Boolean, default = true): whether the navs should be horizontal or vertical

#### Data

- expanded (Boolean): if the nav is expanded

### Methods

- toggle(): toggles the expanded state

### Slots

- default: the entire navbar


## Dialog

Dialogs are used to present a windowed experience. Modal dialogs restrict interaction with the rest of the page when the dialog is open.

### Values

#### Props

- cancel (Function): a callback for the 'cancel' action
- confirm (Function): a callback for the 'confirm' action
- content (String): the content for the dialog
- height (String): defines the height of the dialog in percent, based on vh
- id (String, required): the id
- modal (Boolean): defines whether the rest of the page should be interactive
- title (String): the header for the dialog
- type (String): shortcut for defining alerts, comfirm, prompts, or custom
- width (String): defines the width of the dialog in percent, based on vw

#### Data

- component (Component): defines a custom component to render in the dialog
- expanded (Boolean): whether the dialog is open

### Methods

- open() - open the dialog
- close() - hide the dialog
- show(config: Object): allows for supplying a custom component and model to the dialog, and opens it

### Slots

- confirm-text: the label for the confirm button
- cancel-text: the label for the cancel button
- default: replaces the content, as long as there is no component defined
- footer: the footer (including buttons for confirm and cancel)
- title: replaces the title header


## Fieldset

Used to wrap forms (or nested form models) in a fieldset

### Values

#### Props

- legend (String): the legend of the fieldset

### Slots

- default: allows for field injection


## Header

A generic wrapper for header sections. Allows for displaying as a page header (e.g. with navigation), or simple headers for smaller sections

### Values

#### Props

- title (String): the title of the section
- color (String, default = 'primary'): the theme of the header

### Slots

- superheader: area above the header
- left: replaces the 'left' section of the included toolbar
- default: the middle section of the toolbar
- right: the right side of the toolbar
- subheader: area below the header (i.e. for navigation)


## History

A component for managing the history API. It is tightly tied to use with vuex

### Mixins

- navigation


## Icon

Allows for definition of an icon, complete with appropriate tooltip.

### Values

### Props

- classes (String): additional classes to append to the icon
- color (String, default = 'primary'): the theme
- disabled (Boolean, default = false): disables the icon
- fab (Boolean, default = false): promotes the icon to a FAB button
- icon (String): if using icon-fonts, allows for definition using code points or ligatures
- id (String, required): the id
- label (String, required): the label used as a tooltip
- position (String): allows for modifying the location of the tooltip

### Slot

- default: replace the icon character(s)


## Input

The wrapper for all input types, including text, password, email, tel, date, etc. Provides additional functionality for character counts, min/max lengths or values, pattern matching, custom error messages, disabled, and required

### Values

#### Props

- cb (Function, default = $emit('input', value): the input callback (can be used to integrate 'vuex' more simply)
- disabled (Boolean): disabled field
- id (String, required): the id
- label (String): label of the input field
- max (Number): same as min, but for max
- message (String): the message to display if the pattern is not matched
- min (Number): the minimum value for number/date, and minimum length for text-based fields
- name (String): the name
- pattern (RegExp): the pattern the value must meet
- required (Boolean): if the field must be filled
- showErrors (Boolean): whether to show any error messages
- type (String, default = 'text'): the type of the input field
- value (String | Boolean | Number | Date): the value of the input field

#### Data

- touched (Boolean): if the field has received focus

#### Computed

- compName (String): the name if provided, otherwise the id
- empty (Boolean): if the field has empty value
- invalid (Boolean): if the field does not meet required, min/max, or pattern, and it has been touched
- isTextField (Boolean): returns true if the field's type can be considered only text
- validBounds (Boolean): if the field has correct min/max values
- validPattern (Boolean): if the pattern is valid

### Methods

- toDate(value): converts a string to a date

### Filters

- errorMessage(message): allows for customization of error message

### Slots

- default: replaces the label


## List

Used to display a list of items in a list-like traditional manner (for small items, see Chips).

### Values

#### Props

- id (String): the id
- items (Array, default = []): the items in the list
- selectable (Boolean, default = false): if an event should be emitted on select
- onSelect (Function, default = $emit('select', value)): event emitter
- displayValue (Function, default = value.label || value): what to display

### Slots

- prefix: to include some elements before the list item
- content: to replace the value portion
- postfix: to append something at the end of the item, like a Badge


## List Filter

A list that has been augmented to include filtering

### Values

#### Props

- those composed from List
- sortable (Boolean, default = true): if the list is sortable
- sortByArgs (String): the property to sort by


## Tabs

NOT COMPLETE

Used to display panels with tabs to navigate between them. If no JS is available, all panels are visible

### Values

#### Props

- id (String, require): the id
- tabs (Array, default = []): the tabs

#### Data

- selected (Array): the currently selected tab

### Methods

- select(index: Number): changes the current selection

### Slots

- tabs-link: the link part of the panel
- tabs-panel: the content part of the panel


## Table

The table is used to display grid-like and/or tabular data. You can provide an array of items, or provide a function to get the data.

### Values

#### Props

- addable (Boolean, default = false): if an add button should be displayed
- displayHeader (Function, default = header.label || header): controls how to display the header, for instance a translation function, or retrieving a property from an object
- filterable (Boolean, default = true): allows for filtering of data
- getItems(Function): if defined will override items and retrieves rows from the given function
- header (Array, default = []): array of header columns
- id (String, required): the id
- items (Array, default = []): the rows
- onAdd (Function, default = $emit('add', {id: this.id}))
- onSelect(Function, default = $emit('select', index)): callback for select
- pageable (Boolean, default = true): if you can page the data
- selectable (Boolean, default = true): emits an event on select
- sortable (Boolean, default = true): allows for sorting of data
- title (String, required): the title of the table

#### Data

- filters (Array, default = []): the filters to apply
- offset (Number, default = 0): the page offset
- pageSize (Number, default = 5): the number of rows to display per page
- sortBy (String, default = this.headers[0]): the column to sort by
- desc (Boolean, default = false): if the sorted rows should be applied reverse
- loading (Boolean, default = true): if the getItems function is in progress

### Methods

- addFilter(): adds a new empty filter
- changeOffset(offset: Number): changes the page
- deleteFilter(index: Number): deletes the filter at an index
- select(index: Number): if selectable, calls onSelect
- sort(header: String): sets sortBy if necessary and clears the offset


## Drawer

NOT CURRENTLY FINISHED

The drawer is used to place navigation or asides in a collapseable sidebar. The props are mainly to define visual effect, like which side it comes from, method of movement, etc.

### Values

#### Props

- display (String, default = 'overlay'): controls how the drawer behaves. 'overlay' is on top, 'push' translates the siblingId over, 'collapse' shrinks the width of the siblingId
- fullscreen (Boolean, default = false): whether the drawer should take up the full vw
- id (String, required): the id
- showing (Boolean): if the drawer is currently open or not
- siblingId (String): when using 'push' display, controls which container is moved
- side (String, default = 'left'): which side of the viewport the drawer comes from

### Methods

- close(): closes the drawer
- open(): opens the meeting
- toggle(): toggles the drawer between open and closed


## Progress

Spinners and determinate progress bars to indicate loading.

### Values

#### Props

- type (String, default = 'circular'): spinner or bar
- determinate (Boolean, default = false): if the indicator should have determined position
- progress (Number, default = 0): the amount of progress that has been completed


## Switch

An accessible checkbox like widget that is more visually indicative for on/off true/false states.

### Values

#### Props

- id (String, required): the id
- label (String, required): the label
- value
- show (Boolean, default = false): whether to include the on/off values
- 'on-value' (String, default = 'on'): which value to display for on/true states
- 'off-value' (String, default = 'off'): inverse of 'on-value';
- value (Boolean): the provided data
- cb (Function, default = $emit('input', !value)): event emitter


## Split Pane

Allows for creation of adjustable columns and rows, for example to create master/detail pages. You can also nest the split-pane with other split panes.

### Values

#### Props

- id (String): the id
- numPanes (Number, default = 2): the number of panes desired
- direction (String, default = 'row'): if 'row' or 'columns' are desired

### Slots

- split-pane-{n}: allows you to inject components into the pane


## Select

Used to replace the native HTML select input with a better styled listbox component

### Values

#### Props

- disabled (Boolean, default = false): disabled
- displayValue (Function, default = value.label || value): what to display of the selected value
- getItems (Function): if defined, allows defining a function to get values
- id (String, required): the id
- label (String, required): the label for the select
- matchValue (Function): how to match the selected value to the items array
- onSelect (Function, default = $emit('input', value)): event emitter
- options (Array): the list items
- required (Boolean, default = false): required
- value (String): the currently selected value

#### Data

- expanded (Boolean): if the listbox is open
- focusable (Array): the focusable nodes in the listbox
- focusedIndex (Number): the index of the currently focused/selected item
- loading (Boolean): if the getItems function is running
- previousFocusedNode: returns focus to the previous node on close
- searchValue (String): the currently searched for text
- selected (Boolean): which value is being selected
- timer (Handle): the name of the function that clears searchValue

#### Computed

- compName (String): the name or id
- items (Array): the items returned from getItems or options
- selectedValue (Object): the currently selected value

### Methods

TODO: clean up focusable


## Select Extensible

Allows for extending the collection of options in a select listbox.

### Values

#### Props

- all of the same as Select
- onAdd (Function): defines what to do when adding

#### Data

- newValue (String): the encoded value
- newValueDecode (String): the value that will be displayed
- adding (Boolean): if they are currently adding a new value

### Methods

- toggleAdd(): allows for adding
- clear(): clears the adding fields

### Slots

- add-fields: overrides the add fields


## Snackbar

NOT COMPLETE

Used to indicate to the user when an event has happened via a small message on the bottom of the page.

### Slots

- message: the snackbar message
- actions: the snackbar actions


## Chips

Chips are method of displaying simple lists, including the options to add and remove elements. Additionally you can customize whether you can sort the items. On sort, emits a 'sort' event

### Mixins

- focusable

### Values

#### Props

- autocomplete (String, default = 'off'): whether a data-list should be included to help with completing the items
- deletable (Boolean): if you can delete chips
- disabled (Boolean, default = false): the entire functioning of the chips is disabled (just displays the items)
- displayValue (Function): defines how to display the value
- getItems (Function): used to get the autocomplete values, `options` is used if this is left undefined
- id (String, required): the id
- label (String, required): the placeholder text for the input field
- name (String): can be used to define the chips input field
- onAdd(Function, default = $emit('input', value)): how to update the list on add.
- options (Array, default = []): the items to include in the data-list, should it be used
- sortable (Boolean, default = true): if you can sort the items
- sortBy (Function, default = localeCompare): define how to sort
- unique (Boolean): if you can include duplicates
- value (Array, default = []): the array of items already in the chips

#### Data

- currValue (String): the chip input fields value

#### Computed

- chips (Array): the list of chips, keyed on `value` prop
- compName (String): the name of the input field, keyed on either `id` or `name`
- focused (Boolean): if the component has focus
- items (Array): the list of options, keyed on `options` prop

### Methods

- addItem(value: String): the item to add
- clear(): emits a new empty array
- deleteItem(index: Number): the index of the item to remove
- handleKeyBoardEvent(event: Event): handle keyboard presses
- sort(): emits a new array with sorted values

### Slots

- deleteIcon: specifies what to display for delete
- actions: replace the native 'sort' and 'clear' buttons
- options: replace the data-list element


## Card

Used to provide the material appearance to specific sections

### Values

#### Props

- hover (Boolean, default = false): if the card should change depth on hover


## Button

Buttons are used for dynamic activity on the page (non-navigation). They can be used to toggle navigation, menus, or to trigger javascript methods on data. To use, attach an @click.native handler to the custom button. NOTE: for FAB buttons, see Icon

### Values

#### Props

- color (String, default = 'primary'): the theme of the button
- disabled (Boolean, default = false): if the button should be non-interactive
- display (String, default = 'raised'): whether the button should appear raised or not
- label (String): the label of the button
- type (String, default = 'button'): defines the type are 'button', 'submit', or 'reset'

### Slots

- default: replaces the label of the button


## Badge

Badges are used for static notifications, such as the number of nodes in a tree, the number of unread messages, or just to signal importance.

### Props

- color (String, default = 'none'): the color of the badge
- value (String): what the badge displays

### Slots

- default: the value to be displayed


## Accordion

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

### Values

#### Props

- autocollapse (default = true): whether other open tabs should close when another is opened
- contentProp: (String, default = 'content'): which property should be used for the content from the `items` array
- id (String, required): the id, used to link a title to content for accessibility
- items (Array, default = []): an array of items to be included
- titleProp (String, default = 'title'): which property should be used for the title from the `items` array

#### Data

- expanded (Array): which accordion tabs are open

### Methods

- toggle(index: Number): opens the tab at the appropriate index

### Slots

- accordion-items: replaces the list of tabs
- accordion-item-title: replaces the tab title
- accordion-item-content: replaces the tab content


## Menu

THIS IS UNFINISHED

A simple dropdown consisting of buttons.

### Slots

- label: the label
- content: the dropdown section
- selected-menuitem: a value to display when selected


## Accordion

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

### Values

#### Props

- autocollapse (default = true): whether other open tabs should close when another is opened
- contentProp: (String, default = 'content'): which property should be used for the content from the `items` array
- id (String, required): the id, used to link a title to content for accessibility
- items (Array, default = []): an array of items to be included
- titleProp (String, default = 'title'): which property should be used for the title from the `items` array

#### Data

- expanded (Array): which accordion tabs are open

### Methods

- toggle(index: Number): opens the tab at the appropriate index

### Slots

- accordion-items: replaces the list of tabs
- accordion-item-title: replaces the tab title
- accordion-item-content: replaces the tab content


## Tree

A recursive component that allows for nested children, such as a directory structure. Each tree node must be an object with properties 'label' and 'children'

### Values

#### Props

- id (String): the id
- tree (Object): the root of the tree, with properties 'label' and 'children'

#### Data

- open (Boolean): if the children are visible

#### Computed

- hasChildren (Boolean): if the tree has children

### Methods

- toggle(): toggles the 'open' state


## Button

Buttons are used for dynamic activity on the page (non-navigation). They can be used to toggle navigation, menus, or to trigger javascript methods on data. To use, attach an @click.native handler to the custom button. NOTE: for FAB buttons, see Icon

### Values

#### Props

- color (String, default = 'primary'): the theme of the button
- disabled (Boolean, default = false): if the button should be non-interactive
- display (String, default = 'raised'): whether the button should appear raised or not
- label (String): the label of the button
- type (String, default = 'button'): defines the type are 'button', 'submit', or 'reset'

### Slots

- default: replaces the label of the button


## Badge

Badges are used for static notifications, such as the number of nodes in a tree, the number of unread messages, or just to signal importance.

### Props

- color (String, default = 'none'): the color of the badge
- value (String): what the badge displays

### Slots

- default: the value to be displayed


## Nav

Navigation section, can be arranged in a horizontal or vertical manner.

### Values

#### Props

- id (String, required): the id
- toggleable (Boolean, default = false): if the navs can be hidden with a toggle
- navs (Array, default = []): the nav items
- column (Boolean, default = true): whether the navs should be horizontal or vertical

#### Data

- expanded (Boolean): if the nav is expanded

### Methods

- toggle(): toggles the expanded state

### Slots

- default: the entire navbar


## Dialog

Dialogs are used to present a windowed experience. Modal dialogs restrict interaction with the rest of the page when the dialog is open.

### Values

#### Props

- cancel (Function): a callback for the 'cancel' action
- confirm (Function): a callback for the 'confirm' action
- content (String): the content for the dialog
- height (String): defines the height of the dialog in percent, based on vh
- id (String, required): the id
- modal (Boolean): defines whether the rest of the page should be interactive
- title (String): the header for the dialog
- type (String): shortcut for defining alerts, comfirm, prompts, or custom
- width (String): defines the width of the dialog in percent, based on vw

#### Data

- component (Component): defines a custom component to render in the dialog
- expanded (Boolean): whether the dialog is open

### Methods

- open() - open the dialog
- close() - hide the dialog
- show(config: Object): allows for supplying a custom component and model to the dialog, and opens it

### Slots

- confirm-text: the label for the confirm button
- cancel-text: the label for the cancel button
- default: replaces the content, as long as there is no component defined
- footer: the footer (including buttons for confirm and cancel)
- title: replaces the title header


## Card

Used to provide the material appearance to specific sections

### Values

#### Props

- hover (Boolean, default = false): if the card should change depth on hover


## Chips

Chips are method of displaying simple lists, including the options to add and remove elements. Additionally you can customize whether you can sort the items. On sort, emits a 'sort' event

### Mixins

- focusable

### Values

#### Props

- autocomplete (String, default = 'off'): whether a data-list should be included to help with completing the items
- deletable (Boolean): if you can delete chips
- disabled (Boolean, default = false): the entire functioning of the chips is disabled (just displays the items)
- displayValue (Function): defines how to display the value
- getItems (Function): used to get the autocomplete values, `options` is used if this is left undefined
- id (String, required): the id
- label (String, required): the placeholder text for the input field
- name (String): can be used to define the chips input field
- onAdd(Function, default = $emit('input', value)): how to update the list on add.
- options (Array, default = []): the items to include in the data-list, should it be used
- sortable (Boolean, default = true): if you can sort the items
- sortBy (Function, default = localeCompare): define how to sort
- unique (Boolean): if you can include duplicates
- value (Array, default = []): the array of items already in the chips

#### Data

- currValue (String): the chip input fields value

#### Computed

- chips (Array): the list of chips, keyed on `value` prop
- compName (String): the name of the input field, keyed on either `id` or `name`
- focused (Boolean): if the component has focus
- items (Array): the list of options, keyed on `options` prop

### Methods

- addItem(value: String): the item to add
- clear(): emits a new empty array
- deleteItem(index: Number): the index of the item to remove
- handleKeyBoardEvent(event: Event): handle keyboard presses
- sort(): emits a new array with sorted values

### Slots

- deleteIcon: specifies what to display for delete
- actions: replace the native 'sort' and 'clear' buttons
- options: replace the data-list element


## Tooltip

A hovering element used to give extra information about an element, such as an icon or abbreviation.

### Values

#### Props

- id (String, required): the id
- label (String, required): the descriptive text
- position (String, default = 'bottom'): the location of the tooltip in relation to the wrapped element

### Slots

- default: the injected element/component


## History

A component for managing the history API. It is tightly tied to use with vuex

### Mixins

- navigation


## Drawer

NOT CURRENTLY FINISHED

The drawer is used to place navigation or asides in a collapseable sidebar. The props are mainly to define visual effect, like which side it comes from, method of movement, etc.

### Values

#### Props

- display (String, default = 'overlay'): controls how the drawer behaves. 'overlay' is on top, 'push' translates the siblingId over, 'collapse' shrinks the width of the siblingId
- fullscreen (Boolean, default = false): whether the drawer should take up the full vw
- id (String, required): the id
- showing (Boolean): if the drawer is currently open or not
- siblingId (String): when using 'push' display, controls which container is moved
- side (String, default = 'left'): which side of the viewport the drawer comes from

### Methods

- close(): closes the drawer
- open(): opens the meeting
- toggle(): toggles the drawer between open and closed


## Fieldset

Used to wrap forms (or nested form models) in a fieldset

### Values

#### Props

- legend (String): the legend of the fieldset

### Slots

- default: allows for field injection


## Header

A generic wrapper for header sections. Allows for displaying as a page header (e.g. with navigation), or simple headers for smaller sections

### Values

#### Props

- title (String): the title of the section
- color (String, default = 'primary'): the theme of the header

### Slots

- superheader: area above the header
- left: replaces the 'left' section of the included toolbar
- default: the middle section of the toolbar
- right: the right side of the toolbar
- subheader: area below the header (i.e. for navigation)


## Select Extensible

Allows for extending the collection of options in a select listbox.

### Values

#### Props

- all of the same as Select
- onAdd (Function): defines what to do when adding

#### Data

- newValue (String): the encoded value
- newValueDecode (String): the value that will be displayed
- adding (Boolean): if they are currently adding a new value

### Methods

- toggleAdd(): allows for adding
- clear(): clears the adding fields

### Slots

- add-fields: overrides the add fields


## List Filter

A list that has been augmented to include filtering

### Values

#### Props

- those composed from List
- sortable (Boolean, default = true): if the list is sortable
- sortByArgs (String): the property to sort by


## Input

The wrapper for all input types, including text, password, email, tel, date, etc. Provides additional functionality for character counts, min/max lengths or values, pattern matching, custom error messages, disabled, and required

### Values

#### Props

- cb (Function, default = $emit('input', value): the input callback (can be used to integrate 'vuex' more simply)
- disabled (Boolean): disabled field
- id (String, required): the id
- label (String): label of the input field
- max (Number): same as min, but for max
- message (String): the message to display if the pattern is not matched
- min (Number): the minimum value for number/date, and minimum length for text-based fields
- name (String): the name
- pattern (RegExp): the pattern the value must meet
- required (Boolean): if the field must be filled
- showErrors (Boolean): whether to show any error messages
- type (String, default = 'text'): the type of the input field
- value (String | Boolean | Number | Date): the value of the input field

#### Data

- touched (Boolean): if the field has received focus

#### Computed

- compName (String): the name if provided, otherwise the id
- empty (Boolean): if the field has empty value
- invalid (Boolean): if the field does not meet required, min/max, or pattern, and it has been touched
- isTextField (Boolean): returns true if the field's type can be considered only text
- validBounds (Boolean): if the field has correct min/max values
- validPattern (Boolean): if the pattern is valid

### Methods

- toDate(value): converts a string to a date

### Filters

- errorMessage(message): allows for customization of error message

### Slots

- default: replaces the label


## Icon

Allows for definition of an icon, complete with appropriate tooltip.

### Values

### Props

- classes (String): additional classes to append to the icon
- color (String, default = 'primary'): the theme
- disabled (Boolean, default = false): disables the icon
- fab (Boolean, default = false): promotes the icon to a FAB button
- icon (String): if using icon-fonts, allows for definition using code points or ligatures
- id (String, required): the id
- label (String, required): the label used as a tooltip
- position (String): allows for modifying the location of the tooltip

### Slot

- default: replace the icon character(s)


## List

Used to display a list of items in a list-like traditional manner (for small items, see Chips).

### Values

#### Props

- id (String): the id
- items (Array, default = []): the items in the list
- selectable (Boolean, default = false): if an event should be emitted on select
- onSelect (Function, default = $emit('select', value)): event emitter
- displayValue (Function, default = value.label || value): what to display

### Slots

- prefix: to include some elements before the list item
- content: to replace the value portion
- postfix: to append something at the end of the item, like a Badge


## Progress

Spinners and determinate progress bars to indicate loading.

### Values

#### Props

- type (String, default = 'circular'): spinner or bar
- determinate (Boolean, default = false): if the indicator should have determined position
- progress (Number, default = 0): the amount of progress that has been completed


## Select

Used to replace the native HTML select input with a better styled listbox component

### Values

#### Props

- disabled (Boolean, default = false): disabled
- displayValue (Function, default = value.label || value): what to display of the selected value
- getItems (Function): if defined, allows defining a function to get values
- id (String, required): the id
- label (String, required): the label for the select
- matchValue (Function): how to match the selected value to the items array
- onSelect (Function, default = $emit('input', value)): event emitter
- options (Array): the list items
- required (Boolean, default = false): required
- value (String): the currently selected value

#### Data

- expanded (Boolean): if the listbox is open
- focusable (Array): the focusable nodes in the listbox
- focusedIndex (Number): the index of the currently focused/selected item
- loading (Boolean): if the getItems function is running
- previousFocusedNode: returns focus to the previous node on close
- searchValue (String): the currently searched for text
- selected (Boolean): which value is being selected
- timer (Handle): the name of the function that clears searchValue

#### Computed

- compName (String): the name or id
- items (Array): the items returned from getItems or options
- selectedValue (Object): the currently selected value

### Methods

TODO: clean up focusable


## Snackbar

NOT COMPLETE

Used to indicate to the user when an event has happened via a small message on the bottom of the page.

### Slots

- message: the snackbar message
- actions: the snackbar actions


## Split Pane

Allows for creation of adjustable columns and rows, for example to create master/detail pages. You can also nest the split-pane with other split panes.

### Values

#### Props

- id (String): the id
- numPanes (Number, default = 2): the number of panes desired
- direction (String, default = 'row'): if 'row' or 'columns' are desired

### Slots

- split-pane-{n}: allows you to inject components into the pane


## Switch

An accessible checkbox like widget that is more visually indicative for on/off true/false states.

### Values

#### Props

- id (String, required): the id
- label (String, required): the label
- value
- show (Boolean, default = false): whether to include the on/off values
- 'on-value' (String, default = 'on'): which value to display for on/true states
- 'off-value' (String, default = 'off'): inverse of 'on-value';
- value (Boolean): the provided data
- cb (Function, default = $emit('input', !value)): event emitter


## Table

The table is used to display grid-like and/or tabular data. You can provide an array of items, or provide a function to get the data.

### Values

#### Props

- addable (Boolean, default = false): if an add button should be displayed
- displayHeader (Function, default = header.label || header): controls how to display the header, for instance a translation function, or retrieving a property from an object
- filterable (Boolean, default = true): allows for filtering of data
- getItems(Function): if defined will override items and retrieves rows from the given function
- header (Array, default = []): array of header columns
- id (String, required): the id
- items (Array, default = []): the rows
- onAdd (Function, default = $emit('add', {id: this.id}))
- onSelect(Function, default = $emit('select', index)): callback for select
- pageable (Boolean, default = true): if you can page the data
- selectable (Boolean, default = true): emits an event on select
- sortable (Boolean, default = true): allows for sorting of data
- title (String, required): the title of the table

#### Data

- filters (Array, default = []): the filters to apply
- offset (Number, default = 0): the page offset
- pageSize (Number, default = 5): the number of rows to display per page
- sortBy (String, default = this.headers[0]): the column to sort by
- desc (Boolean, default = false): if the sorted rows should be applied reverse
- loading (Boolean, default = true): if the getItems function is in progress

### Methods

- addFilter(): adds a new empty filter
- changeOffset(offset: Number): changes the page
- deleteFilter(index: Number): deletes the filter at an index
- select(index: Number): if selectable, calls onSelect
- sort(header: String): sets sortBy if necessary and clears the offset


## Tabs

NOT COMPLETE

Used to display panels with tabs to navigate between them. If no JS is available, all panels are visible

### Values

#### Props

- id (String, require): the id
- tabs (Array, default = []): the tabs

#### Data

- selected (Array): the currently selected tab

### Methods

- select(index: Number): changes the current selection

### Slots

- tabs-link: the link part of the panel
- tabs-panel: the content part of the panel


## Textarea

Used for lengthy sections of text input. Has settings for required, disabled, max lenth, and whether the textarea should resize automatically.

### Values

#### Props

- id (String, required): the id
- name (String): the name, will fall back to id if not provided
- label (String, required): the label
- required (Boolean): if the field needs to be valid
- disabled (Boolean): disable the field
- max (Number): the max character length
- autoresize (Boolean, default = true): if false, a scroll bar will appear if needed
- value (String): the value of the textarea
- cb (Function, default = $emit('input', value)): the callback

#### Data

- touched (Boolean): if the textarea has received focus

#### Computed

- compName (String): the name, or fallback to id
- empty (Boolean): if the length of value is 0
- invalid (Boolean): if the value is invalid
- validLength (Boolean): if the value is less than max

### Methods

- resize(): resize the box to the height of the text content


## Toolbar

Used anywhere that a combination of header and action tools are used, for example a header with a navigation toggle.

### Values

#### Props

- title (String): the header text
- color (String, default = 'primary'): the theme
- display (String, default = 'normal'): allows for different depths, effect, etc, so it can be used as the document header, a section header, or as status bars

### Slots

- left: left section of the header, typically for icon prefixes or navigation toggles
- default: the main section, usually used for the header text
- right: right section, typically has role=toolbar, for dynamic actions


## Menu

THIS IS UNFINISHED

A simple dropdown consisting of buttons.

### Slots

- label: the label
- content: the dropdown section
- selected-menuitem: a value to display when selected


## Accordion

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

### Values

#### Props

- autocollapse (default = true): whether other open tabs should close when another is opened
- contentProp: (String, default = 'content'): which property should be used for the content from the `items` array
- id (String, required): the id, used to link a title to content for accessibility
- items (Array, default = []): an array of items to be included
- titleProp (String, default = 'title'): which property should be used for the title from the `items` array

#### Data

- expanded (Array): which accordion tabs are open

### Methods

- toggle(index: Number): opens the tab at the appropriate index

### Slots

- accordion-items: replaces the list of tabs
- accordion-item-title: replaces the tab title
- accordion-item-content: replaces the tab content


## Tree

A recursive component that allows for nested children, such as a directory structure. Each tree node must be an object with properties 'label' and 'children'

### Values

#### Props

- id (String): the id
- tree (Object): the root of the tree, with properties 'label' and 'children'

#### Data

- open (Boolean): if the children are visible

#### Computed

- hasChildren (Boolean): if the tree has children

### Methods

- toggle(): toggles the 'open' state


## Button

Buttons are used for dynamic activity on the page (non-navigation). They can be used to toggle navigation, menus, or to trigger javascript methods on data. To use, attach an @click.native handler to the custom button. NOTE: for FAB buttons, see Icon

### Values

#### Props

- color (String, default = 'primary'): the theme of the button
- disabled (Boolean, default = false): if the button should be non-interactive
- display (String, default = 'raised'): whether the button should appear raised or not
- label (String): the label of the button
- type (String, default = 'button'): defines the type are 'button', 'submit', or 'reset'

### Slots

- default: replaces the label of the button


## Badge

Badges are used for static notifications, such as the number of nodes in a tree, the number of unread messages, or just to signal importance.

### Props

- color (String, default = 'none'): the color of the badge
- value (String): what the badge displays

### Slots

- default: the value to be displayed


## Nav

Navigation section, can be arranged in a horizontal or vertical manner.

### Values

#### Props

- id (String, required): the id
- toggleable (Boolean, default = false): if the navs can be hidden with a toggle
- navs (Array, default = []): the nav items
- column (Boolean, default = true): whether the navs should be horizontal or vertical

#### Data

- expanded (Boolean): if the nav is expanded

### Methods

- toggle(): toggles the expanded state

### Slots

- default: the entire navbar


## Dialog

Dialogs are used to present a windowed experience. Modal dialogs restrict interaction with the rest of the page when the dialog is open.

### Values

#### Props

- cancel (Function): a callback for the 'cancel' action
- confirm (Function): a callback for the 'confirm' action
- content (String): the content for the dialog
- height (String): defines the height of the dialog in percent, based on vh
- id (String, required): the id
- modal (Boolean): defines whether the rest of the page should be interactive
- title (String): the header for the dialog
- type (String): shortcut for defining alerts, comfirm, prompts, or custom
- width (String): defines the width of the dialog in percent, based on vw

#### Data

- component (Component): defines a custom component to render in the dialog
- expanded (Boolean): whether the dialog is open

### Methods

- open() - open the dialog
- close() - hide the dialog
- show(config: Object): allows for supplying a custom component and model to the dialog, and opens it

### Slots

- confirm-text: the label for the confirm button
- cancel-text: the label for the cancel button
- default: replaces the content, as long as there is no component defined
- footer: the footer (including buttons for confirm and cancel)
- title: replaces the title header


## Card

Used to provide the material appearance to specific sections

### Values

#### Props

- hover (Boolean, default = false): if the card should change depth on hover


## Chips

Chips are method of displaying simple lists, including the options to add and remove elements. Additionally you can customize whether you can sort the items. On sort, emits a 'sort' event

### Mixins

- focusable

### Values

#### Props

- autocomplete (String, default = 'off'): whether a data-list should be included to help with completing the items
- deletable (Boolean): if you can delete chips
- disabled (Boolean, default = false): the entire functioning of the chips is disabled (just displays the items)
- displayValue (Function): defines how to display the value
- getItems (Function): used to get the autocomplete values, `options` is used if this is left undefined
- id (String, required): the id
- label (String, required): the placeholder text for the input field
- name (String): can be used to define the chips input field
- onAdd(Function, default = $emit('input', value)): how to update the list on add.
- options (Array, default = []): the items to include in the data-list, should it be used
- sortable (Boolean, default = true): if you can sort the items
- sortBy (Function, default = localeCompare): define how to sort
- unique (Boolean): if you can include duplicates
- value (Array, default = []): the array of items already in the chips

#### Data

- currValue (String): the chip input fields value

#### Computed

- chips (Array): the list of chips, keyed on `value` prop
- compName (String): the name of the input field, keyed on either `id` or `name`
- focused (Boolean): if the component has focus
- items (Array): the list of options, keyed on `options` prop

### Methods

- addItem(value: String): the item to add
- clear(): emits a new empty array
- deleteItem(index: Number): the index of the item to remove
- handleKeyBoardEvent(event: Event): handle keyboard presses
- sort(): emits a new array with sorted values

### Slots

- deleteIcon: specifies what to display for delete
- actions: replace the native 'sort' and 'clear' buttons
- options: replace the data-list element


## Tooltip

A hovering element used to give extra information about an element, such as an icon or abbreviation.

### Values

#### Props

- id (String, required): the id
- label (String, required): the descriptive text
- position (String, default = 'bottom'): the location of the tooltip in relation to the wrapped element

### Slots

- default: the injected element/component


## History

A component for managing the history API. It is tightly tied to use with vuex

### Mixins

- navigation


## Drawer

NOT CURRENTLY FINISHED

The drawer is used to place navigation or asides in a collapseable sidebar. The props are mainly to define visual effect, like which side it comes from, method of movement, etc.

### Values

#### Props

- display (String, default = 'overlay'): controls how the drawer behaves. 'overlay' is on top, 'push' translates the siblingId over, 'collapse' shrinks the width of the siblingId
- fullscreen (Boolean, default = false): whether the drawer should take up the full vw
- id (String, required): the id
- showing (Boolean): if the drawer is currently open or not
- siblingId (String): when using 'push' display, controls which container is moved
- side (String, default = 'left'): which side of the viewport the drawer comes from

### Methods

- close(): closes the drawer
- open(): opens the meeting
- toggle(): toggles the drawer between open and closed


## Fieldset

Used to wrap forms (or nested form models) in a fieldset

### Values

#### Props

- legend (String): the legend of the fieldset

### Slots

- default: allows for field injection


## Header

A generic wrapper for header sections. Allows for displaying as a page header (e.g. with navigation), or simple headers for smaller sections

### Values

#### Props

- title (String): the title of the section
- color (String, default = 'primary'): the theme of the header

### Slots

- superheader: area above the header
- left: replaces the 'left' section of the included toolbar
- default: the middle section of the toolbar
- right: the right side of the toolbar
- subheader: area below the header (i.e. for navigation)


## Select Extensible

Allows for extending the collection of options in a select listbox.

### Values

#### Props

- all of the same as Select
- onAdd (Function): defines what to do when adding

#### Data

- newValue (String): the encoded value
- newValueDecode (String): the value that will be displayed
- adding (Boolean): if they are currently adding a new value

### Methods

- toggleAdd(): allows for adding
- clear(): clears the adding fields

### Slots

- add-fields: overrides the add fields


## List Filter

A list that has been augmented to include filtering

### Values

#### Props

- those composed from List
- sortable (Boolean, default = true): if the list is sortable
- sortByArgs (String): the property to sort by


## Input

The wrapper for all input types, including text, password, email, tel, date, etc. Provides additional functionality for character counts, min/max lengths or values, pattern matching, custom error messages, disabled, and required

### Values

#### Props

- cb (Function, default = $emit('input', value): the input callback (can be used to integrate 'vuex' more simply)
- disabled (Boolean): disabled field
- id (String, required): the id
- label (String): label of the input field
- max (Number): same as min, but for max
- message (String): the message to display if the pattern is not matched
- min (Number): the minimum value for number/date, and minimum length for text-based fields
- name (String): the name
- pattern (RegExp): the pattern the value must meet
- required (Boolean): if the field must be filled
- showErrors (Boolean): whether to show any error messages
- type (String, default = 'text'): the type of the input field
- value (String | Boolean | Number | Date): the value of the input field

#### Data

- touched (Boolean): if the field has received focus

#### Computed

- compName (String): the name if provided, otherwise the id
- empty (Boolean): if the field has empty value
- invalid (Boolean): if the field does not meet required, min/max, or pattern, and it has been touched
- isTextField (Boolean): returns true if the field's type can be considered only text
- validBounds (Boolean): if the field has correct min/max values
- validPattern (Boolean): if the pattern is valid

### Methods

- toDate(value): converts a string to a date

### Filters

- errorMessage(message): allows for customization of error message

### Slots

- default: replaces the label


## Icon

Allows for definition of an icon, complete with appropriate tooltip.

### Values

### Props

- classes (String): additional classes to append to the icon
- color (String, default = 'primary'): the theme
- disabled (Boolean, default = false): disables the icon
- fab (Boolean, default = false): promotes the icon to a FAB button
- icon (String): if using icon-fonts, allows for definition using code points or ligatures
- id (String, required): the id
- label (String, required): the label used as a tooltip
- position (String): allows for modifying the location of the tooltip

### Slot

- default: replace the icon character(s)


## List

Used to display a list of items in a list-like traditional manner (for small items, see Chips).

### Values

#### Props

- id (String): the id
- items (Array, default = []): the items in the list
- selectable (Boolean, default = false): if an event should be emitted on select
- onSelect (Function, default = $emit('select', value)): event emitter
- displayValue (Function, default = value.label || value): what to display

### Slots

- prefix: to include some elements before the list item
- content: to replace the value portion
- postfix: to append something at the end of the item, like a Badge


## Progress

Spinners and determinate progress bars to indicate loading.

### Values

#### Props

- type (String, default = 'circular'): spinner or bar
- determinate (Boolean, default = false): if the indicator should have determined position
- progress (Number, default = 0): the amount of progress that has been completed


## Select

Used to replace the native HTML select input with a better styled listbox component

### Values

#### Props

- disabled (Boolean, default = false): disabled
- displayValue (Function, default = value.label || value): what to display of the selected value
- getItems (Function): if defined, allows defining a function to get values
- id (String, required): the id
- label (String, required): the label for the select
- matchValue (Function): how to match the selected value to the items array
- onSelect (Function, default = $emit('input', value)): event emitter
- options (Array): the list items
- required (Boolean, default = false): required
- value (String): the currently selected value

#### Data

- expanded (Boolean): if the listbox is open
- focusable (Array): the focusable nodes in the listbox
- focusedIndex (Number): the index of the currently focused/selected item
- loading (Boolean): if the getItems function is running
- previousFocusedNode: returns focus to the previous node on close
- searchValue (String): the currently searched for text
- selected (Boolean): which value is being selected
- timer (Handle): the name of the function that clears searchValue

#### Computed

- compName (String): the name or id
- items (Array): the items returned from getItems or options
- selectedValue (Object): the currently selected value

### Methods

TODO: clean up focusable


## Snackbar

NOT COMPLETE

Used to indicate to the user when an event has happened via a small message on the bottom of the page.

### Slots

- message: the snackbar message
- actions: the snackbar actions


## Split Pane

Allows for creation of adjustable columns and rows, for example to create master/detail pages. You can also nest the split-pane with other split panes.

### Values

#### Props

- id (String): the id
- numPanes (Number, default = 2): the number of panes desired
- direction (String, default = 'row'): if 'row' or 'columns' are desired

### Slots

- split-pane-{n}: allows you to inject components into the pane


## Switch

An accessible checkbox like widget that is more visually indicative for on/off true/false states.

### Values

#### Props

- id (String, required): the id
- label (String, required): the label
- value
- show (Boolean, default = false): whether to include the on/off values
- 'on-value' (String, default = 'on'): which value to display for on/true states
- 'off-value' (String, default = 'off'): inverse of 'on-value';
- value (Boolean): the provided data
- cb (Function, default = $emit('input', !value)): event emitter


## Table

The table is used to display grid-like and/or tabular data. You can provide an array of items, or provide a function to get the data.

### Values

#### Props

- addable (Boolean, default = false): if an add button should be displayed
- displayHeader (Function, default = header.label || header): controls how to display the header, for instance a translation function, or retrieving a property from an object
- filterable (Boolean, default = true): allows for filtering of data
- getItems(Function): if defined will override items and retrieves rows from the given function
- header (Array, default = []): array of header columns
- id (String, required): the id
- items (Array, default = []): the rows
- onAdd (Function, default = $emit('add', {id: this.id}))
- onSelect(Function, default = $emit('select', index)): callback for select
- pageable (Boolean, default = true): if you can page the data
- selectable (Boolean, default = true): emits an event on select
- sortable (Boolean, default = true): allows for sorting of data
- title (String, required): the title of the table

#### Data

- filters (Array, default = []): the filters to apply
- offset (Number, default = 0): the page offset
- pageSize (Number, default = 5): the number of rows to display per page
- sortBy (String, default = this.headers[0]): the column to sort by
- desc (Boolean, default = false): if the sorted rows should be applied reverse
- loading (Boolean, default = true): if the getItems function is in progress

### Methods

- addFilter(): adds a new empty filter
- changeOffset(offset: Number): changes the page
- deleteFilter(index: Number): deletes the filter at an index
- select(index: Number): if selectable, calls onSelect
- sort(header: String): sets sortBy if necessary and clears the offset


## Tabs

NOT COMPLETE

Used to display panels with tabs to navigate between them. If no JS is available, all panels are visible

### Values

#### Props

- id (String, require): the id
- tabs (Array, default = []): the tabs

#### Data

- selected (Array): the currently selected tab

### Methods

- select(index: Number): changes the current selection

### Slots

- tabs-link: the link part of the panel
- tabs-panel: the content part of the panel


## Textarea

Used for lengthy sections of text input. Has settings for required, disabled, max lenth, and whether the textarea should resize automatically.

### Values

#### Props

- id (String, required): the id
- name (String): the name, will fall back to id if not provided
- label (String, required): the label
- required (Boolean): if the field needs to be valid
- disabled (Boolean): disable the field
- max (Number): the max character length
- autoresize (Boolean, default = true): if false, a scroll bar will appear if needed
- value (String): the value of the textarea
- cb (Function, default = $emit('input', value)): the callback

#### Data

- touched (Boolean): if the textarea has received focus

#### Computed

- compName (String): the name, or fallback to id
- empty (Boolean): if the length of value is 0
- invalid (Boolean): if the value is invalid
- validLength (Boolean): if the value is less than max

### Methods

- resize(): resize the box to the height of the text content


## Toolbar

Used anywhere that a combination of header and action tools are used, for example a header with a navigation toggle.

### Values

#### Props

- title (String): the header text
- color (String, default = 'primary'): the theme
- display (String, default = 'normal'): allows for different depths, effect, etc, so it can be used as the document header, a section header, or as status bars

### Slots

- left: left section of the header, typically for icon prefixes or navigation toggles
- default: the main section, usually used for the header text
- right: right section, typically has role=toolbar, for dynamic actions


## Menu

THIS IS UNFINISHED

A simple dropdown consisting of buttons.

### Slots

- label: the label
- content: the dropdown section
- selected-menuitem: a value to display when selected


## Accordion

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

### Values

#### Props

- autocollapse (default = true): whether other open tabs should close when another is opened
- contentProp: (String, default = 'content'): which property should be used for the content from the `items` array
- id (String, required): the id, used to link a title to content for accessibility
- items (Array, default = []): an array of items to be included
- titleProp (String, default = 'title'): which property should be used for the title from the `items` array

#### Data

- expanded (Array): which accordion tabs are open

### Methods

- toggle(index: Number): opens the tab at the appropriate index

### Slots

- accordion-items: replaces the list of tabs
- accordion-item-title: replaces the tab title
- accordion-item-content: replaces the tab content


## Tree

A recursive component that allows for nested children, such as a directory structure. Each tree node must be an object with properties 'label' and 'children'

### Values

#### Props

- id (String): the id
- tree (Object): the root of the tree, with properties 'label' and 'children'

#### Data

- open (Boolean): if the children are visible

#### Computed

- hasChildren (Boolean): if the tree has children

### Methods

- toggle(): toggles the 'open' state


## Button

Buttons are used for dynamic activity on the page (non-navigation). They can be used to toggle navigation, menus, or to trigger javascript methods on data. To use, attach an @click.native handler to the custom button. NOTE: for FAB buttons, see Icon

### Values

#### Props

- color (String, default = 'primary'): the theme of the button
- disabled (Boolean, default = false): if the button should be non-interactive
- display (String, default = 'raised'): whether the button should appear raised or not
- label (String): the label of the button
- type (String, default = 'button'): defines the type are 'button', 'submit', or 'reset'

### Slots

- default: replaces the label of the button


## Badge

Badges are used for static notifications, such as the number of nodes in a tree, the number of unread messages, or just to signal importance.

### Props

- color (String, default = 'none'): the color of the badge
- value (String): what the badge displays

### Slots

- default: the value to be displayed


## Nav

Navigation section, can be arranged in a horizontal or vertical manner.

### Values

#### Props

- id (String, required): the id
- toggleable (Boolean, default = false): if the navs can be hidden with a toggle
- navs (Array, default = []): the nav items
- column (Boolean, default = true): whether the navs should be horizontal or vertical

#### Data

- expanded (Boolean): if the nav is expanded

### Methods

- toggle(): toggles the expanded state

### Slots

- default: the entire navbar


## Dialog

Dialogs are used to present a windowed experience. Modal dialogs restrict interaction with the rest of the page when the dialog is open.

### Values

#### Props

- cancel (Function): a callback for the 'cancel' action
- confirm (Function): a callback for the 'confirm' action
- content (String): the content for the dialog
- height (String): defines the height of the dialog in percent, based on vh
- id (String, required): the id
- modal (Boolean): defines whether the rest of the page should be interactive
- title (String): the header for the dialog
- type (String): shortcut for defining alerts, comfirm, prompts, or custom
- width (String): defines the width of the dialog in percent, based on vw

#### Data

- component (Component): defines a custom component to render in the dialog
- expanded (Boolean): whether the dialog is open

### Methods

- open() - open the dialog
- close() - hide the dialog
- show(config: Object): allows for supplying a custom component and model to the dialog, and opens it

### Slots

- confirm-text: the label for the confirm button
- cancel-text: the label for the cancel button
- default: replaces the content, as long as there is no component defined
- footer: the footer (including buttons for confirm and cancel)
- title: replaces the title header


## Card

Used to provide the material appearance to specific sections

### Values

#### Props

- hover (Boolean, default = false): if the card should change depth on hover


## Chips

Chips are method of displaying simple lists, including the options to add and remove elements. Additionally you can customize whether you can sort the items. On sort, emits a 'sort' event

### Mixins

- focusable

### Values

#### Props

- autocomplete (String, default = 'off'): whether a data-list should be included to help with completing the items
- deletable (Boolean): if you can delete chips
- disabled (Boolean, default = false): the entire functioning of the chips is disabled (just displays the items)
- displayValue (Function): defines how to display the value
- getItems (Function): used to get the autocomplete values, `options` is used if this is left undefined
- id (String, required): the id
- label (String, required): the placeholder text for the input field
- name (String): can be used to define the chips input field
- onAdd(Function, default = $emit('input', value)): how to update the list on add.
- options (Array, default = []): the items to include in the data-list, should it be used
- sortable (Boolean, default = true): if you can sort the items
- sortBy (Function, default = localeCompare): define how to sort
- unique (Boolean): if you can include duplicates
- value (Array, default = []): the array of items already in the chips

#### Data

- currValue (String): the chip input fields value

#### Computed

- chips (Array): the list of chips, keyed on `value` prop
- compName (String): the name of the input field, keyed on either `id` or `name`
- focused (Boolean): if the component has focus
- items (Array): the list of options, keyed on `options` prop

### Methods

- addItem(value: String): the item to add
- clear(): emits a new empty array
- deleteItem(index: Number): the index of the item to remove
- handleKeyBoardEvent(event: Event): handle keyboard presses
- sort(): emits a new array with sorted values

### Slots

- deleteIcon: specifies what to display for delete
- actions: replace the native 'sort' and 'clear' buttons
- options: replace the data-list element


## Tooltip

A hovering element used to give extra information about an element, such as an icon or abbreviation.

### Values

#### Props

- id (String, required): the id
- label (String, required): the descriptive text
- position (String, default = 'bottom'): the location of the tooltip in relation to the wrapped element

### Slots

- default: the injected element/component


## History

A component for managing the history API. It is tightly tied to use with vuex

### Mixins

- navigation


## Drawer

NOT CURRENTLY FINISHED

The drawer is used to place navigation or asides in a collapseable sidebar. The props are mainly to define visual effect, like which side it comes from, method of movement, etc.

### Values

#### Props

- display (String, default = 'overlay'): controls how the drawer behaves. 'overlay' is on top, 'push' translates the siblingId over, 'collapse' shrinks the width of the siblingId
- fullscreen (Boolean, default = false): whether the drawer should take up the full vw
- id (String, required): the id
- showing (Boolean): if the drawer is currently open or not
- siblingId (String): when using 'push' display, controls which container is moved
- side (String, default = 'left'): which side of the viewport the drawer comes from

### Methods

- close(): closes the drawer
- open(): opens the meeting
- toggle(): toggles the drawer between open and closed


## Fieldset

Used to wrap forms (or nested form models) in a fieldset

### Values

#### Props

- legend (String): the legend of the fieldset

### Slots

- default: allows for field injection


## Header

A generic wrapper for header sections. Allows for displaying as a page header (e.g. with navigation), or simple headers for smaller sections

### Values

#### Props

- title (String): the title of the section
- color (String, default = 'primary'): the theme of the header

### Slots

- superheader: area above the header
- left: replaces the 'left' section of the included toolbar
- default: the middle section of the toolbar
- right: the right side of the toolbar
- subheader: area below the header (i.e. for navigation)


## Select Extensible

Allows for extending the collection of options in a select listbox.

### Values

#### Props

- all of the same as Select
- onAdd (Function): defines what to do when adding

#### Data

- newValue (String): the encoded value
- newValueDecode (String): the value that will be displayed
- adding (Boolean): if they are currently adding a new value

### Methods

- toggleAdd(): allows for adding
- clear(): clears the adding fields

### Slots

- add-fields: overrides the add fields


## List Filter

A list that has been augmented to include filtering

### Values

#### Props

- those composed from List
- sortable (Boolean, default = true): if the list is sortable
- sortByArgs (String): the property to sort by


## Input

The wrapper for all input types, including text, password, email, tel, date, etc. Provides additional functionality for character counts, min/max lengths or values, pattern matching, custom error messages, disabled, and required

### Values

#### Props

- cb (Function, default = $emit('input', value): the input callback (can be used to integrate 'vuex' more simply)
- disabled (Boolean): disabled field
- id (String, required): the id
- label (String): label of the input field
- max (Number): same as min, but for max
- message (String): the message to display if the pattern is not matched
- min (Number): the minimum value for number/date, and minimum length for text-based fields
- name (String): the name
- pattern (RegExp): the pattern the value must meet
- required (Boolean): if the field must be filled
- showErrors (Boolean): whether to show any error messages
- type (String, default = 'text'): the type of the input field
- value (String | Boolean | Number | Date): the value of the input field

#### Data

- touched (Boolean): if the field has received focus

#### Computed

- compName (String): the name if provided, otherwise the id
- empty (Boolean): if the field has empty value
- invalid (Boolean): if the field does not meet required, min/max, or pattern, and it has been touched
- isTextField (Boolean): returns true if the field's type can be considered only text
- validBounds (Boolean): if the field has correct min/max values
- validPattern (Boolean): if the pattern is valid

### Methods

- toDate(value): converts a string to a date

### Filters

- errorMessage(message): allows for customization of error message

### Slots

- default: replaces the label


## Icon

Allows for definition of an icon, complete with appropriate tooltip.

### Values

### Props

- classes (String): additional classes to append to the icon
- color (String, default = 'primary'): the theme
- disabled (Boolean, default = false): disables the icon
- fab (Boolean, default = false): promotes the icon to a FAB button
- icon (String): if using icon-fonts, allows for definition using code points or ligatures
- id (String, required): the id
- label (String, required): the label used as a tooltip
- position (String): allows for modifying the location of the tooltip

### Slot

- default: replace the icon character(s)


## List

Used to display a list of items in a list-like traditional manner (for small items, see Chips).

### Values

#### Props

- id (String): the id
- items (Array, default = []): the items in the list
- selectable (Boolean, default = false): if an event should be emitted on select
- onSelect (Function, default = $emit('select', value)): event emitter
- displayValue (Function, default = value.label || value): what to display

### Slots

- prefix: to include some elements before the list item
- content: to replace the value portion
- postfix: to append something at the end of the item, like a Badge


## Progress

Spinners and determinate progress bars to indicate loading.

### Values

#### Props

- type (String, default = 'circular'): spinner or bar
- determinate (Boolean, default = false): if the indicator should have determined position
- progress (Number, default = 0): the amount of progress that has been completed


## Select

Used to replace the native HTML select input with a better styled listbox component

### Values

#### Props

- disabled (Boolean, default = false): disabled
- displayValue (Function, default = value.label || value): what to display of the selected value
- getItems (Function): if defined, allows defining a function to get values
- id (String, required): the id
- label (String, required): the label for the select
- matchValue (Function): how to match the selected value to the items array
- onSelect (Function, default = $emit('input', value)): event emitter
- options (Array): the list items
- required (Boolean, default = false): required
- value (String): the currently selected value

#### Data

- expanded (Boolean): if the listbox is open
- focusable (Array): the focusable nodes in the listbox
- focusedIndex (Number): the index of the currently focused/selected item
- loading (Boolean): if the getItems function is running
- previousFocusedNode: returns focus to the previous node on close
- searchValue (String): the currently searched for text
- selected (Boolean): which value is being selected
- timer (Handle): the name of the function that clears searchValue

#### Computed

- compName (String): the name or id
- items (Array): the items returned from getItems or options
- selectedValue (Object): the currently selected value

### Methods

TODO: clean up focusable


## Snackbar

NOT COMPLETE

Used to indicate to the user when an event has happened via a small message on the bottom of the page.

### Slots

- message: the snackbar message
- actions: the snackbar actions


## Split Pane

Allows for creation of adjustable columns and rows, for example to create master/detail pages. You can also nest the split-pane with other split panes.

### Values

#### Props

- id (String): the id
- numPanes (Number, default = 2): the number of panes desired
- direction (String, default = 'row'): if 'row' or 'columns' are desired

### Slots

- split-pane-{n}: allows you to inject components into the pane


## Switch

An accessible checkbox like widget that is more visually indicative for on/off true/false states.

### Values

#### Props

- id (String, required): the id
- label (String, required): the label
- value
- show (Boolean, default = false): whether to include the on/off values
- 'on-value' (String, default = 'on'): which value to display for on/true states
- 'off-value' (String, default = 'off'): inverse of 'on-value';
- value (Boolean): the provided data
- cb (Function, default = $emit('input', !value)): event emitter


## Table

The table is used to display grid-like and/or tabular data. You can provide an array of items, or provide a function to get the data.

### Values

#### Props

- addable (Boolean, default = false): if an add button should be displayed
- displayHeader (Function, default = header.label || header): controls how to display the header, for instance a translation function, or retrieving a property from an object
- filterable (Boolean, default = true): allows for filtering of data
- getItems(Function): if defined will override items and retrieves rows from the given function
- header (Array, default = []): array of header columns
- id (String, required): the id
- items (Array, default = []): the rows
- onAdd (Function, default = $emit('add', {id: this.id}))
- onSelect(Function, default = $emit('select', index)): callback for select
- pageable (Boolean, default = true): if you can page the data
- selectable (Boolean, default = true): emits an event on select
- sortable (Boolean, default = true): allows for sorting of data
- title (String, required): the title of the table

#### Data

- filters (Array, default = []): the filters to apply
- offset (Number, default = 0): the page offset
- pageSize (Number, default = 5): the number of rows to display per page
- sortBy (String, default = this.headers[0]): the column to sort by
- desc (Boolean, default = false): if the sorted rows should be applied reverse
- loading (Boolean, default = true): if the getItems function is in progress

### Methods

- addFilter(): adds a new empty filter
- changeOffset(offset: Number): changes the page
- deleteFilter(index: Number): deletes the filter at an index
- select(index: Number): if selectable, calls onSelect
- sort(header: String): sets sortBy if necessary and clears the offset


## Tabs

NOT COMPLETE

Used to display panels with tabs to navigate between them. If no JS is available, all panels are visible

### Values

#### Props

- id (String, require): the id
- tabs (Array, default = []): the tabs

#### Data

- selected (Array): the currently selected tab

### Methods

- select(index: Number): changes the current selection

### Slots

- tabs-link: the link part of the panel
- tabs-panel: the content part of the panel


## Textarea

Used for lengthy sections of text input. Has settings for required, disabled, max lenth, and whether the textarea should resize automatically.

### Values

#### Props

- id (String, required): the id
- name (String): the name, will fall back to id if not provided
- label (String, required): the label
- required (Boolean): if the field needs to be valid
- disabled (Boolean): disable the field
- max (Number): the max character length
- autoresize (Boolean, default = true): if false, a scroll bar will appear if needed
- value (String): the value of the textarea
- cb (Function, default = $emit('input', value)): the callback

#### Data

- touched (Boolean): if the textarea has received focus

#### Computed

- compName (String): the name, or fallback to id
- empty (Boolean): if the length of value is 0
- invalid (Boolean): if the value is invalid
- validLength (Boolean): if the value is less than max

### Methods

- resize(): resize the box to the height of the text content


## Toolbar

Used anywhere that a combination of header and action tools are used, for example a header with a navigation toggle.

### Values

#### Props

- title (String): the header text
- color (String, default = 'primary'): the theme
- display (String, default = 'normal'): allows for different depths, effect, etc, so it can be used as the document header, a section header, or as status bars

### Slots

- left: left section of the header, typically for icon prefixes or navigation toggles
- default: the main section, usually used for the header text
- right: right section, typically has role=toolbar, for dynamic actions


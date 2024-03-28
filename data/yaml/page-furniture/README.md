# Sidebars

See also [Sidebar (Component)](../../../src/components/Sidebar) for more information on how this Sidebar is rendered.

## Format

The format of a Sidebar YAML file is defined as follows:

### Link Sidebars

A link sidebar represents an expandable menu of links.

#### Root

* The root must have a ```name``` element that we can use to identify the sidebar
* The root must have a single ```items``` entry that contains the sidebar content

```yaml
name: "Example Sidebar"
items:
    - ...
```

#### Array Entries

* An array entry must have a ```label``` element that will be a string of text to identify a menu item
* An array entry must have a ```link``` element that will be a link that can be accessed via. sub-menu items
* An array entry _may_ have an ```external``` element that is `true` or `false`, which should be set to `true` if the destination page is not in the docs project
* An array entry _may_ have a ```text``` or ```items``` element that will be the content that can be expanded or hidden in the menu
  * An array entry should not have both a ```text``` and ```items``` element. In the event that both exist, the ```items``` will be used and ```text``` ignored
* An array entry _may_ have a ```level``` element that will be used to determine ```aria-level```
  *  In the event that it does not, a value of ```3``` will be used

```yaml
- label: 'Example label'
- link: 'Example link'
- text: 'Content string'
- items:
    - ...
- level: 3
```

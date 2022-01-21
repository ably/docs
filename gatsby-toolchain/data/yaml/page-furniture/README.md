# Sidebars

See also [Sidebar (Component)](../../../src/components/Sidebar) for more information on how this Sidebar is rendered.

## Format

The format of a Sidebar YAML file is defined as follows:

### Link Sidebars

A link sidebar represents an expandable menu of links.

#### Root

* The root must have a ```name``` element that we can use to identify the sidebar
* The root must have a single ```contentArray``` entry that contains the sidebar content

```yaml
name: "Example Sidebar"
contentArray:
    - ...
```

#### Array Entries

* An array entry must have a ```label``` element that will be a string of text to identify a menu item
* An array entry must have a ```link``` element that will be a link that can be accessed via. sub-menu items
* An array entry _may_ have a ```contentString``` or ```contentArray``` element that will be the content that can be expanded or hidden in the menu
  * An array entry should not have both a ```contentString``` and ```contentArray``` element. In the event that both exist, the ```contentArray``` will be used and ```contentString``` ignored
* An array entry _may_ have a ```level``` element that will be used to determine ```aria-level```
  *  In the event that it does not, a value of ```3``` will be used

# Sidebar

The sidebar component is intended to be powered by data provided by the [StaticQuerySidebar](../StaticQuerySidebar) folder.

The files you want to look at are as follows:

## Styling

Styling should be fully independent of functionality. We use React styled components, tailwind, and try to be consistent with other frontend projects such as the main Ably website & Voltaire.

- [StickySidebar](./StickySidebar.js)

## SidebarLinkMenu

Recursively render a menu of links that is capable of being expanded.

- [SidebarLinkMenu](./SidebarLinkMenu.js): Containing an array of either a ```SidebarLinkItem```, if ```content``` exists, or a plain Gatsby ```Link``` otherwise.
- [SidebarLinkItem](./SidebarLinkItem.js): Containing a ```SidebarItem``` with either a ```SidebarLinkMenu``` (if ```content``` is an ```Array```) or a plain Gatsby ```Link``` otherwise.
- [SidebarItem](./SidebarItem.js): The complete ```Accordion``` component that allows for expandable menus.

Given a YAML file similar to:

```yaml
name: "Example"
items:
  - label: "Example Parent Heading"
    link: "/relative-url"
    level: 3
    text: "Example string"
```

The SidebarLinkMenu will render an unordered list of links containing the label, link, and content (if any) in an expandable and collapsible way.

The level will correspond to the [aria-level](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-level) of the element. If left blank, it will default to 3. This corresponds semantically with the ```<h3></h3>``` HTML element.

**Due to how GraphQL works, we only currently support nesting a few levels deep; if you add a sub-menu and it does not show up, this is why.**

Add extra sections to the following GraphQL to expand how deeply-nested the menus can be:

**Support one level deep:**
```
{
    items {
        ...SubMenuFields
    }
}
```

**Support two levels deep:**
```
{
    items {
        ...SubMenuFields
        items {
            ...SubMenuFields
        }
    }
}
```

This pattern can be expanded indefinitely.

### Examples:

#### With Collapsible Content
```yaml
name: "Example"
items:
  - label: "Example Parent Heading"
    link: "/relative-url"
    text: "Example string"
```

Resulting in:

```JSX
<SidebarLinkMenu>
    <SidebarLinkItem>
        <SidebarItem label={'Example Parent Heading'} content={'Example string'}/>
    </SidebarLinkItem>
</SidebarLinkMenu>
```

#### With Collapsible SubMenus

```yaml
name: "Example"
items:
  - label: "Example Parent Heading"
    link: "/relative-url"
    text:
          - label: "Example Child Heading"
            link: "/relative-url"
```

Resulting in:

```JSX
<SidebarLinkMenu>
    <SidebarLinkItem>
        <SidebarItem label={'Example Parent Heading'}>
            <SidebarLinkMenu>
                <SidebarLinkItem>
                    <Link to={'/relative-url'}>Example Child Heading</Link>
                </SidebarLinkItem>
            </SidebarLinkMenu>
        </SidebarItem>
    </SidebarLinkItem>
</SidebarLinkMenu>
```
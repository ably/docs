# LanguageDropdownSelector

LanguageDropdownSelector relies heavily on the 'react-select' component, the reason being that it gives us good flexibility but (more importantly) is excellent for the purposes of accessibility.

However, the API is not always intuitive. Here are some quick reference points if you are struggling to modify this component.

## Modifying Styles

Modifying styles is achieved through an interface that maps provided styles into an object with custom styles:

```
(provided) => ({ ...provided, myCustomStyleRule: '1px' });
```

The TypeScript signature of these is always (for our purposes):

```
import { MyComponentProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from '../react-select-option-types';

export const myComponentStyles: StylesConfigFunction<
  MyComponentProps<ReactSelectOption, false, ReactSelectOptGroup>
> = ...
```

For example, the `control` component is styled using `ControlProps`. Other than that, the TypeScript signature should always be the same.

Save these functions separately in `/src/components/Menu/ReactSelectStyles`.

Try to make these shareable between dropdowns as much as possible, if they are not reasonably shareable between dropdowns consider creating a separate folder.

If you cannot find a way to style a component the way that you want, you can try to completely replace it using the `components` prop, described [in the official documentation](https://react-select.com/components).

Styles can be modified based on `state` as well, as follows:

```
(provided, state) => ({ ...provided, myCustomStyleRule: state.isFocused ? '1px' : '0px' });
```

Options to drive state-based styling include:

```
/** Text to be displayed representing the option. */
label: string;
/** The data of the selected option. */
data: Option;
isDisabled: boolean;
isFocused: boolean;
isSelected: boolean;
```

## Useful Tips

### Debugging Styles

You can set `menuIsOpen` on the React Select element to keep the menu permanently open so you can inspect CSS styles, how components render, and so forth:

```
<Select menuIsOpen={true} />
```

### Menu Positioning Issues

If the React Select dropdown menu is appearing in the wrong place, make sure you set `menuPosition` to the CSS position property of the containing element.

For example:

```
<Select menuPosition="fixed" />
```

### Setting Widths

You will often need to make sure multiple components have their widths set in order for the changes to take effect, for example both the control and the options widths usually need to be the same.

It is very difficult to set some subcomponents to have greater widths than their parent components, for example the menuList or option components cannot usually be wider than the control component.

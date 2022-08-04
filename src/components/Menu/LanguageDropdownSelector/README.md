# LanguageDropdownSelector

LanguageDropdownSelector relies heavily on the 'react-select' component, the reason being that it gives us good flexibility but (more importantly) is excellent for the purposes of accessibility.

However, the API is not always intuitive. Here are some quick reference points if you are struggling to modify this component.

## Modifying Styles

Modifying styles is achieved through an interface that maps provided styles into an object with custom styles:

```
(provided) => ({ ...provided, myCustomStyleRule: '1px' })
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

## Useful Tips

You can set `menuIsOpen` on the React Select element to keep the menu permanently open so you can inspect CSS styles, how components render, and so forth:

```
<Select menuIsOpen={true} />
```

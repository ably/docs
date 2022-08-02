# Wrappers

These concrete examples are to demonstrate why I am using Wrappers for certain cross-cutting concerns in this application instead of HOCs.

The advantages are that:
1. They do not lock in the data provided at the time the Component is wrapped
2. They can access hooks without misnaming them to look like plain Components

The drawbacks are that they are more verbose and more magical than HOCs:
1. It is not obvious that something is being done to the wrapped component
2. It is less obvious what is being done to the wrapped component
3. Props need to be passed to both components to function as expected

Wherever HOCs can be used without great effort, they should be preferred.

## Higher Order Component Counter-Example

```jsx
const myHOC = (Block, data) => <Block>{myDataOperation(data)}</Block>;
const WrappedBlock = myHOC(MyCustomBlock, 'Hello World!');
<WrappedBlock data={'Hello Mars!'}/>
/** Renders 'Hello World!' */
```

## Wrapper Example

```jsx
const MyWrapper = ({ data, children }) => {
    const [state, setState] = useState(myState);
    useEffect(myEffect));
    useContext(myContextProvider);
    return <>{children.map(myCloneDataOperation)}</>;
};
const WrappedBlock = ({ data }) => <MyWrapper data={data}><MyCustomBlock data={data}></MyCustomBlock></MyWrapper>;
<WrappedBlock data={'Hello Mars!'}/>
/** Renders 'Hello Mars!' */
```

## Specific Wrappers

### ConditionalChildrenLanguageDisplay

In pseudocode, this is how the ConditionalChildrenLanguageDisplay wrapper works:

1. For every element
2. If the inner data is just a string of 0 or more whitespace elements, ignore it
3. Otherwise if the value attribs.lang exists, and is not supposed to be ignored for menu display purposes, run the following and then continue the loop
    4. if there's no group of consecutive language elements already, create it
    5. Otherwise if there is a group of consecutive languages, and the attribs.lang of the current element is already in that group, push the current group of consecutive language elements to the list of groups, and make a new group of consecutive elements with just the current element
    6. Otherwise, mark the end of the current group at this point, and run a function to assign which language is the primary language, which will set the data to null if we don't want to populate a LocalLanguageAlternatives menu with data
7. if the value attribs.lang does not exist, but there is a currentGroup, run a function to check if we need to add the currentGroup to the list of filtered elements, and push the currentGroup to the list of groups. Run this step again after the forEach loop has completed.
8. if we get this far (i.e. if **3.** does not apply), set the currentGroup back to 'false' and the toFilter[index] to 'false'

Immediately after this forEach loop:

1. For every element
2. If the element is in the list of filtered elements, ignore it.
3. Otherwise, if there is a group in the list of groups with the same index AND truthy data, return the necessary data to populate a LocalLanguageAlternatives menu
4. Otherwise, return the element unchanged
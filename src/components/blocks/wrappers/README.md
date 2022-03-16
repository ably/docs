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
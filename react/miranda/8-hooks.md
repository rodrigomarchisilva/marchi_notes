# Hooks

Hooks should be used only outside of blocks, loops, and conditionals, in the top level of the functional component.

## useState

It replaces the `this.state` and `this.setState` from the class component.

~~~js
const initialState = { key: 'value' };
const [state, setState] = useState(initialState);
if (condition) setState({ key: 'new value' });
~~~

The state can be used inside setState in two ways:

~~~js
setState((prevState) => prevState + 1); // with callback (recommended)
setState(state + 1); // directly
~~~

## useEffect

It replaces the `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` from the class component.

~~~js
useEffect(() => {componentDidMount}, []);
useEffect(() => {componentDidUpdate});
useEffect(() => {componentDidUpdate}, [state1, state2, state3]); // based on passed state(s)
useEffect(() => { return () => {componentWillUnmount} }, []);
useEffect(() => () => {componentWillUnmount}, []); // shorter version of above
useEffect(() => () => {componentWillUnmount}, [state]); // runs componentWillUnmount every time state changes
~~~

## useCallback

It caches the function so it doesn't re-create it every time the component re-renders.

~~~js
const handleClick = useCallback(() => {
  // do something
}, [someDependency]);

return <ChildComponent onClick={handleClick} />
~~~

> - Mainly used when passing a callback function to a child component to avoid unnecessary re-renders.
> - It can be used without dependencies, using prevState instead of state.

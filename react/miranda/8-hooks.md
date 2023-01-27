# Hooks

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

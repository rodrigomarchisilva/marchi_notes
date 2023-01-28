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

## useMemo

It caches the value so it doesn't re-calculate it every time the component re-renders. It's similar to `useCallback` but for values instead of functions.

~~~js
const [apiData, setApiData] = useState([]);
const [inputValue, setInputValue] = useState('');

useEffect(() => {
  fetch('https://api.example.com')
    .then(response => response.json())
    .then(data => setApiData(data));
}, []);

const handleInputChange = useCallback(({target: { value }}) => {
  setInputValue(value);
}, []);

const apiData = useMemo(() => {
  return apiData.map(item => <li>{item}</li>);
}, [apiData]);

return (
  <div>
    <input type="text" value={inputValue} onChange={handleInputChange} />
    <ul>
      {apiData}
    </ul>
  </div>
);
~~~

> Could be used to avoid unnecessary re-renders when changing the state of an input.

## useRef

Create a reference that is retained across renders. It returns an object with a single property, `current`, which you can update to store a value.

~~~js
// Storing a reference to a DOM element
const inputRef = useRef(null);

const handleClick = () => {
  inputRef.current.focus();
};

return (
  <>
    <input ref={inputRef} type="text" />
    <button onClick={handleClick}>Focus Input</button>
  </>
);

// Storing a reference to a JavaScript object

const ref = useRef({});
ref.current = { key: 'value' };

// Storing a reference to a value

const ref = useRef(0);
ref.current = ref.current + 1;
~~~

> `useRef` is not a Hook itself, it is just a utility function to create a reference. The real magic happens when you used with other Hooks such as `useEffect`, `useState`, `useCallback` and `useMemo`.

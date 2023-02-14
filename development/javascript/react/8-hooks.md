<!-- markdownlint-disable MD024 MD033 -->

# Hooks

Hooks should be used only outside of blocks, loops, and conditionals, in the top level of the functional component.

- [Hooks](#hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useLayoutEffect](#uselayouteffect)
  - [useCallback](#usecallback)
  - [useMemo](#usememo)
  - [useRef](#useref)
  - [forwardRef](#forwardref)
  - [useImperativeHandle](#useimperativehandle)
  - [useReducer](#usereducer)
  - [useDebugValue](#usedebugvalue)
  - [Hooks flow](#hooks-flow)

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

## useLayoutEffect

Very similar to `useEffect`, but should only be used when changes to the layout of a component are critical, and when using useEffect would result in visible changes that the user would need to correct.

~~~js
import React, { useState, useLayoutEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
};
~~~

> This ensures that any changes made to the DOM will be visible to the user in the next render.

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

## forwardRef

It allows you to pass a ref through a component to one of its children.

~~~js
const ChildComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <p>{props.text}</p>
    </div>
  );
});

const ParentComponent = () => {
  const ref = useRef(null);
  return (
    <div>
      <ChildComponent ref={ref} text="Hello" />
      <button onClick={() => ref.current.focus()}>Focus Child</button>
    </div>
  );
};
~~~

## useImperativeHandle

`useImperativeHandle` is a React hook that allows you to control what a parent component can access in a custom component created with React.`forwardRef`. It is used to modify the `ref` object passed to a component and expose its methods or properties, like an `onClick` of a `button`.

~~~js
const ChildComponent = React.forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    clear: () => {
      inputRef.current.value = '';
    },
  }));

  return <input ref={inputRef} {...props} />;
});

const ParentComponent = () => {
  const inputRef = useRef(null);

  return (
    <div>
      <ChildComponent ref={inputRef} />
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </div>
  );
};
~~~

## useReducer

It is a more complex version of `useState` that allows you to manage complex state logic.

~~~js
const initialState = {
  inputValue: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'action':
      return { ...state, inputValue: action.payload };
    default:
      return state;
  }
};

const Component = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputValue } = state;

  const handleInputChange = ({ target: { value } }) => {
    const action = { type: 'action', payload: value };
    dispatch(action);
  };

  return <input type="text" value={inputValue} onChange={handleInputChange} />;
};
~~~

> Typically used when you have a complex state management with multiple state updates or when you have a component that is connected to a global store.

## useDebugValue

It is used to debug hooks in React DevTools. As an example, it can be used to display the parameters received by a hook.

~~~js
import { useDebugValue } from 'react';

const useMyHook = (value) => {
  useDebugValue(value);
  const [value, setValue] = useState(value);
  return [value, setValue];
};
~~~

It has a second parameter that receives a function that will be used to format the value displayed in React DevTools.

~~~js
import { useDebugValue } from 'react';

const useMyHook = (value) => {
  useDebugValue(value, (value) => `Value: ${value}`);
  const [value, setValue] = useState(value);
  return [value, setValue];
};
~~~

## Hooks flow

Hooks with the same priority are executed in the order they are declared.

<table>
    <thead>
        <tr>
            <th style="text-align: center">Mount</th>
            <th style="text-align: center">Update</th>
            <th style="text-align: center">Unmount</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Run lazy initializers</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Render</td>
            <td>Render</td>
            <td></td>
        </tr>
        <tr>
            <td>React updates DOM</td>
            <td>React updates DOM</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Cleanup LayoutEffects</td>
            <td>Cleanup LayoutEffects</td>
        </tr>
        <tr>
            <td>Run LayoutEffects</td>
            <td>Run LayoutEffects</td>
            <td></td>
        </tr>
        <tr>
            <td>Browser paints screen</td>
            <td>Browser paints screen</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Cleanup Effects</td>
            <td>Cleanup Effects</td>
        </tr>
        <tr>
            <td>Run Effects</td>
            <td>Run Effects</td>
            <td></td>
        </tr>
    </tbody>
</table>

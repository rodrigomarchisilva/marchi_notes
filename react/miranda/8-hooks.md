# Hooks

Hooks should be used only outside of blocks, loops, and conditionals, in the top level of the functional component.

- [Hooks](#hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useCallback](#usecallback)
  - [useMemo](#usememo)
  - [useRef](#useref)
  - [useContext](#usecontext)
    - [Real world example](#real-world-example)
  - [useReducer](#usereducer)
  - [Using useContext with useReducer](#using-usecontext-with-usereducer)
  - [Custom Hook example](#custom-hook-example)
  - [Folder structure for context](#folder-structure-for-context)

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

## useContext

It allows you to pass data through the component tree without having to pass props down manually at every level.

~~~js
const initialState = { state: 'value', setState: () => {} };
const Context = React.createContext(initialState);

const ParentComponent = () => {
  const [state, setState] = useState(initialState.state);
  return (
    <Context.Provider value={{ state, setState }}>
      <ChildComponent />
    </Context.Provider>
  );
};

const ChildComponent = () => {
  const { state, setState } = useContext(Context);
  return (
    <div>
      <p>{state.key}</p>
      <button onClick={() => setState({ key: 'new value' })}>Change value</button>
    </div>
  );
};
~~~

### Real world example

- src/contexts/data.js

~~~js
export const initialState = {
  user: null,
  setUser: () => {},
};
~~~

- src/contexts/index.jsx

~~~js
import { createContext, useState } from 'react';
import { initialState } from './data';
const Context = createContext(initialState);

const Provider = ({ children }) => {
  const [user, setUser] = useState(initialState.user);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
~~~

- src/components/ParentComponent.jsx

~~~js
import { Provider } from '../context';

const ParentComponent = () => {
  return (
    <Provider>
      <ChildComponent />
    </Provider>
  );
};
~~~

- src/components/ChildComponent.jsx

~~~js
import { useContext } from 'react';
import { Context } from '../context';

const ChildComponent = () => {
  const { user, setUser } = useContext(Context);
  return (
    <div>
      <p>{user}</p>
      <button onClick={() => setUser('new user')}>Change user</button>
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

## Using useContext with useReducer

- src/contexts/data.js

~~~js
export const initialState = {
  inputValue: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'action':
      return { ...state, inputValue: action.payload };
    default:
      return state;
  }
};
~~~

- src/contexts/index.jsx

~~~js
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './data';

export const Context = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
~~~

- src/components/ParentComponent.jsx

~~~js
import { Provider } from '../context';

const ParentComponent = () => {
  return (
    <Provider>
      <ChildComponent />
    </Provider>
  );
};
~~~

- src/components/ChildComponent.jsx

~~~js
import { useContext } from 'react';
import { Context } from '../context';

const ChildComponent = () => {
  const { state, dispatch } = useContext(Context);
  const { inputValue } = state;

  const handleInputChange = ({ target: { value } }) => {
    const action = { type: 'action', payload: value };
    dispatch(action);
  };

  return <input type="text" value={inputValue} onChange={handleInputChange} />;
};
~~~

## Custom Hook example

- src/hooks/useFetch.js

~~~js
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading, error };
};
~~~

- src/components/ExampleComponent.jsx

~~~js
function ExampleComponent() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.title}</div>;
}
~~~

## Folder structure for context

~~~properties
src
├── templates
├── components
├── hooks
├── context
│   ├── ExampleContext
│   │   ├── index.jsx
│   │   ├── context.js
│   │   ├── reducer.js
│   │   ├── actions.js
│   │   ├── types.js
│   │   └── data.js
~~~

<!-- markdownlint-disable MD024 -->

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
  - [useContext](#usecontext)
  - [Real world example of useContext](#real-world-example-of-usecontext)
    - [src/contexts/data.js](#srccontextsdatajs)
    - [src/contexts/index.jsx](#srccontextsindexjsx)
    - [src/components/ParentComponent.jsx](#srccomponentsparentcomponentjsx)
    - [src/components/ChildComponent.jsx](#srccomponentschildcomponentjsx)
  - [useReducer](#usereducer)
  - [Using useContext with useReducer](#using-usecontext-with-usereducer)
    - [src/contexts/data.js](#srccontextsdatajs-1)
    - [src/contexts/index.jsx](#srccontextsindexjsx-1)
    - [src/components/ChildComponent.jsx](#srccomponentschildcomponentjsx-1)
  - [Structure to use Context API](#structure-to-use-context-api)
    - [ExampleProvider/index.jsx](#exampleproviderindexjsx)
    - [ExampleProvider/context.js](#exampleprovidercontextjs)
    - [ExampleProvider/reducer.js](#exampleproviderreducerjs)
    - [ExampleProvider/actions.js](#exampleprovideractionsjs)
    - [ExampleProvider/types.js](#exampleprovidertypesjs)
    - [ExampleProvider/data.js](#exampleproviderdatajs)
    - [Posts/index.jsx](#postsindexjsx)
    - [Home/index.jsx](#homeindexjsx)
  - [useDebugValue](#usedebugvalue)

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

## Real world example of useContext

### src/contexts/data.js

~~~js
export const initialState = {
  user: null,
  setUser: () => {},
};
~~~

### src/contexts/index.jsx

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

### src/components/ParentComponent.jsx

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

### src/components/ChildComponent.jsx

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

### src/contexts/data.js

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

### src/contexts/index.jsx

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

### src/components/ChildComponent.jsx

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

## Structure to use Context API

~~~properties
src
├── templates
│   ├── Home
│   │   └── index.jsx
├── components
│   ├── Posts
│   │   └──  index.jsx
├── contexts
│   ├── ExampleProvider
│   │   ├── index.jsx
│   │   ├── context.js
│   │   ├── reducer.js
│   │   ├── actions.js
│   │   ├── types.js
│   │   └── data.js
~~~

### ExampleProvider/index.jsx

~~~js
import P from 'prop-types';
import { useReducer } from 'react';
import { PostsContext } from './context';
import { initialState } from './data';
import { reducer } from './reducer';

export const PostsProvider = ({ children }) => {
  const [statePosts, dispatchPosts] = useReducer(reducer, initialState);

  return (
    <PostsContext.Provider value={{ statePosts, dispatchPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: P.oneOfType([P.string, P.element, P.node]).isRequired,
  // You may use simply P.node
};
~~~

### ExampleProvider/context.js

~~~js
import { createContext } from 'react';
export const PostsContext = createContext();
~~~

### ExampleProvider/reducer.js

~~~js
import { POSTS_LOADING, POSTS_SUCCESS } from './types';

export const reducer = (state, action) => {
  switch (action.type) {
    case POSTS_SUCCESS:
      return { ...state, posts: action.payload, loading: false };
    case POSTS_LOADING:
      return { ...state, loading: true };
  }
  return { ...state };
};
~~~

### ExampleProvider/actions.js

~~~js
import { POSTS_LOADING, POSTS_SUCCESS } from './types';

export const loadPosts = async (dispatch) => {
  dispatch({ type: POSTS_LOADING });
  const postsRaw = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postsRaw.json();
  return () => dispatch({ type: POSTS_SUCCESS, payload: posts });
};
~~~

### ExampleProvider/types.js

~~~js
export const POSTS_LOADING = 'POSTS_LOADING';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
~~~

### ExampleProvider/data.js

~~~js
export const initialState = {
  posts: [],
  loading: false,
};
~~~

### Posts/index.jsx

~~~js
import { useContext, useEffect, useRef } from 'react';
import { loadPosts } from '../../contexts/PostsProvider/actions';
import { PostsContext } from '../../contexts/PostsProvider/context';

export const Posts = () => {
  const isMounted = useRef(true);
  const { statePosts, dispatchPosts } = useContext(PostsContext);
  const { posts, loading } = statePosts;

  useEffect(() => {
    loadPosts(dispatchPosts).then((myDispatch) => {
      if (isMounted.current) myDispatch();
      return () => {
        isMounted.current = false;
      };
    });
  }, [dispatchPosts]);

  return (
    <div>
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};
~~~

### Home/index.jsx

~~~js
import { Posts } from '../../components/Posts';
import { PostsProvider } from '../../contexts/PostsProvider';

export const Home = () => {
  return (
    <PostsProvider>
      <Posts />
    </PostsProvider>
  );
};
~~~

> Note: Provider must be outside of the component that will use the context, so put it in the parent component.

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

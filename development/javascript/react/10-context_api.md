<!-- markdownlint-disable MD024 MD033 -->

# Context API

Context API is a way to share data between components without having to pass props down manually at every level, like Redux.

- [Context API](#context-api)
  - [useContext](#usecontext)
  - [Real world example of useContext](#real-world-example-of-usecontext)
    - [src/contexts/data.js](#srccontextsdatajs)
    - [src/contexts/index.jsx](#srccontextsindexjsx)
    - [src/components/ParentComponent.jsx](#srccomponentsparentcomponentjsx)
    - [src/components/ChildComponent.jsx](#srccomponentschildcomponentjsx)
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
  - [Combining context providers](#combining-context-providers)
    - [utils/combineComponents.tsx](#utilscombinecomponentstsx)
    - [CombinedProviders.tsx](#combinedproviderstsx)
    - [Usage](#usage)

## useContext

A hook that allows you to pass data through the component tree without having to pass props down manually at every level.

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

## Combining context providers

### utils/combineComponents.tsx

~~~tsx
import { ComponentProps, FC } from 'react';

export const combineComponents = (...components: FC[]): FC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};
~~~

### CombinedProviders.tsx

~~~tsx
import React from 'react';
import { ContextProvider1 } from '../Context1';
import { ContextProvider2 } from '../Context2';
import { ContextProvider3 } from '../Context3';
import { ContextProvider4 } from '../Context4';
import { combineComponents } from '../utils/combineComponents';
const providers = [
  ContextProvider1,
  ContextProvider2,
  ContextProvider3,
  ContextProvider4
]
export const CombinedProviders = combineComponents(...providers);
~~~

### Usage

~~~tsx
<CombinedProviders>
  <ComponentUsingCombinedProviders />
</CombinedProviders>
~~~

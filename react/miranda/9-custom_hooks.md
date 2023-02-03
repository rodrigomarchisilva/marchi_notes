# Custom Hooks

A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks.

- [Custom Hooks](#custom-hooks)
  - [Simple useFetch example](#simple-usefetch-example)
  - [Complex useFetch example](#complex-usefetch-example)
    - [src/hooks/useFetch.js](#srchooksusefetchjs)
    - [src/components/ExampleComponent.jsx](#srccomponentsexamplecomponentjsx)

## Simple useFetch example

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

## Complex useFetch example

### src/hooks/useFetch.js

~~~js
import { useState, useEffect, useRef } from 'react';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  const compareObjects = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  useEffect(() => {
    if (
      !compareObjects(urlRef.current, url) ||
      !compareObjects(optionsRef.current, options)
    ) {
      urlRef.current = url;
      optionsRef.current = options;
    }
  }, [url, options]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(urlRef.current, {
          signal,
          ...optionsRef.current,
        });
        const json = await res.json();
        if (isMounted) {
          setResponse(json);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, options]);

  return { response, error, loading };
};
~~~

### src/components/ExampleComponent.jsx

~~~js
import { useContext, useEffect, useRef } from 'react';
import { Loading } from '../Loading';
import { useFetch } from '../../hooks/useFetch';

export const Posts = () => {
  const {
    response: responseHook,
    loading: loadingHook,
    error: errorHook,
  } = useFetch('https://jsonplaceholder.typicode.com/posts');

  return (
    <div>
      <h1>useFetch Posts</h1>
      {loadingHook && <Loading />}
      {errorHook && <p>{errorHook}</p>}
      {responseHook?.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};
~~~

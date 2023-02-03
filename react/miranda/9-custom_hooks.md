# Custom Hooks

A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks.

- [Custom Hooks](#custom-hooks)
  - [Simple useFetch example](#simple-usefetch-example)

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

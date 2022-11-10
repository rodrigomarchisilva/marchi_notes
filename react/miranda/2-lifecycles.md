# Lifecycles

## ComponentDidMount

This method is called when the component is mounted. It is called only once in the component's life. Good to set the state of the component. It is also a good place to make API calls.

## ComponentDidUpdate

This method is called when the component is updated. It is called every time the component is updated.

## ComponentWillUnmount

This method is called when the component is unmounted. It is called only once in the component's life. Good to remove listeners.

## Example

~~~js
class ClassComponent extends React.Component {
  state = {
    time: 0,
  };

  timer = null;

  handleTimeout = () => {
    const { time } = this.state;

    timer = setTimeout(() => {
      this.setState({
        time: time + 1,
      });
    }, 1000);
  }

  componentDidMount() {
    this.handleTimeout();
  }

  componentDidUpdate() {
    this.handleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        {this.state.time}
      </div>
    );
  }
}
~~~

## Fetching data

~~~js
class ClassComponent extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {

  }

  getData = async() => {
    postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');

    const [postsJson] = await Promise.all([
      postsResponse
    ]);

    const [posts] = await Promise.all([
      postsJson.json()
    ]);

    this.setState({
      posts,
    });
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {data.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}
~~~

# prevState e prevProps

- It avoids the use of this.state and this.props in the setState method.
- The second parameter of the setState method is a callback function that is executed after the state change, that happens asynchronously.

~~~js
class Counter extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState(
      (prevState, prevProps) => ({ count: prevState.count + prevProps.increment }),
      () => { console.log(`New count: ${this.state.count}`); }
    );
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}
~~~

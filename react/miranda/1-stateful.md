# Stateful

## Class Component with binded function

You need to bind the standard function, because it has a this context, otherwise it will not have access to the class context. You also need a constructor to bind the function and declare the state.

~~~js
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'value',
    };

    this.handleDivClick = this.handleDivClick.bind(this);
  }

  handleDivClick() {
    this.setState({
      key: 'new value',
    });
  }

  render() {
    return (
      <div onClick={this.handleDivClick}>
        {this.state.key}
      </div>
    );
  }
}
~~~

## Function with arrow function and class field

When arrow function is used, it does not have a this context, so it will use the context of the parent. You can use a class field to declare the state and remove the constructor too.

~~~js
class ClassComponent extends React.Component {
  state = {
    key: 'value',
  };

  handleDivClick = () => {
    this.setState({
      key: 'new value',
    });
  }

  render() {
    return (
      <div onClick={this.handleDivClick}>
        {this.state.key}
      </div>
    );
  }
}
~~~

## Prevent default

Links redirect to another page, submit buttons send the form, etc. To prevent this, instead of changing the HTML, you can use the `preventDefault` function.

~~~js
  handleSubmitButtonClick = (event) => {
    event.preventDefault();
    console.log('Event prevented');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmitButtonClick}>
        <button type="submit">Submit</button>
      </form>
    );
  }
~~~

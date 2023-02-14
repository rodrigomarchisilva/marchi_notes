# PropTypes

## .propTypes

* For props that need to be passed to the component.

~~~js
Component.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  onClick: PropTypes.func,
};
~~~

## .defaultProps

* For props that you want to have a default value. You can either declare the default value in the component or in the defaultProps object.

~~~js
Component.defaultProps = {
  age: 0,
};
~~~

<!-- markdownlint-disable MD024 MD033 -->

# Component resources

Hooks should be used only outside of blocks, loops, and conditionals, in the top level of the functional component.

- [Component resources](#component-resources)
  - [Error boundaries](#error-boundaries)
  - [Compound components](#compound-components)
  - [Compound Components based on Context](#compound-components-based-on-context)
  - [Lazy loading](#lazy-loading)

## Error boundaries

Use this component to catch errors in the children components and prevent the whole application from crashing.

~~~js
import { Component } from 'react';
import P from 'prop-types';

export class ErrorBoundary extends Component {
  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    return error ? <h1>{error.message}</h1> : children;
  }
}

ErrorBoundary.propTypes = {
  children: P.node.isRequired,
};
~~~

> Note: Errors will still be logged in the console. It is a defensive mechanism to catch deeper errors in the component that might be missed if not logged.

## Compound components

It is a pattern that allows you to create components that can be composed with other components.

~~~js
import { Children, cloneElement } from 'react';
import { useState } from 'react';
import P from 'prop-types';

const style = { fontSize: '60px' };

const Style = ({ children }) => Children.map(children, (child) => cloneElement(child, { ...style }));

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);
  return Children.map(children, (child) =>
    typeof child.type === 'string'
      ? child
      : cloneElement(child, { isOn, toggle }),
  });
};

const TurnedOn = ({ isOn, children }) => (isOn ? children : null);

TurnedOn.propTypes = {
  isOn: P.bool.isRequired,
  children: P.node.isRequired,
};

const TurnedOff = ({ isOn, children }) => (isOn ? null : children);

TurnedOff.propTypes = {
  isOn: P.bool.isRequired,
  children: P.node.isRequired,
};

const ToggleButton = ({ isOn, toggle }) => (<button onClick={toggle}>{isOn ? 'Turn Off' : 'Turn On'}</button>);

ToggleButton.propTypes = {
  isOn: P.bool.isRequired,
  toggle: P.func.isRequired,
};

export const CompoundComponent = () => (
  <Style>
    <TurnOnOff>
      <TurnedOn>
        <p>Turned On</p>
      </TurnedOn>
      <TurnedOff>
        <p>Turned Off</p>
      </TurnedOff>
      <ToggleButton />
    </TurnOnOff>
  </Style>
);
~~~

## Compound Components based on Context

~~~js
import { createContext, useContext } from 'react';
import P from 'prop-types';

const style = { fontSize: '60px' };

const Style = ({ children }) => Children.map(children, (child) => cloneElement(child, { ...style }));

const StyleContext = createContext({ children: null });

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);
  return (
    <StyleContext.Provider value={{ isOn, toggle }}>
      {children}
    </StyleContext.Provider>
  );
};

const TurnedOn = ({ children }) => {
  const { isOn } = useContext(StyleContext);
  return isOn ? children : null;
};

const TurnedOff = ({ children }) => {
  const { isOn } = useContext(StyleContext);
  return isOn ? null : children;
};

const ToggleButton = () => {
  const { isOn, toggle } = useContext(StyleContext);
  return (<button onClick={toggle}>{isOn ? 'Turn Off' : 'Turn On'}</button>);
};

export const CompoundComponent = () => (
  <Style>
    <TurnOnOff>
      <TurnedOn>
        <p>Turned On</p>
      </TurnedOn>
      <TurnedOff>
        <p>Turned Off</p>
      </TurnedOff>
      <ToggleButton />
    </TurnOnOff>
  </Style>
);
~~~

## Lazy loading

A way to make sure that a component is only loaded when it is needed.

~~~js
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

export const LazyLoading = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
~~~

It can be used as a function, so it can be loaded on mouse over before the user clicks on the button, as an example.

~~~js
import { lazy, Suspense, useState } from 'react';

const [show, setShow] = useState(false);

const loadComponent = (component) => lazy(() => import(`./${component}`));
const LazyComponent = loadComponent('LazyComponent');

export const LazyLoading = () => (
  <button onMouseOver={() => loadComponent('LazyComponent')} onClick={() => setShow((s) => !s)}>
    Show component
  </button>
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
~~~

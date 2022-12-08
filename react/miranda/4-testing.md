# Testing

## Jest

### Imports

~~~js
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component from './Component_path';
~~~

### Blocks

~~~js
describe('<Component />', () => {
  describe('Component <button />', () => {
    it('should render', () => {
      render(<Component />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
~~~

> You may use as many `describe` blocks as you want and either it or test inside them.

### Render and Screen

~~~js
test('renders link', () => {
  render(<Component />);
  const link = screen.getByText(/learn react/i);
  expect(link).toBeInTheDocument();
});
~~~

### Snapshot

~~~js
it('renders correctly', () => {
  const { container } = render(<Component />);
  expect(container).toMatchSnapshot();
});
~~~

### Test input

~~~js
test('input value', () => {
  const onChange = jest.fn();
  render(<Component onChange={onChange} />);
  const input = screen.getByLabelText(/name/i);
  userEvent.type(input, 'test');
  expect(onChange).toHaveBeenCalledTimes(4);
  expect(input).toHaveValue('test');
});
~~~

### Test button

~~~js
test('button click', () => {
  const onClick = jest.fn();
  render(<Component onClick={onClick} />);
  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
~~~

### Mock functions and return values

~~~js
test('mock function', () => {
  const componentDidMount = jest.spyOn(Component.prototype, 'componentDidMount');
  componentDidMount.mockImplementation(() => {});
  render(<Component />);
  expect(componentDidMount).toHaveBeenCalledTimes(1);
});
~~~

### Restore mock functions

~~~js
test('restore mock function', () => {
  const componentDidMount = jest.spyOn(Component.prototype, 'componentDidMount');
  componentDidMount.mockImplementation(() => {});
  render(<Component />);
  expect(componentDidMount).toHaveBeenCalledTimes(1);
  componentDidMount.mockRestore();
});

// or

afterEach(() => {
  jest.restoreAllMocks();
});

// or on jest.config.js
{
  ...
  restoreMocks: true,
  ...
}
~~~

### Getting elements that load async

~~~js
test('async elements', async () => {
  render(<Component />);
  const element = await screen.findByText(/async/i);
  expect(element).toBeInTheDocument();
});
~~~

### Testing number of assertions

~~~js
test('number of assertions', () => {
  expect.assertions(3);

  const onClick = jest.fn();
  render(<Component onClick={onClick} />);
  const button = screen.getByRole('button');

  userEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(button).toHaveTextContent('clicked');
  expect(button).toHaveAttribute('disabled');
});
~~~

### Add scripts to package.json

~~~json
"scripts": {
  "snap:reset": "jest -u",
  "test": "react-scripts test --detectOpenHandles --watchAll=false",
  "test:watch": "react-scripts test --detectOpenHandles",
  "coverage": "react-scripts test --detectOpenHandles --coverage --watchAll=false",
  "coverage:watch": "react-scripts test --detectOpenHandles --coverage",
},
"jest": {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
}
~~~

> - `--detectOpenHandles` is used to detect open handles that are keeping Jest from exiting cleanly.
> - `--watchAll` is used to run tests in watch mode.
> - `--coverage` is used to generate a coverage report.
> - `collectCoverageFrom` is used to specify which files Jest should collect coverage from.
> - `coverageThreshold` is used to specify the minimum coverage thresholds for each file type.

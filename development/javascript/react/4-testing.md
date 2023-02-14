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

### Queries

type | 0 matches | 1 match | 2+ matches | retry (async)
--- | --- | --- | --- | ---
getBy :adult: | :x: *throw* **error** | :heavy_check_mark: *return* `element` | :x: *throw* **error** | :x: no
getAllBy :family_man_woman_girl_boy: | :x: *throw* **error** | :heavy_check_mark: *return* `array` | :heavy_check_mark: *return* `array` | :x: no
queryBy :adult: | :heavy_check_mark: *return* `null` | :heavy_check_mark: *return* `element` | :x: *throw* **error** | :x: no
queryAllBy :family_man_woman_girl_boy: | :heavy_check_mark: *return* `[]` | :heavy_check_mark: *return* `array` | :heavy_check_mark: *return* `array` | :x: no
findBy :adult: | :x: *throw* **error** | :heavy_check_mark: *return* `element` | :x: *throw* **error** | :heavy_check_mark: yes
findAllBy :family_man_woman_girl_boy: | :x: *throw* **error** | :heavy_check_mark: *return* `array` | :heavy_check_mark: *return* `array` | :heavy_check_mark: yes

### screen queries (by order of preference)

~~~js
// good in most cases
screen.getByRole('button', { name: /submit/i });

// for form elements
screen.getByLabelText('label');

// only if there is no label
screen.getByPlaceholderText('placeholder');

// outside of form elements (e.g. <div>, <span>, <p>)
screen.getByText('text');

// when there are components filled with values
screen.getByDisplayValue('value');


screen.getByAltText('alt');
screen.getByTitle('title');
screen.getByTestId('test-id');
~~~

### Most frequent user events

~~~js
userEvent.click(element);
userEvent.dblClick(element);
userEvent.type(element, 'text');
userEvent.tab();
userEvent.hover(element);
userEvent.unhover(element);
userEvent.selectOptions(element, 'value');
userEvent.clear(element);
userEvent.upload(element, file);
~~~

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

### Working with async code

Use async/await and `findBy` methods.

~~~js
test('async elements', async () => {
  render(<Component />);
  const element = await screen.findByText(/async/i);
  expect(element).toBeInTheDocument();
});
~~~

Or use `waitFor` method.

~~~js
test('async elements', () => {
  render(<Component />);
  return waitFor(() => {
    const element = screen.getByText(/async/i);
    expect(element).toBeInTheDocument();
  });
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

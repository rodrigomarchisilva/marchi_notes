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

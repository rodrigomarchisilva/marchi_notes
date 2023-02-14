# Complex testing

## Mock service worker

### Install

~~~properties
npm i -D msw
~~~

### Setup

~~~js
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// use the endpoints you want to mock
const handlers = [
  rest.get('/api.com/endpoint', (_req, res, ctx) => {
    return res(ctx.json({ message: 'hello there' }));
  }),
  rest.post('/api.com/endpoint', (_req, res, ctx) => {
    return res(ctx.json({ message: 'hello there' }));
  }),
];

const server = setupServer(...handlers);

// inside the main test block
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
~~~

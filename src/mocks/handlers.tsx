import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3333/login', (req, res, ctx) => {
    return res(ctx.json({ response: 'fake' }));
  }),
];

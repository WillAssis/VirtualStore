import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3333/login', async (req, res, ctx) => {
    const { username } = await req.json();

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          username,
          isAdmin: true,
        },
      })
    );
  }),
];

import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3333/login', async (req, res, ctx) => {
    const { username } = await req.json();

    return res(
      ctx.status(200),
      ctx.json({ user: { username, isAdmin: true } })
    );
  }),
  rest.post('http://localhost:3333/cadastro', async (req, res, ctx) => {
    const { username } = await req.json();

    if (username === 'UsedName') {
      return res(
        ctx.status(418),
        ctx.json({
          user: null,
          errors: {
            usernameError: 'Custom error message from backend',
            emailError: '',
            passwordError: '',
          },
        })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({ user: { username, isAdmin: false } })
    );
  }),
];

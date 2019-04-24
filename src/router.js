import KoaRouter from 'koa-router';
import jwt from 'jsonwebtoken';

import config from './config';

const router = KoaRouter();

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello Koa + JWT' };
});

router.get('/public', async (ctx) => {
  ctx.body = { message: 'Public area' };
});

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;

  if (username !== 'admin' || password !== '123456') {
    throw new Error('Invalid username/password');
  }

  const payload = {
    id: 1,
    name: 'Administrator'
  };

  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });

  ctx.body = { token };
});

router.get('/protected', async (ctx) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    ctx.throw(401, 'Missing Authorization Header');
  }

  const [schema, token] = authorization.split(' ');

  if (!schema || !token) {
    ctx.throw(401, 'Invalid Authorization Header');
  }

  if (schema !== 'Bearer') {
    ctx.throw(401, 'Invalid schema');
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      ctx.throw(401, 'Invalid token');
    }

    ctx.body = decoded;
  });
});

export default router;

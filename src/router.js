const KoaRouter = require('koa-router');

const router = KoaRouter();

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello Koa + JWT' };
});

module.exports = router;

'use strict';

module.exports = secret => {
  return async function jwtErr(ctx, next) {
    // 若是没有 token，返回的是 null 字符串
    const token = ctx.request.header.authorization;
    if (token !== 'null' && token) {
      try {
        // 验证token
        ctx.app.jwt.verify(token, secret);
        await next();
      } catch (e) {
        console.log(e);
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期，请重新登录',
          code: 401,
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  };
};

// const Router = require('koa-router');
const path = require('path');

// const router = new Router();
const student = require('../students.js');

module.exports = {
  'GET /api/students': async ctx => {
    const res = await student.find();
    ctx.body = {
      students: res,
    };
  },

  'POST /api/add': async ctx => {
    const res = await student.find();
    await student.addData(res, ctx.request.body.student);
    ctx.body = 'ok';
  },

  'PUT /api/edit': async ctx => {
    // console.log(ctx.request.body)
    const res = await student.find();
    await student.upload(res, ctx.request.body.student);
    ctx.body = 'ok';
  },

  'DELETE /api/delete': async ctx => {
    // console.log(ctx.query)
    // console.log(ctx.request.query)
    const res = await student.find();
    await student.delete(res, ctx.request.body.id);
    ctx.body = 'ok';
  },
};

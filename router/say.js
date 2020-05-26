const Router = require('koa-router');
const SayModel = require('../model/say.model');


const say = new Router({
    prefix: '/say'
})
say.get('/', async (ctx) => {
    const { page = 1, pageSize = 15 } = ctx.query;

    const say = await SayModel.sayGet(page, pageSize)
    return ctx.body = say;
})
say.get('/id', async (ctx) => {
    const { id } = ctx.query;

    const say = await SayModel.sayFindOne(id)
    return ctx.body = say;
})
say.get('/search', async (ctx) => {
    const { page = 1, pageSize = 15, search_val } = ctx.query;

    const say = await SayModel.saySearch(page, pageSize, search_val)
    return ctx.body = say;
})
say.post('/add', async (ctx) => {
    const { say_content, say_content_mark } = ctx.request.body;

    let say = await SayModel.sayAdd(say_content, say_content_mark)
    return ctx.body = say;
})
say.post('/update', async (ctx) => {
    const { say_content, say_content_mark, id } = ctx.request.body;

    let say = await SayModel.sayUpdate(say_content, say_content_mark, id)
    return ctx.body = say;
})
say.get('/delete', async (ctx) => {
    const { id } = ctx.query;

    let say = await SayModel.sayDelete(id)
    return ctx.body = say;
})
module.exports = say
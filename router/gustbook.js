const Router = require('koa-router');
const Gustbook = require('../model/guestbook.model');
const gustbook = new Router({
    prefix: '/gustbook'
})
gustbook.get('/', async (ctx) => {
    const { page = 1, pageSize = 15 } = ctx.query;
    const gutsbook = await Gustbook.gustbookList(page, pageSize)
    ctx.body = gutsbook
})
gustbook.get('/state', async (ctx) => {
    const { id } = ctx.query;
    const gutsbook = await Gustbook.changeState(id)
    ctx.body = gutsbook
})
//获取评论
gustbook.get('/message', async (ctx) => {
    const { page = 1, pageSize = 15, id } = ctx.query;
    console.log(page, pageSize, id)
    const message = await Gustbook.findMessage(id, page, pageSize);
    ctx.body = message
})


gustbook.get('/delete', async (ctx) => {
    const { id } = ctx.query;
    const gutsbook = await Gustbook.gustbookDelete(id)
    ctx.body = gutsbook
})

gustbook.get('/category_message', async (ctx) => {
    const { page = 1, pageSize = 15 } = ctx.query;
    const gutsbook = await Gustbook.gustbooCategory(page, pageSize)
    ctx.body = gutsbook
})
gustbook.post('/reply', async (ctx) => {
    const { id, reply } = ctx.request.body;
    console.log(id, reply)
    const gutsbook = await Gustbook.replyHadnle(id, reply)
    ctx.body = gutsbook;
})
gustbook.post('/add', async (ctx) => {
    const { article_id, message_content, avatar_name, avatar_url, email = '', url = '', message } = ctx.request.body;
    console.log(message_content, avatar_name, avatar_url, message)
    const gustbook = await Gustbook.gustbookAdd(article_id, message_content, avatar_name, avatar_url, email, url, message);
    return ctx.body = gustbook
})
module.exports = gustbook
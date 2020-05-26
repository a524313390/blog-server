const Router = require('koa-router');
const Tag = require('../model/tag.model')
const tags = new Router({
    prefix: '/tag'
})
tags.get('/', async (ctx) => {
    const { page = 1, pageSize = 15 } = ctx.query;
    const tag = await Tag.finds(page, pageSize);
    ctx.body = tag
})
tags.get('/all', async (ctx) => {

    const tag = await Tag.findAllList();
    ctx.body = tag
})
tags.get('/search', async (ctx) => {
    const { page = 1, pageSize = 15, tag_name } = ctx.query;
    const tag = await Tag.searchHandle(page, pageSize, tag_name);
    ctx.body = tag
})

tags.get('/delete', async (ctx) => {
    const { id } = ctx.query;
    const tag = await Tag.deleteTags(id);
    ctx.body = tag
})
tags.post('/add', async (ctx) => {
    const { tagname } = ctx.request.body;

    const tag = await Tag.addTags(tagname);
    ctx.body = tag
})

tags.post('/update', async (ctx) => {
    const { tag_name, id } = ctx.request.body;

    const tag = await Tag.changeTag(tag_name, id);
    ctx.body = tag
})
module.exports = tags;
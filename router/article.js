const Router = require('koa-router');
const ArticleModel = require('../model/article.model')

const article = new Router({
    prefix: '/article'
})

article.get('/', async (ctx) => {
    const { page = 1, pageSize = 15 } = ctx.query;
    const tag = await ArticleModel.findAllArticle(page, pageSize);
    ctx.body = tag
})
article.get('/delete', async (ctx) => {
    const { id } = ctx.query;
    const tag = await ArticleModel.deleteArticle(id);
    ctx.body = tag
})
article.get('/search', async (ctx) => {
    const { page = 1, pageSize = 15, category_id = '', title = '', article_author = '', id = '' } = ctx.query;
    const tag = await ArticleModel.searchArticle(page, pageSize, category_id, title, article_author, id);
    ctx.body = tag
})
article.get('/count', async (ctx) => {
    const { id } = ctx.query;
    const count = await ArticleModel.countAdd(id);
    ctx.body = count
})
//置顶文章 默认返回4条数据
article.get('/host', async (ctx) => {
    const { page = 1, pageSize = 4 } = ctx.query;
    const tag = await ArticleModel.findhostArticle(page, pageSize);
    ctx.body = tag
})
article.post('/add', async (ctx) => {
    const { title, top, category_id, keyword, thumb_url, desc, content, article_author, count, content_mark } = ctx.request.body;

    let article = await ArticleModel.addArticle(title, top, category_id, keyword, thumb_url, desc, content, article_author, count, content_mark)
    return ctx.body = article;
})
article.post('/update', async (ctx) => {
    const { title, top, category_id, keyword, thumb_url, desc, content, article_author, count, createdAt, content_mark, id } = ctx.request.body;
    console.log(ctx.request.body)
    let article = await ArticleModel.updateArticle(title, top, category_id, keyword, thumb_url, desc, content, article_author, count, createdAt, content_mark, id)
    return ctx.body = article;

})


module.exports = article;
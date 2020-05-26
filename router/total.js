const Router = require('koa-router');
const ArticleModel = require('../model/article.model');
const TagModel = require('../model/tag.model');
const UserModel = require('../model/user.model');
const GustbookModel = require('../model/guestbook.model');
const total = new Router({
    prefix: '/total'
})

total.get('/', async (ctx) => {


    const article = await ArticleModel.findAndCountAll();
    const tag = await TagModel.findAndCountAll();
    const user = await UserModel.findAndCountAll();
    const gustbook = await GustbookModel.findAndCountAll();



    let obj = [
        {
            name: '文章',
            count: article.count,

        },
        {
            name: '标签',
            count: tag.count,

        },
        {
            name: '用户',
            count: user.count,

        },
        {
            name: '留言',
            count: gustbook.count

        }

    ]
    ctx.body = {
        code: 0,
        message: obj
    }
})

total.get('/tags', async (ctx) => {
    const tag = await TagModel.findAll();
    let arrays = [];
    for (let i = 0; i <= tag.length - 1; i++) {

        const arr = await ArticleModel.count({
            where: {
                category_id: tag[i].id
            }
        });

        arrays.push({
            tag_name: tag[i].tag_name,
            count: arr
        })



    }



    ctx.body = {
        code: 0,
        message: arrays
    }
})

module.exports = total;
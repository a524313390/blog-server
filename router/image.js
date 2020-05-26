const Router = require('koa-router');
const ImagesModel = require('../model/image.model');
const fs = require('fs');
const images = new Router({
    prefix: '/images'
})

images.get('/', async (ctx) => {
    const { page, pageSize } = ctx.query;
    const img = await ImagesModel.imgFindAll(page, pageSize);
    return ctx.body = img
})
images.post('/delete', async (ctx) => {
    const { id, url } = ctx.request.body;
    let imgPath = 'public' + url;
    fs.unlinkSync(imgPath)
    const img = await ImagesModel.imgDelete(id);

    return ctx.body = img
})
module.exports = images
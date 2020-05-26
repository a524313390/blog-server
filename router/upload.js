const Router = require('koa-router');
const { upload } = require('../utils')
const ImageModel = require('../model/image.model')
const uploads = new Router({
    prefix: '/upload'
})


uploads.post('/add', upload.single('file'), async (ctx) => {
    console.log(ctx.req.file)
    let ctxs = ctx.req.file
    let path = ctx.req.file.path;

    let paths = ctxs.destination + '/' + ctxs.filename;
    let url = paths.replace('public', '')
    let img = await ImageModel.addImg(url);

    ctx.body = {
        code: 0,
        message: url
    }
})


module.exports = uploads
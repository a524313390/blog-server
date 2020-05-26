const Router = require('koa-router');
const BannerModel = require('../model/banner.model');
const banner = new Router({
    prefix: '/banner'
})

banner.get('/', async (ctx) => {
    const { page = 1, pageSize = 15 } = ctx.query;

    const banner = await BannerModel.findBanner(page, pageSize);
    ctx.body = banner
})
banner.get('/find/:id', async (ctx) => {
    const { id } = ctx.query;

    const banner = await BannerModel.findOneBanner(id);
    ctx.body = banner
})
banner.get('/state', async (ctx) => {
    const { id, banner_state } = ctx.query;
    console.log(id, banner_state, 'state')
    const banner = await BannerModel.updateBannerState(id, banner_state);
    ctx.body = banner
})
banner.post('/add', async (ctx) => {
    const { banner_url, banner_title, banner_image, banner_state = true } = ctx.request.body;
    const banner = await BannerModel.addBanner(banner_url, banner_title, banner_image, banner_state);
    ctx.body = banner
})
banner.get('/delete', async (ctx) => {

    const { id } = ctx.query;
    const banner = await BannerModel.deleteBanner(id);
    ctx.body = banner
})
banner.post('/update', async (ctx) => {
    const { banner_url, banner_title, banner_image, banner_state = true, id } = ctx.request.body;
    const banner = await BannerModel.updateBanner(banner_url, banner_title, banner_image, banner_state, id);
    ctx.body = banner
})
module.exports = banner;
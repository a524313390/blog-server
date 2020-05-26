const Router = require('koa-router');
const SyatemModel = require('../model/system.model')
const { upload } = require('../utils')
const system = new Router({
    prefix: '/system'
})

system.get('/', async (ctx) => {
    let system = await SyatemModel.getInfo()
    ctx.body = system
})

system.post('/update', async (ctx) => {

})

system.post('/add', async (ctx) => {
    const { sitename, logourl, record, code, adminname, id } = ctx.request.body;
    if (id !== '') {
        console.log(id)
        let system = await SyatemModel.updateInfo(sitename, logourl, record, code, adminname, id)

        ctx.body = system
    } else {

        const { sitename, logourl, record, code, adminname } = ctx.request.body;
        let system = await SyatemModel.addInfo(sitename, logourl, record, code, adminname)

        ctx.body = system
    }


})
module.exports = system
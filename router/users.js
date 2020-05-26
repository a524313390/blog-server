const Router = require('koa-router');
const User = require('../model/user.model')

const router = new Router({
    prefix: '/users'
})
router.get('/', async (ctx) => {
    const { page = 1, pageSize = 15 } = ctx.query;
    let user = await User.findCount(page, pageSize)
    ctx.body = user;
})


router.get('/search', async (ctx) => {
    const { username, type } = ctx.query;
    let user = await User.findSearch(username, type)
    ctx.body = user;
})
router.post('/register', async (ctx) => {

    const { username, password, type } = ctx.request.body;

    const user = await User.register(username, password, type);



    ctx.body = {
        ...user
    }

})
router.post('/login', async (ctx) => {

    const { username, password } = ctx.request.body;

    const user = await User.login(username, password)

    if (user) {
        ctx.body = {
            ...user
        }
    }
})

router.post('/chang', async (ctx) => {

    const { username, password, id, type } = ctx.request.body;

    const user = await User.changePass(username, password, id, type)

    if (user) {
        ctx.body = {
            ...user
        }
    }
})

router.get('/verifySecret', async (ctx) => {

    const { token } = ctx.query;

    const user = await User.verifyToken(token)

    ctx.body = user

})
router.get('/delete', async (ctx) => {

    const { id } = ctx.query;

    const user = await User.deleteHandle(id)

    if (user) {
        ctx.body = user
    }
})
module.exports = router;
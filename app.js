const Koa = require('koa2');
const app = new Koa();
const Users = require('./model/user.model')
const RequireDirectory = require('require-directory');
const bodyparser = require('koa-bodyparser');
const koaJwt = require('koa-jwt');
const { sequelize } = require('./config/db');
const config = require('./config/default.mysql')
const history = require('koa-connect-history-api-fallback');
app.use(history());
console.log(config.secret)

app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/public/dist'))
//验证是否连接成功

app.use(function (ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = '没有权限访问';
        } else {
            throw err;
        }
    });
});

app.use(koaJwt({ secret: config.secret }).unless({
    path: ['/users/login',
        '/users/verifySecret',
        "/tag/all",
        "/banner",
        "/article",
        "/article/host",
        "/article/search",
        "/article/count",
        "/gustbook/message",
        "/gustbook/add",
        "/gustbook/category_message",
        '/tag',
        '/system',
        '/say',
        '/login/qq_login',
        '/login/qq/login',

    ]
}))

sequelize.authenticate().then(() => {
    console.log('Success.');
}).catch(err => {
    console.error('Failed', err);
});

app.use(bodyparser({ multipart: true }));
const modules = RequireDirectory(module, './router', { visit: loadModules });

function loadModules(obj) {

    app.use(obj.routes()).use(obj.allowedMethods())
}


app.listen(5000);
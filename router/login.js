const Router = require('koa-router');
var request = require("http");
var axios = require('axios');
const qqModel = require('../model/qq.model')
const login = new Router({
    prefix: '/login'
})

var qqAppID = '101741121';
var qqAppkey = 'b7d86edcbd745e84e9ac4e2d30952f51';
// var qqRedirect_uri = 'http://www.pangbo51.com/member/other/qq_login.html';
// var qqRedirect_uri = 'http://www.pangbo51.com:3000/login';
var qqRedirect_uri = 'http://www.pangbo51.com:3000/category';
login.get('/qq_login', function (ctx) {

    var authorization = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${qqAppID}&redirect_uri=${qqRedirect_uri}&scope=get_user_info`
    ctx.body = {
        code: 0,
        message: authorization
    }

});
login.get('/qq/login', async (ctx) => {
    //拿到code
    var code = ctx.query.code;
    var redirect_url = ctx.query.redirect_url;

    //获取token
    var getTokenUrl = `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${qqAppID}&client_secret=${qqAppkey}&code=${code}&redirect_uri=${encodeURIComponent(qqRedirect_uri)}`;
    let token = await axios.get(getTokenUrl)

    let access_token = token.data.split('=')[1].split('&')[0];
    //查找数据库的token，并且对比数据库token是否和返回的token是否相等，相等就没有过期，不相等就过期了需要重新请求token，并且刷新数据库的token

    //数据库里面的token失效了，需要重新更新
    let info = await axios.get(`https://graph.qq.com/oauth2.0/me?access_token=${access_token}`);

    var jsonStr = info.data.replace('callback( ', '');
    jsonStr = jsonStr.replace(' );', '');
    jsonStr = JSON.parse(jsonStr);
    var qqOpenid = jsonStr['openid'];

    var qqClient_id = jsonStr['client_id'];

    let user_info_url = 'https://graph.qq.com/user/get_user_info?access_token=' + encodeURIComponent(access_token) + '&oauth_consumer_key=' + encodeURIComponent(qqAppID) + '&openid=' + encodeURIComponent(qqOpenid);

    //根据openid获取用户信息
    let user_info = await axios.get(user_info_url);

    let datas = user_info.data
    var obj = {};
    obj.nickname = datas.nickname
    obj.gender = datas.gender
    obj.province = datas.province
    obj.city = datas.city
    obj.year = datas.year
    obj.figureurl_qq_2 = datas.figureurl_qq_2
    obj.figureurl_qq = datas.figureurl_qq
    obj.qqOpenid = qqOpenid
    obj.token = access_token
    const create_qq = await qqModel.createQQ(obj)
    delete obj.qqOpenid

    ctx.body = {
        code: 0,
        message: obj
    }






});


module.exports = login;
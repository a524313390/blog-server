const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const validator = require('validator');
const bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken');

const slat = bcryptjs.genSaltSync(10);
const secrets = require('../config/default.mysql')

class Users extends Model {
    static async register(username, password, type) {
        try {
            const user = await Users.create({ username, password, type })
            return {
                code: 0,
                message: '注册成功'
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }


    }

    static async login(username, password) {

        try {
            const user = await Users.findOne({
                where: {
                    username,
                }
            })

            const corrent = bcryptjs.compareSync(password, user.password);

            if (!corrent) {
                return {
                    code: -1,
                    message: '密码不正确'
                }
            }
            //生成token

            return {
                code: 0,
                message: getToken(user)
            };
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }

    }


    //解析token
    static async verifyToken(token) {


        let tokens = await jwt.verify(token, secrets.secret);

        if (tokens) {
            return {
                code: 0,
                message: tokens
            }
        } else {
            return {
                code: -1,
                message: 'token失效或者不存在'
            }
        }
    }

    //修改密码
    static async changePass(username, password, id, type) {
        let obj;
        if (username && password && type) {
            obj = { password, username, type }
        } else if (username && password) {
            obj = { password, username }
        } else if (type) {
            obj = { type }
        } else if (password) {
            obj = { password }
        } else if (username) {
            obj = { username }
        }

        try {
            let update = await Users.update(obj, { where: { id } })

            console.log(update)
            return {
                code: 0,
                massage: '修改成功'
            }
        } catch (e) {
            return {
                code: 1,
                massage: e
            }
        }
    }

    //分页查询
    static async findCount(page, size) {

        try {
            let user = await Users.findAndCountAll({
                attributes: ['id', 'type', 'username', 'createdAt', 'updatedAt'],
                limit: Number(size),
                offset: Number(size * (page - 1)),
                order: [

                    ['createdAt', 'DESC']
                ],
            })

            return {
                code: 0,
                massage: user
            }
        } catch (e) {
            return {
                code: 1,
                massage: e
            }
        }
    }

    //条件查询
    static async findSearch(username, type) {
        let size = 15;
        let page = 1;
        let obj;
        if (username !== '' && type !== '') {
            obj = { username, type }
        } else if (username !== '') {
            obj = { username }
        } else {
            obj = { type }
        }
        try {
            let user = await Users.findAndCountAll({
                attributes: ['id', 'type', 'username', 'createdAt', 'updatedAt'],
                where: obj,
                limit: Number(size),
                offset: Number(size * (page - 1)),
            })

            return {
                code: 0,
                massage: user
            }
        } catch (e) {
            return {
                code: 1,
                massage: e
            }
        }
    }

    //删除

    static async deleteHandle(id) {
        try {
            let user = await Users.destroy({
                where: { id }
            })
            return {
                code: 0,
                massage: user
            }
        } catch (e) {
            return {
                code: 1,
                massage: e
            }
        }

    }
}


//token生成

function getToken(obj) {
    let token = jwt.sign({ username: obj.username, type: obj.type }, secrets.secret, { expiresIn: 3600 })
    if (token) {
        return token
    } else {
        return 'token生成错误'
    }
}
Users.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长 

    },
    type: {
        type: Sequelize.STRING,
        defaultValue: 'user'

    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            notEmpty: {
                msg: "用户名不能为空"
            }
        },


    },
    password: {
        type: Sequelize.STRING,
        set(pwd) {
            const pwds = bcryptjs.hashSync(pwd, slat);
            this.setDataValue('password', pwds)
        }

    }
}, {
    sequelize,
    tableName: 'users'

})

module.exports = Users;
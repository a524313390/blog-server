const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const Op = Sequelize.Op;
class SayModel extends Model {
    static async sayGet(page, size) {
        try {
            let say = await SayModel.findAndCountAll({
                limit: Number(size),
                offset: Number(size * (page - 1)),
                order: [

                    ['createdAt', 'DESC']
                ],

            })
            return {
                code: 0,
                message: say
            }
        } catch (e) {
            return {
                code: 0,
                message: e
            }
        }


    }
    static async saySearch(page, size, search_val) {
        console.log(search_val)
        try {
            let say = await SayModel.findAndCountAll({
                where: {

                    say_content: {
                        [Op.like]: '%' + search_val + '%'
                    }
                },
                limit: Number(size),
                offset: Number(size * (page - 1)),
            })
            console.log(say)
            return {
                code: 0,
                message: say
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }



    }
    static async sayAdd(say_content, say_content_mark) {
        try {
            let say = await SayModel.create({ say_content, say_content_mark });
            return {
                code: 0,
                message: say
            }
        } catch (e) {
            return {
                code: 0,
                message: e
            }
        }
    }
    static async sayFindOne(id) {
        try {
            let say = await SayModel.findOne({ where: { id } })
            return {
                code: 0,
                message: say
            }
        } catch (e) {
            return {
                code: 0,
                message: e
            }
        }
    }
    static async sayUpdate(say_content, say_content_mark, id) {
        console.log(say_content, say_content_mark, id)
        try {
            let say = await SayModel.update({ say_content, say_content_mark }, { where: { id } });
            return {
                code: 0,
                message: '修改成功'
            }
        } catch (e) {
            return {
                code: 0,
                message: e
            }
        }
    }
    static async sayDelete(id) {

        try {
            let say = await SayModel.destroy({ where: { id } });
            return {
                code: 0,
                message: '删除成功'
            }
        } catch (e) {
            return {
                code: 0,
                message: e
            }
        }
    }
}
SayModel.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长 
    },
    say_content: {
        type: Sequelize.STRING,
        required: true
    },
    say_content_mark: {
        type: Sequelize.STRING,
        required: true
    },
}, {
    sequelize,
    tableName: 'say'

})

module.exports = SayModel
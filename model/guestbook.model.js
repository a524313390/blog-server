const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const ArticleModel = require('./article.model')
class GustbookModel extends Model {
    static async gustbookAdd(article_id, message_content, avatar_name, avatar_url, email, url, message) {

        const gustbook = await GustbookModel.create({ article_id, message_content, avatar_name, avatar_url, email, url, message });
        return {
            code: 0,
            message: gustbook
        }
    }
    static async gustbookList(page, size) {

        try {
            const gustbook = await GustbookModel.findAndCountAll({
                limit: Number(size),
                offset: Number(size * (page - 1)),
                order: [

                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: ArticleModel,
                    as: 'article_content',//这里的 as需要与之前定义的as名字相同
                    attributes: ['title']
                }]
            })
            return {
                code: 0,
                message: gustbook
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }
    static async gustbookDelete(id) {

        try {
            const gustbook = await GustbookModel.destroy({ where: { id } })
            return {
                code: 0,
                message: '删除成功'
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }
    static async changeState(id) {

        try {
            const gustbook = await GustbookModel.update({ state: true }, { where: { id } });
            return {
                code: 0,
                message: '通过审核'
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }

    }
    static async replyHadnle(id, reply) {

        try {
            const replys = await GustbookModel.update({ reply }, { where: { id } });
            return {
                code: 0,
                message: '回复成功'
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }
    //获取不是文章的回复
    static async gustbooCategory(page, size) {


        const gustbook = await GustbookModel.findAndCountAll({
            limit: Number(size),
            offset: Number(size * (page - 1)),
            order: [

                ['createdAt', 'DESC']
            ],
            where: {
                article_id: null
            }
        })
        return {
            code: 0,
            message: gustbook
        }

    }
    // 获取评论
    static async findMessage(id, page, size) {

        const message = await GustbookModel.findAndCountAll({
            where: { article_id: id, state: true },
            limit: Number(size),
            offset: Number(size * (page - 1)),
            attributes: ['avatar_name', 'avatar_url', 'message_content', 'reply', 'id'],
        });
        return {
            code: 0,
            message
        }


    }
}
GustbookModel.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长  
    },
    article_id: {
        type: Sequelize.INTEGER,


    },
    message_content: {
        type: Sequelize.STRING,

    },
    message: {
        type: Sequelize.BOOLEAN,
        defaultValue: false

    },
    avatar_name: {
        type: Sequelize.STRING,
        require: true
    },
    avatar_url: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    reply: Sequelize.STRING,
    email: Sequelize.STRING,
    url: Sequelize.STRING,
    state: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },


}, {
    sequelize,
    tableName: 'gustbook'

})
GustbookModel.belongsTo(ArticleModel, { foreignKey: 'article_id', targetKey: 'id', as: 'article_content' });
module.exports = GustbookModel
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const Tag = require('./tag.model')

const Op = Sequelize.Op;
class ArticleModel extends Model {
    static async findAllArticle(page, size) {
        try {
            let tagInfo = await ArticleModel.findAndCountAll({

                limit: Number(size),
                offset: Number(size * (page - 1)),
                order: [

                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: Tag,
                    as: 'tag_category',
                    attributes: ['tag_name'],

                }]
            })
            return {
                code: 0,
                message: tagInfo
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }

    static async findhostArticle(page, size) {
        try {
            let tagInfo = await ArticleModel.findAndCountAll({

                limit: Number(size),
                offset: Number(size * (page - 1)),
                order: [

                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: Tag,
                    as: 'tag_category',
                    attributes: ['tag_name'],

                }],
                where: {
                    top: true
                }
            })
            return {
                code: 0,
                message: tagInfo
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }

    static async searchArticle(page, size, category_id, title, article_author, id) {
        var where = {
            category_id,

            title: {

                [Op.like]: '%' + title + '%'
            },
            article_author: {

                [Op.like]: '%' + article_author + '%'
            },
            id
        };
        category_id == '' ? delete where.category_id : where;
        title == '' ? delete where.title : where;
        article_author == '' ? delete where.article_author : where;
        id == '' ? delete where.id : where;
        console.log(where)
        let tagInfo = await ArticleModel.findAndCountAll({

            limit: Number(size),
            offset: Number(size * (page - 1)),
            order: [

                ['createdAt', 'DESC']
            ],
            include: [{
                model: Tag,
                as: 'tag_category',
                attributes: ['tag_name'],

            }],
            where
        })
        return {
            code: 0,
            message: tagInfo
        }

    }
    static async addArticle(title, top, category_id, keyword, thumb_url, desc, content, article_author, count, content_mark) {

        let article = await ArticleModel.create({ title, top, category_id, keyword, thumb_url, desc, content, article_author, count, content_mark });
        return {
            code: 0,
            message: article
        }


    }
    static async updateArticle(title, top, category_id, keyword, thumb_url, desc, content, article_author, count, createdAt, content_mark, id) {
        try {
            let article = await ArticleModel.update({ title, top, category_id, keyword, thumb_url, desc, content, article_author, count, createdAt, content_mark }, { where: { id } });
            return {
                code: 0,
                message: article
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }

    }
    static async deleteArticle(id) {
        try {
            let article = await ArticleModel.destroy({
                where: { id }
            })
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

    static async countAdd(id) {
        const article = await ArticleModel.findByPk(id);
        const count = await article.increment('count')
        return {
            code: 0,
            message: '增加成功'
        }
    }


}

ArticleModel.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长 
    },
    title: {
        type: Sequelize.STRING,
        require: true

    },
    top: {
        type: Sequelize.BOOLEAN,

    },
    category_id: {
        type: Sequelize.INTEGER,
        require: true

    },
    keyword: Sequelize.STRING,
    thumb_url: Sequelize.STRING,
    desc: {
        type: Sequelize.STRING,
        require: true

    },
    content: Sequelize.TEXT,
    content_mark: Sequelize.TEXT,
    article_author: Sequelize.STRING,
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'article'

})

ArticleModel.belongsTo(Tag, { foreignKey: 'category_id', targetKey: 'id', as: 'tag_category' });

module.exports = ArticleModel;
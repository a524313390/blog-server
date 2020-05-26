const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const Op = Sequelize.Op;
class Tag extends Model {
    static async finds(page, size) {
        try {
            let tagInfo = await Tag.findAndCountAll({

                limit: Number(size),
                offset: Number(size * (page - 1)),
                order: [

                    ['createdAt', 'DESC']
                ],
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
    static async findAllList() {
        try {
            let tagInfo = await Tag.findAll()
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
    static async addTags(tagname) {
        let tag_name = tagname

        try {
            const tags = await Tag.create({ tag_name });
            return {
                code: 0,
                message: tags
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }

    }
    static async changeTag(tagname, id) {

        try {
            const tags = await Tag.update({ tag_name: tagname }, {
                where: {
                    id
                }
            });

            return {
                code: 0,
                message: '修改成功'
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }


    }

    static async  deleteTags(id) {
        try {
            let tag = await Tag.destroy({
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

    static async  searchHandle(page, size, tag_name) {
        try {
            let tag = await Tag.findAndCountAll({
                where: {

                    tag_name: {

                        [Op.like]: '%' + tag_name + '%'
                    }
                },
                limit: Number(size),
                offset: Number(size * (page - 1)),
            })
            return {
                code: 0,
                message: tag
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }

    }
}
Tag.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长 
    },
    tag_name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            notEmpty: {
                msg: "标签名不能为空"
            }
        }
    },

}, {
    sequelize,
    tableName: 'tags'

})

module.exports = Tag;
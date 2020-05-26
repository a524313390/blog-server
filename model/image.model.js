const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ImageModel extends Model {
    static async addImg(url) {
        try {
            let img = await ImageModel.create({ url })
            return {
                code: 0,
                message: img
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }
    static async imgFindAll(page, size) {
        try {
            let img = await ImageModel.findAndCountAll({
                limit: Number(size),
                offset: Number(size * (page - 1)),
            })
            return {
                code: 0,
                message: img
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }
    static async imgDelete(id) {
        try {
            let img = await ImageModel.destroy({ where: { id } })
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

}
ImageModel.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长 
    },
    url: Sequelize.STRING
}, {
    sequelize,
    tableName: 'image'

})

module.exports = ImageModel
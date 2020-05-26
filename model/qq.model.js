const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class qqModel extends Model {
    static async createQQ(obj) {
        const where_info = await qqModel.findOne({ where: { qqOpenid: obj.qqOpenid } })
        if (!where_info) {
            const qq_info = await qqModel.create(obj)
            return {
                code: 0,
                message: '添加成功'
            }
        }


    }
    static async findAllQQ(page, size) {
        const qq_info = await qqModel.findAndCountAll({

            limit: Number(size),
            offset: Number(size * (page - 1)),
            order: [

                ['createdAt', 'DESC']
            ],

        })
        return {
            code: 0,
            message: qq_info
        }

    }
    static async findToken(token) {
        try {


            const qq_info = await qqModel.findOne({
                where: { token },
                attributes:
                    ['id',
                        'nickname',
                        'gender',
                        'province',
                        'city',
                        'year',
                        'figureurl_qq_2',
                        'figureurl_qq',
                    ]
            })
            return {
                code: 0,
                message: qq_info
            }

        } catch (e) {
            return {
                code: -1,
                message: qq_info
            }
        }

    }
}
qqModel.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长 
    },
    nickname: {
        type: Sequelize.STRING,
        required: true,
    },
    gender: {
        type: Sequelize.STRING,
        required: true,
    },
    province: Sequelize.STRING,
    city: Sequelize.STRING,
    year: Sequelize.STRING,
    figureurl_qq_2: Sequelize.STRING,
    figureurl_qq: Sequelize.STRING,
    qqOpenid: {
        type: Sequelize.STRING,
        required: true,
    },
    token: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'qq'

})
module.exports = qqModel;
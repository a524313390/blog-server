const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class BannerModel extends Model {
    static async addBanner(banner_url, banner_title, banner_image, banner_state) {
        try {
            const banner = await BannerModel.create({ banner_url, banner_title, banner_image, banner_state })
            return {
                code: 0,
                message: banner
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }

    static async deleteBanner(id) {
        try {
            const banner = await BannerModel.destroy({ where: { id } })
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

    static async updateBanner(banner_url, banner_title, banner_image, banner_state, id) {

        try {
            const banner = await BannerModel.update({ banner_url, banner_title, banner_image, banner_state }, { where: { id } })
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

    static async updateBannerState(id, banner_state) {
        console.log(id, banner_state, '1232333333333333333333333333333333333')
        const banner = await BannerModel.update({ banner_state }, { where: { id } })
        return {
            code: 0,
            message: '修改成功'
        }

    }

    static async findBanner(page, size) {
        try {
            let banner = await BannerModel.findAndCountAll({
                limit: Number(size),
                offset: Number(size * (page - 1)),
                order: [

                    ['createdAt', 'DESC']
                ],

            })
            return {
                code: 0,
                message: banner
            }
        } catch (e) {
            return {
                code: 0,
                message: e
            }
        }
    }
    static async findOneBanner(page, size) {
        try {
            let banner = await BannerModel.findOne({ where: { id } })
            return {
                code: 0,
                message: banner
            }
        } catch (e) {
            return {
                code: 0,
                message: e
            }
        }
    }
}

BannerModel.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长 
    },
    banner_url: {
        type: Sequelize.STRING,
        require: true

    },
    banner_title: {
        type: Sequelize.STRING,
        require: true

    },
    banner_image: {
        type: Sequelize.STRING,
        require: true
    },
    banner_state: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'banner'

})

module.exports = BannerModel
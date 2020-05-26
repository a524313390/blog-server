const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class SystemModel extends Model {
    static async getInfo(sitename, logourl, record, code) {
        try {
            let system = await SystemModel.findAll();

            return {
                code: 0,
                message: system
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }


    static async addInfo(sitename, logourl, record, code, adminname) {
        try {
            let system = await SystemModel.create({ sitename, logourl, record, code, adminname })
            return {
                code: 0,
                message: system
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }
    }

    static async updateInfo(sitename, logourl, record, code, id) {
        try {
            let system = await SystemModel.update({ sitename, logourl, record, code, adminname }, {
                where: {
                    id
                }
            })
            return {
                code: 0,
                message: system
            }
        } catch (e) {
            return {
                code: -1,
                message: e
            }
        }



    }
}
SystemModel.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true,//自增长 
    },
    sitename: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            notEmpty: {
                msg: "站点名称不能为空"
            }
        }
    },
    logourl: Sequelize.STRING,
    record: Sequelize.STRING,
    adminname: Sequelize.STRING,
    code: Sequelize.TEXT,
}, {
    sequelize,
    tableName: 'system'

})

module.exports = SystemModel
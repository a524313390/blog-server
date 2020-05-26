const Sequelize = require('sequelize');
const dbConfig = require('./default.mysql')

const sequelize = new Sequelize(dbConfig.mysql.databases, dbConfig.mysql.username, dbConfig.mysql.password, {
    host: dbConfig.mysql.host,
    dialect: 'mysql',

    timezone: '+08:00'  //东八时区
});
// sequelize.sync({
//     force: true,
// });
sequelize.sync();
module.exports = {
    sequelize
}

const DB = require('./db.js')
const modelDefiner = require('../db/model/index')
const db = new DB();
const connection = db.init();
modelDefiner(connection);
db.isConnected(connection)




// const TABLES = {
//     CLUBS: "clubs"
// };




// const Club = sequelize.define(TABLES.CLUBS, {
//     ids: {
//         type: DataTypes.STRING(10),
//         allowNull: false,
//     }
// });

// const Club2 = sequelize.define("er", {
//     ids: {
//         type: DataTypes.STRING(10),
//         allowNull: false,
//     }
// });

// const Club3 = sequelize.define("sen", {
//     ids: {
//         type: DataTypes.STRING(10),
//         allowNull: false,
//     }
// });



// module.exports = { sequelize, Club };

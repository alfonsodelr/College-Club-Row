const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config.js');
/////////Postgress helpful tips///////////////////////////
//start db: C:\Program Files\PostgreSQL\14>postgres -D data
// \l: show all db
// \c changelab:    connect to changelab db
// \dt:  list all tables
// SELECT * FROM clients
//////////////////////////////////////////////////////////

// with db.init() initializes database and setup

//@dependency: Sequelize
function DB() {
    const { host, user: userName, password, name: dbName, dialect, port } = config.db;
    this.getCred = function () {
        return { host, userName, password, dbName, dialect, port }
    }
}

DB.prototype.init = function () {
    const { host, userName, password, dialect, dbName, port } = this.getCred();
    //all properties are set except database name
    const connection = new Sequelize(`${dialect}://${userName}:${password}@${host}:${port}`, {
        define: { timestamps: false },
        logging: false,
        pool: { maxConnections: 30, maxIdleTime: 30 },
    });

    DB.prototype.createDB(connection, dbName)
    DB.prototype.isConnected(connection);
    return connection
}

DB.prototype.isConnected = function (connection) {
    connection
        .authenticate()
        .then(function () {
            console.log('DB connection has been established successfully.');
        })
        .catch(function (err) {
            console.error('DB Unable to connect to the database:', err);
        });
}

DB.prototype.createDatabase = function (connection) {
    // const { dbName } = this.getCred();
    const { host, userName, password, dialect, dbName, port } = this.getCred();
    connection.queryInterface.createDatabase('clubs')
        .catch(function (e) { if (!e.toString().includes("already exists")) console.error("Error creating database: " + e) })
    connection.connectionManager.config.database = 'clubs'
}

DB.prototype.createDB = function (connection, dbName) {
    connection.queryInterface.createDatabase(dbName)
        .catch(function (e) { if (!e.toString().includes("already exists")) console.error("Error creating database: " + e) })
    connection.connectionManager.config.database = dbName;
}




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


// sequelize
//     .sync({ force: false })
//     .then(() => console.info(`Table ${TABLES.CLUBS} have been synced.`))
//     .catch((err) => console.error(err));


// module.exports = { sequelize, Club };


var c = new DB()
c.init()


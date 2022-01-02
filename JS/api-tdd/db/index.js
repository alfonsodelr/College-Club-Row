const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config.js');
var pg = require('pg');
const { host, user: userName, password, name: dbName, dialect, port, } = config.db;

/////////Postgress helpful tips///////////////////////////
//start db: C:\Program Files\PostgreSQL\14>postgres -D data
// \l: show all db
// \c changelab:    connect to changelab db
// \dt:  list all tables
// SELECT * FROM clients
//////////////////////////////////////////////////////////


const TABLES = {
    CLUBS: "clubs"
};

var connection = new Sequelize(`${dialect}://${userName}:${password}@${host}:${port}`, {
    define: { timestamps: false },
    logging: false,
    pool: { maxConnections: 30, maxIdleTime: 30 },
});

connection.queryInterface.createDatabase(dbName)
    .catch(e => { if (!e.toString().includes("already exists")) console.error("Error creating database: " + e) })

connection.connectionManager.config.database = dbName
var sequelize = connection;
const Club = sequelize.define(TABLES.CLUBS, {
    ids: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
});

const Club2 = sequelize.define("er", {
    ids: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
});

const Club3 = sequelize.define("sen", {
    ids: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
});


sequelize
    .sync({ force: false })
    .then(() => console.info(`Table ${TABLES.CLUBS} have been synced.`))
    .catch((err) => console.error(err));


module.exports = { sequelize, Club };

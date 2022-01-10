const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config.js');
const { host, user: userName, password, name: dbName, dialect, port, } = config.db;

/////////Postgress helpful tips///////////////////////////
//start db: C:\Program Files\PostgreSQL\14>postgres -D data
// \c changelab:    connect to changelab db
// \dt:  list all tables
// SELECT * FROM clients
//////////////////////////////////////////////////////////

const TABLES = {
    clubT: 'clubs',
};

const sequelize = new Sequelize(dbName, userName, password, {
    host: host,
    port,
    dialect,
    define: { timestamps: false },
    logging: false,
    pool: { maxConnections: 20, maxIdleTime: 30 },
});


const Club = sequelize.define(TABLES.clubT,
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(254),
            allowNull: false,
            unique: false,
        },
    },
    {
        paranoid: true,
    }
);

sequelize
    .sync({ force: false })
    .then(() => console.info(`Table ${TABLES.clubT} have been synced.`))
    .catch((err) => console.error(err));

module.exports = { sequelize, Club };


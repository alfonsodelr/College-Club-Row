const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const config = require('../../config.js')



const { host, user: userName, password, name: dbName, dialect, port } = config.db;

//might add: benchmark: true
const sequelize = new Sequelize(dbName, userName, password, {
	host,
	port,
	dialect,
	pool: { maxConnections: 20, maxIdleTime: 30 },
});


const modelDefiners = [
	require('./models/user.model'),
	require('./models/instrument.model'),
	require('./models/orchestra.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;

const { DataTypes } = require('sequelize');
const modelName = 'club'
module.exports = (sequelize) => {
	sequelize.define(modelName, {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		// type: {
		// 	allowNull: false,
		// 	type: DataTypes.STRING,
		// 	validate: {
		// 		isIn: [['string', 'wind', 'percussion']]
		// 	}
		// },

	});
};
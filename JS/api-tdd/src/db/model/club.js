const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Club = sequelize.define("Club", {
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
	return Club
};
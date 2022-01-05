const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Club = sequelize.define("Club", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
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
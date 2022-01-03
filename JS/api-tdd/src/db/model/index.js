modelDefiner = (sequelize) => {
    const models = [
        require('./club'),
        // Add more models here...
        // require('./students'),
    ];
    for (const model of models) {
        model(sequelize);
    }

}

module.exports = modelDefiner
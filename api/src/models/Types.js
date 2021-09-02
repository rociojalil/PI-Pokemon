const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Types', { 
        // id: {
        //     type: DataTypes.STRING,
        //     unique: true,
        //     primaryKey: true,
            // autoIncrement: true,
        // },
        name: {
            type: DataTypes.STRING,
            unique: true,
        }
    });
}
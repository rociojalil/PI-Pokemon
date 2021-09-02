const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Types', { 
        // saco el id porq choca con los creados
        
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
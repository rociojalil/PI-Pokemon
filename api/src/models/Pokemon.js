//ACA VA EL MODELO DE POKEMON DE MI BASE DE DATOS QUE TIENE TODO

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', { 

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // otro id simplemente para visualizar mejor en la BD x numero ya que UUID es una combinación larga
    idPokeCreado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    vida: {
      type: DataTypes.INTEGER,
    },

    fuerza: {
      type: DataTypes.INTEGER,
    },

    defensa: {
      type: DataTypes.INTEGER,
    },

    velocidad: {
      type: DataTypes.INTEGER,
    },

    altura: {
      type: DataTypes.INTEGER,
    },

    peso: {
      type: DataTypes.INTEGER,
    },

    imagen: {
      type: DataTypes.STRING,
    },


  });
};


// idPoke: {
//   type: DataTypes.INTEGER,
//   autoIncrement: true,
// },

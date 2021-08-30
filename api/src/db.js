require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs'); //para buscar en carpetas
const path = require('path'); // path para buscar
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

//crea el sequelize con la base de datos remota
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
// crea los modelos a partir de la carpeta models
const basename = path.basename(__filename);
//array con los modelos definidos en models (en models se definen funciones que aca se invocan!)
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models')) //esto genera un array con los nombres de lo que este en models, al principio [ 'Pokemon.js' ]
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) //filtra modificando el array, los archivos que tegan un punto en el cero, que se llamen como el nombre de este archivo .db (el path entero) y que no terminen en ".js"
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//PATH JOIN:junta fragmentos de pathpara hacer un path separado por barras invertidas 

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
//Por cada funcion traida de models, la invoca con sequelize. Generando las tablas adecuadas
const { Pokemon, Types } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Pokemon.belongsToMany(Types, { through: 'Pokemon_Types'})
Types.belongsToMany(Pokemon, { through: 'Pokemon_Types'})

async function testConnection(){
  try{
    await sequelize.authenticate();
    console.log('conexion exitosa');
  } catch (error){
    console.log('no se pudo conectar a bd', error);
  }
}
testConnection();

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

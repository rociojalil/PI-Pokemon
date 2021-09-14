const { Router } = require('express');
const pokemons = require('./PokeRoutes/pokemons');
const pokeId = require('./PokeRoutes/pokeId');
const types = require('./PokeRoutes/pokeTypes');
const query = require('./PokeRoutes/pokequery')
const createPoke = require('./PokeRoutes/pokePost');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemons);
router.use("/poke", query);
router.use("/pokeId", pokeId);
router.use('/pokemontypes', types);
router.use('/createPoke', createPoke);


module.exports = router;
